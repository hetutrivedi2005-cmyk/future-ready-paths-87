import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { useAssessment, AssessmentResult } from '@/contexts/AssessmentContext';
import { useToast } from '@/hooks/use-toast';

const QUESTIONS = [
  {
    id: 'currentRole',
    title: 'Current Role',
    question: 'What best describes your current work situation?',
    type: 'single',
    options: [
      { value: 'student', label: 'Student / Fresh Graduate' },
      { value: 'entry', label: 'Entry-level Professional (0-2 years)' },
      { value: 'mid', label: 'Mid-level Professional (3-7 years)' },
      { value: 'senior', label: 'Senior Professional (8+ years)' },
      { value: 'gig', label: 'Gig Worker / Freelancer' },
      { value: 'unemployed', label: 'Currently Seeking Employment' },
      { value: 'career-change', label: 'Looking for Career Change' },
    ],
  },
  {
    id: 'experience',
    title: 'Industry Experience',
    question: 'Which industry do you have the most experience in?',
    type: 'single',
    options: [
      { value: 'it-software', label: 'IT & Software' },
      { value: 'manufacturing', label: 'Manufacturing & Industrial' },
      { value: 'healthcare', label: 'Healthcare & Care Services' },
      { value: 'retail', label: 'Retail & Sales' },
      { value: 'logistics', label: 'Logistics & Supply Chain' },
      { value: 'agriculture', label: 'Agriculture' },
      { value: 'finance', label: 'Finance & Banking' },
      { value: 'education', label: 'Education & Training' },
      { value: 'creative', label: 'Creative & Media' },
      { value: 'hospitality', label: 'Hospitality & Tourism' },
      { value: 'none', label: 'No specific industry experience' },
    ],
  },
  {
    id: 'skills',
    title: 'Current Skills',
    question: 'Select all the skills you currently possess:',
    type: 'multiple',
    options: [
      { value: 'communication', label: 'Communication & Presentation' },
      { value: 'computer-basics', label: 'Basic Computer Skills' },
      { value: 'data-analysis', label: 'Data Analysis' },
      { value: 'programming', label: 'Programming / Coding' },
      { value: 'project-management', label: 'Project Management' },
      { value: 'customer-service', label: 'Customer Service' },
      { value: 'sales', label: 'Sales & Negotiation' },
      { value: 'leadership', label: 'Leadership & Team Management' },
      { value: 'creative-design', label: 'Creative Design' },
      { value: 'technical-trade', label: 'Technical / Trade Skills' },
      { value: 'languages', label: 'Multiple Languages' },
      { value: 'problem-solving', label: 'Problem Solving' },
    ],
  },
  {
    id: 'interests',
    title: 'Career Interests',
    question: 'Which areas interest you the most? (Select up to 3)',
    type: 'multiple',
    maxSelect: 3,
    options: [
      { value: 'technology', label: 'Technology & Innovation' },
      { value: 'healthcare', label: 'Healthcare & Wellness' },
      { value: 'business', label: 'Business & Entrepreneurship' },
      { value: 'creative', label: 'Creative & Arts' },
      { value: 'education', label: 'Education & Training' },
      { value: 'environment', label: 'Environment & Sustainability' },
      { value: 'finance', label: 'Finance & Economics' },
      { value: 'social-impact', label: 'Social Impact & Community' },
      { value: 'manufacturing', label: 'Manufacturing & Production' },
      { value: 'service', label: 'Service Industry' },
    ],
  },
  {
    id: 'goals',
    title: 'Career Goals',
    question: 'What is your primary career goal?',
    type: 'single',
    options: [
      { value: 'higher-salary', label: 'Increase earning potential' },
      { value: 'new-industry', label: 'Transition to a new industry' },
      { value: 'promotion', label: 'Get promoted in current field' },
      { value: 'entrepreneurship', label: 'Start my own business' },
      { value: 'job-security', label: 'Improve job security' },
      { value: 'work-life-balance', label: 'Better work-life balance' },
      { value: 'passion', label: 'Follow my passion' },
    ],
  },
  {
    id: 'workStyle',
    title: 'Work Style',
    question: 'What work environment do you prefer?',
    type: 'single',
    options: [
      { value: 'remote', label: 'Fully Remote' },
      { value: 'hybrid', label: 'Hybrid (Mix of remote and office)' },
      { value: 'office', label: 'Office / On-site' },
      { value: 'field', label: 'Field Work / Travel' },
      { value: 'flexible', label: 'Flexible / No preference' },
    ],
  },
  {
    id: 'learningPreference',
    title: 'Learning Style',
    question: 'How do you prefer to learn new skills?',
    type: 'single',
    options: [
      { value: 'online-self', label: 'Self-paced online courses' },
      { value: 'online-live', label: 'Live online classes' },
      { value: 'in-person', label: 'In-person training' },
      { value: 'hands-on', label: 'Hands-on / Apprenticeship' },
      { value: 'mixed', label: 'Mix of different methods' },
    ],
  },
  {
    id: 'timeCommitment',
    title: 'Time Commitment',
    question: 'How much time can you dedicate to learning per week?',
    type: 'single',
    options: [
      { value: 'minimal', label: '1-5 hours' },
      { value: 'moderate', label: '5-10 hours' },
      { value: 'significant', label: '10-20 hours' },
      { value: 'full-time', label: '20+ hours (Full-time learning)' },
    ],
  },
];

