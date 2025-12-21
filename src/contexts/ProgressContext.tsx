import { useState, useEffect, createContext, useContext, ReactNode, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

export type ProgressStatus = 'not_started' | 'in_progress' | 'completed';

export interface CourseProgress {
  courseId: string;
  status: ProgressStatus;
  startedAt?: string;
  completedAt?: string;
}

interface ProgressContextType {
  progress: Record<string, CourseProgress>;
  getProgress: (courseId: string) => CourseProgress | undefined;
  setProgress: (courseId: string, status: ProgressStatus) => void;
  clearProgress: () => void;
  getStats: () => { total: number; inProgress: number; completed: number };
  loading: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'learningProgress';

const generateCourseId = (courseName: string, provider: string): string => {
  return `${courseName.toLowerCase().replace(/\s+/g, '-')}-${provider.toLowerCase().replace(/\s+/g, '-')}`;
};

export { generateCourseId };

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [progress, setProgressState] = useState<Record<string, CourseProgress>>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });
  const [loading, setLoading] = useState(false);

  // Sync local progress to database when user logs in
  const syncLocalToDatabase = useCallback(async (userId: string) => {
    const localProgress = localStorage.getItem(STORAGE_KEY);
    if (!localProgress) return;

    const localData: Record<string, CourseProgress> = JSON.parse(localProgress);
    const entries = Object.values(localData);

    for (const entry of entries) {
      await supabase
        .from('learning_progress')
        .upsert({
          user_id: userId,
          course_id: entry.courseId,
          status: entry.status,
          started_at: entry.startedAt || null,
          completed_at: entry.completedAt || null,
        }, { onConflict: 'user_id,course_id' });
    }
  }, []);

  // Load progress from database
  const loadFromDatabase = useCallback(async (userId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('learning_progress')
      .select('*')
      .eq('user_id', userId);

    if (!error && data) {
      const dbProgress: Record<string, CourseProgress> = {};
      data.forEach((item) => {
        dbProgress[item.course_id] = {
          courseId: item.course_id,
          status: item.status as ProgressStatus,
          startedAt: item.started_at || undefined,
          completedAt: item.completed_at || undefined,
        };
      });
      setProgressState(dbProgress);
      // Update local storage with merged data
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dbProgress));
    }
    setLoading(false);
  }, []);

  // Handle auth state changes
  useEffect(() => {
    if (user) {
      // First sync any local progress, then load from database
      syncLocalToDatabase(user.id).then(() => {
        loadFromDatabase(user.id);
      });
    }
  }, [user, syncLocalToDatabase, loadFromDatabase]);

  // Save to local storage when progress changes (for offline support)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const getProgress = (courseId: string): CourseProgress | undefined => {
    return progress[courseId];
  };

  const setProgress = async (courseId: string, status: ProgressStatus) => {
    const now = new Date().toISOString();
    const existing = progress[courseId];

    const updated: CourseProgress = {
      courseId,
      status,
      startedAt: status === 'in_progress' && !existing?.startedAt ? now : existing?.startedAt,
      completedAt: status === 'completed' ? now : undefined,
    };

    // Update local state immediately
    setProgressState((prev) => ({ ...prev, [courseId]: updated }));

    // If user is logged in, sync to database
    if (user) {
      await supabase
        .from('learning_progress')
        .upsert({
          user_id: user.id,
          course_id: courseId,
          status,
          started_at: updated.startedAt || null,
          completed_at: updated.completedAt || null,
        }, { onConflict: 'user_id,course_id' });
    }
  };

  const clearProgress = async () => {
    setProgressState({});
    localStorage.removeItem(STORAGE_KEY);

    if (user) {
      await supabase
        .from('learning_progress')
        .delete()
        .eq('user_id', user.id);
    }
  };

  const getStats = () => {
    const entries = Object.values(progress);
    return {
      total: entries.length,
      inProgress: entries.filter((p) => p.status === 'in_progress').length,
      completed: entries.filter((p) => p.status === 'completed').length,
    };
  };

  return (
    <ProgressContext.Provider value={{ progress, getProgress, setProgress, clearProgress, getStats, loading }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
