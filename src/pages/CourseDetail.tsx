import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress, ProgressStatus } from "@/contexts/ProgressContext";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { courses, Course, Module, Project } from "@/data/courseData";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Users,
  Star,
  Lock,
  FileText,
  Video,
  HelpCircle,
  Folder,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Upload,
  Send,
} from "lucide-react";

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const { progress, setProgress, getProgress } = useProgress();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [projectSubmission, setProjectSubmission] = useState("");

  const course = courses.find((c) => c.id === courseId);

  useEffect(() => {
    if (!course) {
      navigate("/courses");
    }
  }, [course, navigate]);

  if (!course) {
    return null;
  }

  // Get module progress
  const getModuleProgress = (moduleId: string): ProgressStatus => {
    const prog = getProgress(`${courseId}-${moduleId}`);
    return prog?.status || 'not_started';
  };

  // Calculate overall course progress
  const completedModules = course.modules.filter(
    (m) => getModuleProgress(m.id) === 'completed'
  ).length;
  const progressPercent = (completedModules / course.modules.length) * 100;
  const courseStatus: ProgressStatus = 
    completedModules === course.modules.length ? 'completed' :
    completedModules > 0 ? 'in_progress' : 'not_started';

  // Check if project is unlocked
  const isProjectUnlocked = completedModules === course.modules.length;
  const projectProgress = getProgress(`${courseId}-project`);

  // Toggle module expansion
  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  // Mark module as complete
  const handleModuleComplete = async (moduleId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to track your progress",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    await setProgress(`${courseId}-${moduleId}`, 'completed');
    
    // Update overall course status
    const newCompletedCount = course.modules.filter(
      (m) => m.id === moduleId || getModuleProgress(m.id) === 'completed'
    ).length;

    if (newCompletedCount === 1) {
      await setProgress(courseId!, 'in_progress');
    }

    if (newCompletedCount === course.modules.length) {
      await setProgress(courseId!, 'completed');
      toast({
        title: "🎉 Course Completed!",
        description: "Congratulations! You've unlocked the final project.",
      });
    } else {
      toast({
        title: "Module completed!",
        description: `${newCompletedCount}/${course.modules.length} modules done`,
      });
    }
  };

  // Start module
  const handleStartModule = async (moduleId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to track your progress",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    await setProgress(`${courseId}-${moduleId}`, 'in_progress');
    
    // Expand the module
    setExpandedModules((prev) => new Set(prev).add(moduleId));
  };

  // Submit project
  const handleProjectSubmit = async () => {
    if (!projectSubmission.trim()) {
      toast({
        title: "Submission required",
        description: "Please provide your project submission",
        variant: "destructive",
      });
      return;
    }

    await setProgress(`${courseId}-project`, 'completed');
    toast({
      title: "🎉 Project Submitted!",
      description: "Your project has been submitted for review. Certificate will be issued soon!",
    });
    setProjectSubmission("");
  };

  // Enroll in course
  const handleEnroll = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to enroll in this course",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    await setProgress(courseId!, 'in_progress');
    toast({
      title: "Enrolled successfully!",
      description: "You can now start learning. Good luck!",
    });
  };

  return (
    <Layout>
      {/* Header */}
      <section className="section-padding bg-gradient-to-b from-primary/5 to-background">
        <div className="container-custom">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
                {course.featured && <Badge className="bg-primary">Featured</Badge>}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {course.title}
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                {course.longDescription}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {course.modules.length} modules
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {course.students} students
                </span>
                <span className="flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  {course.rating}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mt-4">
                Instructor: <span className="text-foreground font-medium">{course.instructor}</span>
              </p>
            </div>

            {/* Progress Card */}
            <div className="bg-card rounded-2xl border border-border/50 p-6">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />

              {courseStatus !== 'not_started' ? (
                <>
                  <ProgressBar
                    progress={progressPercent}
                    status={courseStatus}
                    size="lg"
                  />
                  <p className="text-sm text-muted-foreground mt-2 mb-4">
                    {completedModules} of {course.modules.length} modules completed
                  </p>
                  <Button className="w-full gap-2" asChild>
                    <a href="#modules">
                      <Play className="h-4 w-4" />
                      Continue Learning
                    </a>
                  </Button>
                </>
              ) : (
                <Button className="w-full gap-2" onClick={handleEnroll}>
                  <Play className="h-4 w-4" />
                  Start Course
                </Button>
              )}

              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-sm font-medium text-foreground mb-2">This course includes:</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-primary" />
                    {course.modules.length} video lectures
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Downloadable resources
                  </li>
                  <li className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-primary" />
                    Quizzes & assessments
                  </li>
                  <li className="flex items-center gap-2">
                    <Folder className="h-4 w-4 text-primary" />
                    1 capstone project
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    Certificate of completion
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Career */}
      <section className="section-padding pt-6">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl border border-border/50 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Skills You'll Gain</h3>
              <div className="flex flex-wrap gap-2">
                {course.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Career Relevance</h3>
              <p className="text-muted-foreground text-sm">{course.careerRelevance}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section id="modules" className="section-padding pt-6">
        <div className="container-custom">
          <Tabs defaultValue="modules" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="modules">Course Modules</TabsTrigger>
              <TabsTrigger value="project">Final Project</TabsTrigger>
            </TabsList>

            <TabsContent value="modules">
              <div className="space-y-4">
                {course.modules.map((module, index) => {
                  const moduleStatus = getModuleProgress(module.id);
                  const isExpanded = expandedModules.has(module.id);

                  return (
                    <div
                      key={module.id}
                      className="bg-card rounded-xl border border-border/50 overflow-hidden"
                    >
                      {/* Module Header */}
                      <div
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                        onClick={() => toggleModule(module.id)}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`
                            flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold
                            ${moduleStatus === 'completed' 
                              ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                              : moduleStatus === 'in_progress'
                              ? 'bg-primary/20 text-primary'
                              : 'bg-muted text-muted-foreground'
                            }
                          `}>
                            {moduleStatus === 'completed' ? (
                              <CheckCircle2 className="h-5 w-5" />
                            ) : (
                              index + 1
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{module.title}</h4>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              {module.duration}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {moduleStatus === 'not_started' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStartModule(module.id);
                              }}
                            >
                              Start
                            </Button>
                          )}
                          {moduleStatus === 'in_progress' && (
                            <Badge variant="secondary">In Progress</Badge>
                          )}
                          {moduleStatus === 'completed' && (
                            <Badge className="bg-green-500">Completed</Badge>
                          )}
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>

                      {/* Module Content */}
                      {isExpanded && (
                        <div className="border-t border-border/50 p-4 bg-muted/20">
                          <p className="text-muted-foreground mb-4">{module.description}</p>

                          {/* Video */}
                          {module.videoUrl && (
                            <div className="mb-4">
                              <a
                                href={module.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-primary hover:underline"
                              >
                                <Video className="h-4 w-4" />
                                Watch Video Lecture
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          )}

                          {/* Resources */}
                          <div className="mb-4">
                            <p className="text-sm font-medium text-foreground mb-2">Resources:</p>
                            <ul className="space-y-1">
                              {module.resources.map((resource, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <FileText className="h-3 w-3" />
                                  {resource}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Quiz Preview */}
                          {module.quiz && module.quiz.length > 0 && (
                            <div className="mb-4 p-3 bg-card rounded-lg border border-border/50">
                              <p className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                                <HelpCircle className="h-4 w-4 text-primary" />
                                Quiz ({module.quiz.length} questions)
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Complete the quiz to test your understanding
                              </p>
                            </div>
                          )}

                          {/* Complete Button */}
                          {moduleStatus !== 'completed' && (
                            <Button
                              className="gap-2"
                              onClick={() => handleModuleComplete(module.id)}
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              Mark as Complete
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="project">
              <div className={`bg-card rounded-xl border ${isProjectUnlocked ? 'border-primary/30' : 'border-border/50'} p-6`}>
                {!isProjectUnlocked ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Project Locked</h3>
                    <p className="text-muted-foreground mb-4">
                      Complete all {course.modules.length} modules to unlock the final project
                    </p>
                    <ProgressBar
                      progress={progressPercent}
                      status="in_progress"
                      size="lg"
                      className="max-w-md mx-auto"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      {completedModules} of {course.modules.length} modules completed
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 bg-primary/20 rounded-xl">
                        <Folder className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-1">
                          {course.project.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {course.project.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Objectives</h4>
                        <ul className="space-y-2">
                          {course.project.objectives.map((obj, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                              {obj}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Tools & Technologies</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {course.project.tools.map((tool) => (
                            <Badge key={tool} variant="secondary">{tool}</Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Estimated time: {course.project.estimatedTime}
                        </p>
                      </div>
                    </div>

                    {/* Submission */}
                    {projectProgress?.status === 'completed' ? (
                      <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                          <CheckCircle2 className="h-5 w-5" />
                          <span className="font-medium">Project Submitted!</span>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                          Your certificate will be available soon.
                        </p>
                      </div>
                    ) : (
                      <div className="border-t border-border/50 pt-6">
                        <h4 className="font-medium text-foreground mb-3">Submit Your Project</h4>
                        {course.project.submissionType === 'link' ? (
                          <div className="flex gap-3">
                            <input
                              type="url"
                              placeholder="Paste your project URL (GitHub, deployed site, etc.)"
                              value={projectSubmission}
                              onChange={(e) => setProjectSubmission(e.target.value)}
                              className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <Button onClick={handleProjectSubmit} className="gap-2">
                              <Send className="h-4 w-4" />
                              Submit
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-3">
                            <textarea
                              placeholder="Describe your project and paste any relevant links..."
                              value={projectSubmission}
                              onChange={(e) => setProjectSubmission(e.target.value)}
                              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
                            />
                            <Button onClick={handleProjectSubmit} className="self-end gap-2">
                              <Upload className="h-4 w-4" />
                              Submit Project
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}
