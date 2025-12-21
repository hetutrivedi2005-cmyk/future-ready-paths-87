import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

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
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'learningProgress';

const generateCourseId = (courseName: string, provider: string): string => {
  return `${courseName.toLowerCase().replace(/\s+/g, '-')}-${provider.toLowerCase().replace(/\s+/g, '-')}`;
};

export { generateCourseId };

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgressState] = useState<Record<string, CourseProgress>>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const getProgress = (courseId: string): CourseProgress | undefined => {
    return progress[courseId];
  };

  const setProgress = (courseId: string, status: ProgressStatus) => {
    setProgressState((prev) => {
      const existing = prev[courseId];
      const now = new Date().toISOString();

      const updated: CourseProgress = {
        courseId,
        status,
        startedAt: status === 'in_progress' && !existing?.startedAt ? now : existing?.startedAt,
        completedAt: status === 'completed' ? now : undefined,
      };

      return { ...prev, [courseId]: updated };
    });
  };

  const clearProgress = () => {
    setProgressState({});
    localStorage.removeItem(STORAGE_KEY);
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
    <ProgressContext.Provider value={{ progress, getProgress, setProgress, clearProgress, getStats }}>
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