export default function SkillAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const navigate = useNavigate();
  const { setAssessment } = useAssessment();
  const { toast } = useToast();

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  const handleSelect = (value: string) => {
    const questionId = currentQuestion.id;
    
    if (currentQuestion.type === 'multiple') {
      const currentValues = (answers[questionId] as string[]) || [];
      const maxSelect = currentQuestion.maxSelect;
      
      if (currentValues.includes(value)) {
        setAnswers({ ...answers, [questionId]: currentValues.filter((v) => v !== value) });
      } else if (!maxSelect || currentValues.length < maxSelect) {
        setAnswers({ ...answers, [questionId]: [...currentValues, value] });
      }
    } else {
      setAnswers({ ...answers, [questionId]: value });
    }
  };

  const isSelected = (value: string) => {
    const answer = answers[currentQuestion.id];
    if (Array.isArray(answer)) {
      return answer.includes(value);
    }
    return answer === value;
  };

  const canProceed = () => {
    const answer = answers[currentQuestion.id];
    if (Array.isArray(answer)) {
      return answer.length > 0;
    }
    return !!answer;
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit assessment
      const result: AssessmentResult = {
        currentRole: answers.currentRole as string,
        experience: answers.experience as string,
        skills: answers.skills as string[],
        interests: answers.interests as string[],
        goals: answers.goals as string,
        workStyle: answers.workStyle as string,
        learningPreference: answers.learningPreference as string,
        timeCommitment: answers.timeCommitment as string,
      };
      setAssessment(result);
      toast({
        title: 'Assessment Complete!',
        description: 'Your personalized career recommendations are ready.',
      });
      navigate('/');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container max-w-3xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              AI-Powered Assessment
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Skill Assessment Quiz
            </h1>
            <p className="text-muted-foreground">
              Answer a few questions to get personalized career recommendations
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="border-2">
            <CardHeader>
              <CardDescription className="text-primary font-medium">
                {currentQuestion.title}
              </CardDescription>
              <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
              {currentQuestion.maxSelect && (
                <p className="text-sm text-muted-foreground">
                  Select up to {currentQuestion.maxSelect} options
                </p>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`p-4 rounded-lg border-2 text-left transition-all duration-200 flex items-center justify-between ${
                      isSelected(option.value)
                        ? 'border-primary bg-primary/5 text-foreground'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    <span className="font-medium">{option.label}</span>
                    {isSelected(option.value) && (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="gap-2"
            >
              {currentStep === QUESTIONS.length - 1 ? 'Get Recommendations' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
