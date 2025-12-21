import { createContext, useContext, useState, ReactNode } from 'react';

export interface AssessmentResult {
  currentRole: string;
  experience: string;
  skills: string[];
  interests: string[];
  goals: string;
  workStyle: string;
  learningPreference: string;
  timeCommitment: string;
}

interface AssessmentContextType {
  assessment: AssessmentResult | null;
  setAssessment: (assessment: AssessmentResult) => void;
  clearAssessment: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [assessment, setAssessmentState] = useState<AssessmentResult | null>(() => {
    const stored = localStorage.getItem('skillAssessment');
    return stored ? JSON.parse(stored) : null;
  });

  const setAssessment = (result: AssessmentResult) => {
    setAssessmentState(result);
    localStorage.setItem('skillAssessment', JSON.stringify(result));
  };

  const clearAssessment = () => {
    setAssessmentState(null);
    localStorage.removeItem('skillAssessment');
  };

  return (
    <AssessmentContext.Provider value={{ assessment, setAssessment, clearAssessment }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}
