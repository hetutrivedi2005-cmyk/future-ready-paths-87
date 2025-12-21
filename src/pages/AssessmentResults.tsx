import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  RefreshCw,
  Briefcase,
  TrendingUp,
  BookOpen,
  Clock,
  Target,
  Sparkles,
  MapPin,
  GraduationCap,
  ExternalLink,
  PlayCircle
} from 'lucide-react';
import { useAssessment } from '@/contexts/AssessmentContext';

interface LearningResource {
  name: string;
  provider: string;
  type: 'course' | 'certification' | 'bootcamp' | 'free';
  url: string;
  duration: string;
}

interface CareerRecommendation {
  title: string;
  description: string;
  matchScore: number;
  skills: string[];
  timeToTransition: string;
  salaryRange: string;
  growthOutlook: string;
  resources: LearningResource[];
}

// Career recommendations based on assessment data
const getCareerRecommendations = (assessment: any): CareerRecommendation[] => {
  const recommendations: CareerRecommendation[] = [];

  const { interests, skills, goals, experience } = assessment;

  // Technology paths
  if (interests.includes('technology') || skills.includes('programming') || skills.includes('data-analysis')) {
    recommendations.push({
      title: 'Data Analyst',
      description: 'Transform raw data into actionable business insights using analytical tools and visualization.',
      matchScore: 92,
      skills: ['SQL', 'Python', 'Data Visualization', 'Statistics'],
      timeToTransition: '3-6 months',
      salaryRange: '₹5-15 LPA',
      growthOutlook: 'High demand, 25% growth expected',
      resources: [
        { name: 'Google Data Analytics Certificate', provider: 'Coursera', type: 'certification', url: 'https://www.coursera.org/professional-certificates/google-data-analytics', duration: '6 months' },
        { name: 'Data Analyst Nanodegree', provider: 'Udacity', type: 'bootcamp', url: 'https://www.udacity.com/course/data-analyst-nanodegree--nd002', duration: '4 months' },
        { name: 'SQL for Data Science', provider: 'Coursera', type: 'course', url: 'https://www.coursera.org/learn/sql-for-data-science', duration: '4 weeks' },
        { name: 'Python for Data Analysis', provider: 'freeCodeCamp', type: 'free', url: 'https://www.freecodecamp.org/learn/data-analysis-with-python/', duration: '300 hours' },
      ],
    });
    
    if (skills.includes('programming')) {
      recommendations.push({
        title: 'Full Stack Developer',
        description: 'Build complete web applications from frontend interfaces to backend systems.',
        matchScore: 88,
        skills: ['JavaScript', 'React', 'Node.js', 'Databases'],
        timeToTransition: '6-12 months',
        salaryRange: '₹8-25 LPA',
        growthOutlook: 'Very high demand globally',
        resources: [
          { name: 'Meta Front-End Developer', provider: 'Coursera', type: 'certification', url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer', duration: '7 months' },
          { name: 'Full Stack Open', provider: 'University of Helsinki', type: 'free', url: 'https://fullstackopen.com/en/', duration: '3-6 months' },
          { name: 'The Odin Project', provider: 'The Odin Project', type: 'free', url: 'https://www.theodinproject.com/', duration: 'Self-paced' },
          { name: 'React - The Complete Guide', provider: 'Udemy', type: 'course', url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/', duration: '48 hours' },
        ],
      });
    }
  }

  // Healthcare paths
  if (interests.includes('healthcare') || experience === 'healthcare') {
    recommendations.push({
      title: 'Healthcare Administrator',
      description: 'Manage healthcare facilities, coordinate staff, and ensure quality patient care.',
      matchScore: 85,
      skills: ['Healthcare Management', 'Compliance', 'Leadership', 'Communication'],
      timeToTransition: '6-12 months',
      salaryRange: '₹6-18 LPA',
      growthOutlook: 'Steady growth with aging population',
      resources: [
        { name: 'Healthcare Administration Specialization', provider: 'Coursera', type: 'certification', url: 'https://www.coursera.org/specializations/healthcare-administration', duration: '6 months' },
        { name: 'MHA - Healthcare Management', provider: 'IGNOU', type: 'certification', url: 'https://ignou.ac.in/', duration: '2 years' },
        { name: 'Healthcare Management Fundamentals', provider: 'edX', type: 'course', url: 'https://www.edx.org/learn/healthcare-management', duration: '8 weeks' },
        { name: 'Hospital Management Basics', provider: 'Swayam', type: 'free', url: 'https://swayam.gov.in/', duration: '12 weeks' },
      ],
    });
  }

  // Business paths
  if (interests.includes('business') || skills.includes('leadership') || skills.includes('project-management')) {
    recommendations.push({
      title: 'Project Manager',
      description: 'Lead cross-functional teams to deliver projects on time and within budget.',
      matchScore: 90,
      skills: ['Agile/Scrum', 'Stakeholder Management', 'Risk Assessment', 'Budgeting'],
      timeToTransition: '3-6 months',
      salaryRange: '₹8-20 LPA',
      growthOutlook: 'High demand across industries',
      resources: [
        { name: 'Google Project Management Certificate', provider: 'Coursera', type: 'certification', url: 'https://www.coursera.org/professional-certificates/google-project-management', duration: '6 months' },
        { name: 'PMP Certification Prep', provider: 'LinkedIn Learning', type: 'certification', url: 'https://www.linkedin.com/learning/paths/prepare-for-the-pmp-certification-exam', duration: '35 hours' },
        { name: 'Agile with Atlassian Jira', provider: 'Coursera', type: 'course', url: 'https://www.coursera.org/learn/agile-atlassian-jira', duration: '4 weeks' },
        { name: 'Scrum Master Fundamentals', provider: 'Scrum.org', type: 'free', url: 'https://www.scrum.org/resources/what-is-scrum', duration: 'Self-paced' },
      ],
    });
    
    if (goals === 'entrepreneurship') {
      recommendations.push({
        title: 'Business Consultant',
        description: 'Help organizations solve problems and improve performance through strategic advice.',
        matchScore: 87,
        skills: ['Business Strategy', 'Analysis', 'Communication', 'Problem Solving'],
        timeToTransition: '6-12 months',
        salaryRange: '₹10-30 LPA',
        growthOutlook: 'Growing demand for specialized consultants',
        resources: [
          { name: 'Business Strategy Specialization', provider: 'Coursera', type: 'certification', url: 'https://www.coursera.org/specializations/business-strategy', duration: '6 months' },
          { name: 'Management Consulting', provider: 'edX', type: 'course', url: 'https://www.edx.org/learn/management-consulting', duration: '10 weeks' },
          { name: 'McKinsey Problem Solving', provider: 'McKinsey', type: 'free', url: 'https://www.mckinsey.com/featured-insights', duration: 'Self-paced' },
          { name: 'Consulting Foundations', provider: 'LinkedIn Learning', type: 'course', url: 'https://www.linkedin.com/learning/consulting-foundations', duration: '2 hours' },
        ],
      });
    }
  }

  // Creative paths
  if (interests.includes('creative') || skills.includes('creative-design')) {
    recommendations.push({
      title: 'UX/UI Designer',
      description: 'Design intuitive digital experiences that delight users and drive business results.',
      matchScore: 86,
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      timeToTransition: '4-8 months',
      salaryRange: '₹6-20 LPA',
      growthOutlook: 'High demand in tech companies',
      resources: [
        { name: 'Google UX Design Certificate', provider: 'Coursera', type: 'certification', url: 'https://www.coursera.org/professional-certificates/google-ux-design', duration: '6 months' },
        { name: 'UI/UX Design Specialization', provider: 'CalArts', type: 'certification', url: 'https://www.coursera.org/specializations/ui-ux-design', duration: '4 months' },
        { name: 'Figma UI Design Tutorial', provider: 'freeCodeCamp', type: 'free', url: 'https://www.youtube.com/watch?v=jwCmIBJ8Jtc', duration: '3 hours' },
        { name: 'Design Thinking', provider: 'IDEO U', type: 'course', url: 'https://www.ideou.com/collections/design-thinking', duration: '5 weeks' },
      ],
    });
    
    recommendations.push({
      title: 'Digital Marketing Specialist',
      description: 'Create and execute marketing campaigns across digital channels.',
      matchScore: 82,
      skills: ['SEO/SEM', 'Social Media', 'Content Strategy', 'Analytics'],
      timeToTransition: '2-4 months',
      salaryRange: '₹4-15 LPA',
      growthOutlook: 'Essential for all businesses',
      resources: [
        { name: 'Google Digital Marketing Certificate', provider: 'Coursera', type: 'certification', url: 'https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce', duration: '6 months' },
        { name: 'Meta Social Media Marketing', provider: 'Coursera', type: 'certification', url: 'https://www.coursera.org/professional-certificates/facebook-social-media-marketing', duration: '7 months' },
        { name: 'SEO Training Course', provider: 'HubSpot Academy', type: 'free', url: 'https://academy.hubspot.com/courses/seo-training', duration: '4 hours' },
        { name: 'Google Analytics Certification', provider: 'Google', type: 'free', url: 'https://skillshop.google.com/analytics', duration: '4-6 hours' },
      ],
    });
  }

  // Finance paths
  if (interests.includes('finance') || experience === 'finance') {
    recommendations.push({
      title: 'Financial Analyst',
      description: 'Analyze financial data to guide investment decisions and business strategies.',
      matchScore: 88,
      skills: ['Financial Modeling', 'Excel', 'Valuation', 'Reporting'],
      timeToTransition: '4-8 months',
      salaryRange: '₹6-18 LPA',
      growthOutlook: 'Stable demand in all sectors',
      resources: [
        { name: 'Financial Analyst Professional Certificate', provider: 'CFI', type: 'certification', url: 'https://corporatefinanceinstitute.com/certifications/financial-modeling-valuation-analyst-fmva-program/', duration: '6 months' },
        { name: 'Excel Skills for Business', provider: 'Coursera', type: 'course', url: 'https://www.coursera.org/specializations/excel', duration: '6 months' },
        { name: 'Financial Markets', provider: 'Yale (Coursera)', type: 'free', url: 'https://www.coursera.org/learn/financial-markets-global', duration: '7 weeks' },
        { name: 'Valuation Fundamentals', provider: 'NPTEL', type: 'free', url: 'https://nptel.ac.in/', duration: '12 weeks' },
      ],
    });
  }

  // Service/Customer focus
  if (skills.includes('customer-service') || skills.includes('communication') || interests.includes('service')) {
    recommendations.push({
      title: 'Customer Success Manager',
      description: 'Ensure customers achieve their goals while using your company\'s products or services.',
      matchScore: 84,
      skills: ['Relationship Building', 'Product Knowledge', 'Problem Solving', 'Communication'],
      timeToTransition: '2-4 months',
      salaryRange: '₹5-15 LPA',
      growthOutlook: 'Growing with SaaS industry',
      resources: [
        { name: 'Customer Success Management', provider: 'LinkedIn Learning', type: 'course', url: 'https://www.linkedin.com/learning/customer-success-management-essentials', duration: '2 hours' },
        { name: 'Customer Success Certification', provider: 'SuccessCOACHING', type: 'certification', url: 'https://www.successcoaching.co/', duration: '8 weeks' },
        { name: 'HubSpot Customer Service', provider: 'HubSpot Academy', type: 'free', url: 'https://academy.hubspot.com/courses/customer-service', duration: '3 hours' },
        { name: 'Customer Experience Fundamentals', provider: 'Udemy', type: 'course', url: 'https://www.udemy.com/topic/customer-experience/', duration: '6 hours' },
      ],
    });
  }

  // Default recommendations if nothing matches well
  if (recommendations.length < 3) {
    recommendations.push({
      title: 'Digital Marketing Specialist',
      description: 'Create and execute marketing campaigns across digital channels.',
      matchScore: 78,
      skills: ['SEO/SEM', 'Social Media', 'Content Strategy', 'Analytics'],
      timeToTransition: '2-4 months',
      salaryRange: '₹4-15 LPA',
      growthOutlook: 'Essential for all businesses',
      resources: [
        { name: 'Google Digital Marketing Certificate', provider: 'Coursera', type: 'certification', url: 'https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce', duration: '6 months' },
        { name: 'Meta Social Media Marketing', provider: 'Coursera', type: 'certification', url: 'https://www.coursera.org/professional-certificates/facebook-social-media-marketing', duration: '7 months' },
        { name: 'SEO Training Course', provider: 'HubSpot Academy', type: 'free', url: 'https://academy.hubspot.com/courses/seo-training', duration: '4 hours' },
        { name: 'Google Analytics Certification', provider: 'Google', type: 'free', url: 'https://skillshop.google.com/analytics', duration: '4-6 hours' },
      ],
    });
    
    recommendations.push({
      title: 'Business Analyst',
      description: 'Bridge the gap between IT and business to improve processes and systems.',
      matchScore: 75,
      skills: ['Requirements Gathering', 'Process Mapping', 'SQL', 'Documentation'],
      timeToTransition: '4-6 months',
      salaryRange: '₹6-18 LPA',
      growthOutlook: 'High demand in digital transformation',
      resources: [
        { name: 'Business Analysis Fundamentals', provider: 'Coursera', type: 'course', url: 'https://www.coursera.org/learn/business-analysis-fundamentals', duration: '4 weeks' },
        { name: 'IIBA Entry Certificate', provider: 'IIBA', type: 'certification', url: 'https://www.iiba.org/certification/ecba/', duration: '3 months' },
        { name: 'SQL for Business Analysts', provider: 'DataCamp', type: 'course', url: 'https://www.datacamp.com/courses/sql-for-business-analysts', duration: '4 hours' },
        { name: 'Business Analysis Basics', provider: 'Udemy', type: 'free', url: 'https://www.udemy.com/topic/business-analysis/', duration: '5 hours' },
      ],
    });
  }

  // Sort by match score and return top 4
  return recommendations.sort((a, b) => b.matchScore - a.matchScore).slice(0, 4);
};

const labelMaps = {
  currentRole: {
    'student': 'Student / Fresh Graduate',
    'entry': 'Entry-level Professional',
    'mid': 'Mid-level Professional',
    'senior': 'Senior Professional',
    'gig': 'Gig Worker / Freelancer',
    'unemployed': 'Seeking Employment',
    'career-change': 'Career Changer',
  },
  skills: {
    'communication': 'Communication',
    'computer-basics': 'Computer Basics',
    'data-analysis': 'Data Analysis',
    'programming': 'Programming',
    'project-management': 'Project Management',
    'customer-service': 'Customer Service',
    'sales': 'Sales',
    'leadership': 'Leadership',
    'creative-design': 'Creative Design',
    'technical-trade': 'Technical Skills',
    'languages': 'Languages',
    'problem-solving': 'Problem Solving',
  },
  interests: {
    'technology': 'Technology',
    'healthcare': 'Healthcare',
    'business': 'Business',
    'creative': 'Creative',
    'education': 'Education',
    'environment': 'Environment',
    'finance': 'Finance',
    'social-impact': 'Social Impact',
    'manufacturing': 'Manufacturing',
    'service': 'Service',
  },
  goals: {
    'higher-salary': 'Higher Earning Potential',
    'new-industry': 'Industry Transition',
    'promotion': 'Career Advancement',
    'entrepreneurship': 'Entrepreneurship',
    'job-security': 'Job Security',
    'work-life-balance': 'Work-Life Balance',
    'passion': 'Follow Passion',
  },
  timeCommitment: {
    'minimal': '1-5 hours/week',
    'moderate': '5-10 hours/week',
    'significant': '10-20 hours/week',
    'full-time': '20+ hours/week',
  },
  learningPreference: {
    'online-self': 'Self-paced Online',
    'online-live': 'Live Online Classes',
    'in-person': 'In-person Training',
    'hands-on': 'Hands-on Learning',
    'mixed': 'Mixed Methods',
  },
};

export default function AssessmentResults() {
  const navigate = useNavigate();
  const { assessment, clearAssessment } = useAssessment();

  useEffect(() => {
    if (!assessment) {
      navigate('/skill-assessment');
    }
  }, [assessment, navigate]);

  if (!assessment) return null;

  const recommendations = getCareerRecommendations(assessment);

  const handleRetake = () => {
    clearAssessment();
    navigate('/skill-assessment');
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-primary/10 via-primary/5 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-400 text-sm font-medium mb-6">
              <CheckCircle2 className="w-4 h-4" />
              Assessment Complete
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Your Personalized Career Paths
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Based on your skills, interests, and goals, here are the career paths that best match your profile.
            </p>
          </div>
        </div>
      </section>

      {/* Your Profile Summary */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl font-bold text-foreground mb-6">Your Profile Summary</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Current Status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-foreground">
                  {labelMaps.currentRole[assessment.currentRole as keyof typeof labelMaps.currentRole] || assessment.currentRole}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Primary Goal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-foreground">
                  {labelMaps.goals[assessment.goals as keyof typeof labelMaps.goals] || assessment.goals}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Time Available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-foreground">
                  {labelMaps.timeCommitment[assessment.timeCommitment as keyof typeof labelMaps.timeCommitment] || assessment.timeCommitment}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Learning Style
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-foreground">
                  {labelMaps.learningPreference[assessment.learningPreference as keyof typeof labelMaps.learningPreference] || assessment.learningPreference}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Skills & Interests */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Your Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {assessment.skills.map((skill: string) => (
                    <Badge key={skill} variant="secondary">
                      {labelMaps.skills[skill as keyof typeof labelMaps.skills] || skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Your Interests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {assessment.interests.map((interest: string) => (
                    <Badge key={interest} variant="outline" className="border-primary/50 text-primary">
                      {labelMaps.interests[interest as keyof typeof labelMaps.interests] || interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Career Recommendations */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Recommended Career Paths
              </h2>
              <p className="text-muted-foreground mt-1">
                Sorted by match score based on your profile
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {recommendations.map((career, index) => (
              <Card key={career.title} className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors">
                {/* Match Score Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                    career.matchScore >= 90 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : career.matchScore >= 80
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    {career.matchScore}% Match
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    Top Recommendation
                  </div>
                  <CardTitle className="text-xl">{career.title}</CardTitle>
                  <CardDescription className="text-base">
                    {career.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Skills Needed */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Skills to Develop</p>
                    <div className="flex flex-wrap gap-2">
                      {career.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Learning Resources */}
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Recommended Learning Resources
                    </p>
                    <div className="space-y-2">
                      {career.resources.map((resource) => (
                        <a
                          key={resource.name}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                        >
                          <div className={`mt-0.5 p-1.5 rounded-md ${
                            resource.type === 'free' 
                              ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                              : resource.type === 'certification'
                              ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                              : resource.type === 'bootcamp'
                              ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                              : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                          }`}>
                            <PlayCircle className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                {resource.name}
                              </p>
                              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">{resource.provider}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{resource.duration}</span>
                              <Badge 
                                variant="outline" 
                                className={`text-[10px] px-1.5 py-0 h-4 ${
                                  resource.type === 'free' 
                                    ? 'border-green-500/50 text-green-600 dark:text-green-400'
                                    : ''
                                }`}
                              >
                                {resource.type === 'free' ? 'Free' : resource.type === 'certification' ? 'Cert' : resource.type === 'bootcamp' ? 'Bootcamp' : 'Course'}
                              </Badge>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div>
                      <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                        <Clock className="w-3 h-3" />
                        Transition Time
                      </div>
                      <p className="text-sm font-medium">{career.timeToTransition}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                        <MapPin className="w-3 h-3" />
                        Salary Range
                      </div>
                      <p className="text-sm font-medium">{career.salaryRange}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                        <TrendingUp className="w-3 h-3" />
                        Growth
                      </div>
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">High</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps CTA */}
      <section className="py-12 md:py-16 bg-primary/5">
        <div className="container">
          <Card className="max-w-3xl mx-auto border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Get Personalized Guidance
              </h3>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Chat with our AI Career Advisor to dive deeper into these recommendations, 
                get specific learning resources, and create your personalized action plan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2" asChild>
                  <Link to="/">
                    <MessageCircle className="w-5 h-5" />
                    Chat with AI Advisor
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" onClick={handleRetake} className="gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Retake Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
