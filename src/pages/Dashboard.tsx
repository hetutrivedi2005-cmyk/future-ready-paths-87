import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/contexts/ProgressContext";
import { supabase } from "@/integrations/supabase/client";
import { StatCard } from "@/components/dashboard/StatCard";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { CertificateCard } from "@/components/dashboard/CertificateCard";
import { MilestoneCard } from "@/components/dashboard/MilestoneCard";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { courses, motivationalQuotes, careerGoals } from "@/data/courseData";
import {
  BookOpen,
  Award,
  TrendingUp,
  Clock,
  Target,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Flame,
  ChevronRight,
  Star,
} from "lucide-react";

interface ProfileData {
  username: string | null;
  avatar_url: string | null;
  target_sector: string | null;
  skills: string[] | null;
}

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const { progress, getStats, loading: progressLoading } = useProgress();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [careerGoal, setCareerGoal] = useState<string>("Frontend Developer");
  const [dailyQuote, setDailyQuote] = useState(motivationalQuotes[0]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url, target_sector, skills")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!error && data) {
        setProfile(data);
        if (data.target_sector) {
          setCareerGoal(data.target_sector);
        }
      }
    }

    fetchProfile();
  }, [user]);

  useEffect(() => {
    // Get a random quote each day based on date
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    setDailyQuote(motivationalQuotes[dayOfYear % motivationalQuotes.length]);
  }, []);

  if (authLoading || progressLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </Layout>
    );
  }

  const stats = getStats();
  const userName = profile?.username || user?.email?.split("@")[0] || "Learner";

  // Calculate course progress for each course
  const getCourseProgress = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return null;

    const courseProgress = progress[courseId];
    const moduleProgresses = course.modules.map(m => progress[`${courseId}-${m.id}`]);
    const completedModules = moduleProgresses.filter(p => p?.status === 'completed').length;
    
    return {
      status: courseProgress?.status || 'not_started',
      completedModules,
      totalModules: course.modules.length,
    };
  };

  // Get enrolled/in-progress courses
  const enrolledCourses = courses.filter(course => {
    const prog = progress[course.id];
    return prog && (prog.status === 'in_progress' || prog.status === 'completed');
  });

  // Get completed courses for certificates
  const completedCourses = courses.filter(course => {
    const prog = progress[course.id];
    return prog?.status === 'completed';
  });

  // Recommended courses (not started)
  const recommendedCourses = courses
    .filter(course => {
      const prog = progress[course.id];
      return !prog || prog.status === 'not_started';
    })
    .slice(0, 3);

  // Calculate overall progress
  const totalProgress = enrolledCourses.length > 0
    ? enrolledCourses.reduce((acc, course) => {
        const prog = getCourseProgress(course.id);
        return acc + (prog ? (prog.completedModules / prog.totalModules) * 100 : 0);
      }, 0) / enrolledCourses.length
    : 0;

  // Milestones
  const milestones = [
    { title: "Complete first module", completed: stats.total > 0 },
    { title: "Finish 50% of a course", completed: totalProgress >= 50, current: totalProgress > 0 && totalProgress < 50 },
    { title: "Complete first course", completed: stats.completed > 0, current: stats.total > 0 && stats.completed === 0 },
    { title: "Earn first certificate", completed: completedCourses.length > 0 },
    { title: "Complete 3 courses", completed: stats.completed >= 3 },
  ];

  return (
    <Layout>
      {/* Welcome Section */}
      <section className="section-padding bg-gradient-to-b from-primary/5 via-primary/3 to-background">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Flame className="h-3 w-3 text-orange-500" />
                  {stats.total > 0 ? `${stats.total} courses enrolled` : "Start learning today!"}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Welcome back, {userName}! 👋
              </h1>
              <p className="text-muted-foreground">
                Continue your journey to becoming a <span className="text-primary font-medium">{careerGoal}</span>
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="outline">
                <Link to="/profile">Edit Profile</Link>
              </Button>
              <Button asChild className="gap-2">
                <Link to="/courses">
                  Browse Courses <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Daily Quote */}
          <div className="mt-8 p-5 bg-card rounded-2xl border border-border/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
            <div className="flex items-start gap-3 relative">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Career Tip of the Day</p>
                <p className="text-foreground italic">"{dailyQuote.quote}"</p>
                <p className="text-sm text-muted-foreground mt-1">— {dailyQuote.author}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="section-padding pt-6">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Courses Enrolled"
              value={enrolledCourses.length}
              subtitle={`${stats.inProgress} in progress`}
              icon={BookOpen}
            />
            <StatCard
              title="Courses Completed"
              value={stats.completed}
              subtitle="Certificates earned"
              icon={Award}
              iconClassName="bg-green-100 dark:bg-green-900/30"
            />
            <StatCard
              title="Overall Progress"
              value={`${Math.round(totalProgress)}%`}
              subtitle="Across all courses"
              icon={TrendingUp}
              iconClassName="bg-blue-100 dark:bg-blue-900/30"
            />
            <StatCard
              title="Learning Hours"
              value={enrolledCourses.reduce((acc, c) => acc + parseInt(c.duration), 0)}
              subtitle="Total course duration"
              icon={Clock}
              iconClassName="bg-purple-100 dark:bg-purple-900/30"
            />
          </div>
        </div>
      </section>

      {/* Skill Progress & Career Goal */}
      <section className="section-padding pt-6">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Skill Progress */}
            <div className="lg:col-span-2 bg-card rounded-2xl border border-border/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Skill Progress
                </h2>
                <Link to="/skill-assessment" className="text-sm text-primary hover:underline flex items-center gap-1">
                  Take Assessment <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              
              {profile?.skills && profile.skills.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {profile.skills.slice(0, 6).map((skill, index) => (
                    <div key={skill} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{skill}</span>
                        <span className="text-xs text-muted-foreground">
                          {Math.min(100, 40 + index * 10)}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
                          style={{ width: `${Math.min(100, 40 + index * 10)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">
                    Add skills to your profile to track your progress
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/profile">Add Skills</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Career Goal */}
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 rounded-2xl border border-primary/20 p-6">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                <GraduationCap className="h-5 w-5 text-primary" />
                Career Goal
              </h2>
              <div className="bg-card/50 rounded-xl p-4 mb-4">
                <p className="text-xl font-bold text-primary mb-1">{careerGoal}</p>
                <p className="text-sm text-muted-foreground">
                  Keep learning to achieve your career goals!
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Progress to goal</p>
                <ProgressBar 
                  progress={Math.min(100, (stats.completed / 3) * 100)} 
                  status={stats.completed >= 3 ? 'completed' : 'in_progress'}
                  size="md"
                />
                <p className="text-xs text-muted-foreground">
                  Complete 3 relevant courses to be job-ready
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Courses */}
      {enrolledCourses.length > 0 && (
        <section className="section-padding pt-6">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                My Courses
              </h2>
              <Link to="/courses" className="text-sm text-primary hover:underline flex items-center gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.slice(0, 3).map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  progress={getCourseProgress(course.id) || undefined}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Milestones & Certificates */}
      <section className="section-padding pt-6">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Milestones */}
            <div className="bg-card rounded-2xl border border-border/50 p-6">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-primary" />
                Learning Milestones
              </h2>
              <div className="space-y-3">
                {milestones.map((milestone, index) => (
                  <MilestoneCard
                    key={index}
                    title={milestone.title}
                    completed={milestone.completed}
                    current={milestone.current}
                  />
                ))}
              </div>
            </div>

            {/* Certificates */}
            <div className="bg-card rounded-2xl border border-border/50 p-6">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-primary" />
                Earned Certificates
              </h2>
              {completedCourses.length > 0 ? (
                <div className="space-y-3">
                  {completedCourses.map((course) => (
                    <CertificateCard
                      key={course.id}
                      courseName={course.title}
                      completedDate={progress[course.id]?.completedAt || new Date().toISOString()}
                      certificateId={`CERT-${course.id.toUpperCase()}`}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground mb-2">No certificates yet</p>
                  <p className="text-sm text-muted-foreground">
                    Complete a course to earn your first certificate
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Courses */}
      <section className="section-padding pt-6 pb-12">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Recommended for You
            </h2>
            <Link to="/courses" className="text-sm text-primary hover:underline flex items-center gap-1">
              See All Courses <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                showProgress={false}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
