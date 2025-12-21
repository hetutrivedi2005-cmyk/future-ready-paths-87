import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAssessment } from '@/contexts/AssessmentContext';
import { Link } from 'react-router-dom';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/career-advisor`;

const formatAssessmentForAI = (assessment: any) => {
  const skillLabels: Record<string, string> = {
    'communication': 'Communication & Presentation',
    'computer-basics': 'Basic Computer Skills',
    'data-analysis': 'Data Analysis',
    'programming': 'Programming / Coding',
    'project-management': 'Project Management',
    'customer-service': 'Customer Service',
    'sales': 'Sales & Negotiation',
    'leadership': 'Leadership & Team Management',
    'creative-design': 'Creative Design',
    'technical-trade': 'Technical / Trade Skills',
    'languages': 'Multiple Languages',
    'problem-solving': 'Problem Solving',
  };

  const interestLabels: Record<string, string> = {
    'technology': 'Technology & Innovation',
    'healthcare': 'Healthcare & Wellness',
    'business': 'Business & Entrepreneurship',
    'creative': 'Creative & Arts',
    'education': 'Education & Training',
    'environment': 'Environment & Sustainability',
    'finance': 'Finance & Economics',
    'social-impact': 'Social Impact & Community',
    'manufacturing': 'Manufacturing & Production',
    'service': 'Service Industry',
  };

  const roleLabels: Record<string, string> = {
    'student': 'Student / Fresh Graduate',
    'entry': 'Entry-level Professional (0-2 years)',
    'mid': 'Mid-level Professional (3-7 years)',
    'senior': 'Senior Professional (8+ years)',
    'gig': 'Gig Worker / Freelancer',
    'unemployed': 'Currently Seeking Employment',
    'career-change': 'Looking for Career Change',
  };

  const goalLabels: Record<string, string> = {
    'higher-salary': 'Increase earning potential',
    'new-industry': 'Transition to a new industry',
    'promotion': 'Get promoted in current field',
    'entrepreneurship': 'Start my own business',
    'job-security': 'Improve job security',
    'work-life-balance': 'Better work-life balance',
    'passion': 'Follow my passion',
  };

  return `
USER SKILL ASSESSMENT RESULTS:
- Current Role: ${roleLabels[assessment.currentRole] || assessment.currentRole}
- Industry Experience: ${assessment.experience}
- Current Skills: ${assessment.skills.map((s: string) => skillLabels[s] || s).join(', ')}
- Career Interests: ${assessment.interests.map((i: string) => interestLabels[i] || i).join(', ')}
- Primary Goal: ${goalLabels[assessment.goals] || assessment.goals}
- Preferred Work Style: ${assessment.workStyle}
- Learning Preference: ${assessment.learningPreference}
- Weekly Time Commitment: ${assessment.timeCommitment}

Based on this assessment, provide personalized career recommendations.`;
};

const CareerAdvisorChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { assessment } = useAssessment();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasIntroduced, setHasIntroduced] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const getInitialMessage = () => {
    if (assessment) {
      return "Hello! I've reviewed your skill assessment results. Based on your background, skills, and career goals, I can provide personalized recommendations. Would you like me to suggest some career paths that match your profile, or do you have specific questions?";
    }
    return "Hello! I'm your AI Career Advisor. I can help you discover the best reskilling paths based on your current skills and career goals. For more personalized recommendations, take our skill assessment quiz first! What's your current profession or skill set, and what career direction interests you?";
  };

  useEffect(() => {
    if (isOpen && !hasIntroduced) {
      setMessages([{ role: 'assistant', content: getInitialMessage() }]);
      setHasIntroduced(true);
    }
  }, [isOpen, hasIntroduced, assessment]);

  // Reset when assessment changes
  useEffect(() => {
    if (assessment && hasIntroduced) {
      setMessages([{ role: 'assistant', content: getInitialMessage() }]);
    }
  }, [assessment]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const streamChat = async (userMessages: Message[]) => {
    // Prepend assessment context if available
    const contextMessages = assessment 
      ? [{ role: 'user' as const, content: formatAssessmentForAI(assessment) }, ...userMessages]
      : userMessages;

    const resp = await fetch(CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: contextMessages }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData.error || `Request failed with status ${resp.status}`);
    }

    if (!resp.body) throw new Error('No response body');

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = '';
    let assistantContent = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith('\r')) line = line.slice(0, -1);
        if (line.startsWith(':') || line.trim() === '') continue;
        if (!line.startsWith('data: ')) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === '[DONE]') break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === 'assistant' && prev.length > 1) {
                return prev.map((m, i) => 
                  i === prev.length - 1 ? { ...m, content: assistantContent } : m
                );
              }
              return [...prev, { role: 'assistant', content: assistantContent }];
            });
          }
        } catch {
          textBuffer = line + '\n' + textBuffer;
          break;
        }
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      await streamChat(updatedMessages.slice(1)); // Skip initial greeting
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to get response',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-105 ${isOpen ? 'hidden' : ''}`}
        aria-label="Open career advisor chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[550px] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Career Advisor</h3>
                <p className="text-xs text-primary-foreground/80">
                  {assessment ? 'Personalized Mode' : 'AI-powered guidance'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-primary-foreground/20 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Assessment Banner */}
          {!assessment && (
            <Link
              to="/skill-assessment"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground text-sm hover:bg-accent/80 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Take skill assessment for personalized advice</span>
            </Link>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : 'bg-background border border-border rounded-tl-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-background border border-border p-3 rounded-2xl rounded-tl-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-background">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about career paths..."
                className="flex-1 px-4 py-2 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="rounded-full"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CareerAdvisorChat;
