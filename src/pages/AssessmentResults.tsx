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
  GraduationCap
} from 'lucide-react';
import { useAssessment } from '@/contexts/AssessmentContext';

// Career recommendations based on assessment data
const getCareerRecommendations = (assessment: any) => {
  const recommendations: {
    title: string;
    description: string;
    matchScore: number;
    skills: string[];
    timeToTransition: string;
    salaryRange: string;
    growthOutlook: string;
  }[] = [];

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
    });
    
    recommendations.push({
      title: 'Digital Marketing Specialist',
      description: 'Create and execute marketing campaigns across digital channels.',
      matchScore: 82,
      skills: ['SEO/SEM', 'Social Media', 'Content Strategy', 'Analytics'],
      timeToTransition: '2-4 months',
      salaryRange: '₹4-15 LPA',
      growthOutlook: 'Essential for all businesses',
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
    });
    
    recommendations.push({
      title: 'Business Analyst',
      description: 'Bridge the gap between IT and business to improve processes and systems.',
      matchScore: 75,
      skills: ['Requirements Gathering', 'Process Mapping', 'SQL', 'Documentation'],
      timeToTransition: '4-6 months',
      salaryRange: '₹6-18 LPA',
      growthOutlook: 'High demand in digital transformation',
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
