import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useProgress } from "@/contexts/ProgressContext";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { courses, videoLectures } from "@/data/courseData";
import {
  Play,
  Clock,
  Users,
  Star,
  BookOpen,
  Video,
  Award,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

const categories = ["All", "Technology", "Design", "Marketing"];

export default function Courses() {
  const { progress, getProgress } = useProgress();

  // Get course progress
  const getCourseProgress = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return null;

    const courseProgress = getProgress(courseId);
    const moduleProgresses = course.modules.map(m => getProgress(`${courseId}-${m.id}`));
    const completedModules = moduleProgresses.filter(p => p?.status === 'completed').length;
    
    return {
      status: courseProgress?.status || 'not_started',
      completedModules,
      totalModules: course.modules.length,
    };
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-primary/5 to-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              <BookOpen className="h-3 w-3 mr-1" /> Learning Center
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Courses & Video Lectures
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Access world-class courses and free video lectures from industry experts. 
              Build skills that matter for your career transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Video Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                <Video className="inline-block h-7 w-7 mr-2 text-primary" />
                Free Video Lectures
              </h2>
              <p className="text-muted-foreground">
                High-quality educational content from top instructors
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoLectures.map((video) => (
              <div
                key={video.id}
                className="group bg-card rounded-xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all hover:shadow-lg"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={`https://www.youtube.com/watch?v=${video.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center h-14 w-14 rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform"
                    >
                      <Play className="h-6 w-6 ml-1" />
                    </a>
                  </div>
                  <Badge className="absolute top-3 left-3 bg-background/90">
                    {video.category}
                  </Badge>
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{video.instructor}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {video.views} views
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      {video.rating}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              <Award className="inline-block h-7 w-7 mr-2 text-primary" />
              Professional Courses
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive courses with certifications to advance your career
            </p>
          </div>

          <Tabs defaultValue="All" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-transparent">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses
                    .filter((course) => category === "All" || course.category === category)
                    .map((course) => {
                      const prog = getCourseProgress(course.id);
                      const progressPercent = prog 
                        ? (prog.completedModules / prog.totalModules) * 100 
                        : 0;

                      return (
                        <div
                          key={course.id}
                          className="group bg-card rounded-xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all hover:shadow-lg"
                        >
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {course.featured && (
                              <Badge className="absolute top-3 left-3 bg-primary">
                                Featured
                              </Badge>
                            )}
                            <Badge className="absolute top-3 right-3 bg-background/90">
                              {course.level}
                            </Badge>
                            {prog?.status === 'completed' && (
                              <div className="absolute bottom-3 right-3 bg-green-500 text-white p-1.5 rounded-full">
                                <CheckCircle2 className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                          <div className="p-5">
                            <h3 className="font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                              {course.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {course.description}
                            </p>
                            <p className="text-sm text-muted-foreground mb-3">
                              By <span className="text-foreground">{course.instructor}</span>
                            </p>
                            
                            {/* Skills preview */}
                            <div className="flex flex-wrap gap-1 mb-3">
                              {course.skills.slice(0, 3).map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {course.skills.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{course.skills.length - 3}
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {course.duration}
                              </div>
                              <div className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                {course.modules.length} modules
                              </div>
                            </div>

                            {/* Progress bar for enrolled courses */}
                            {prog && prog.status !== 'not_started' && (
                              <div className="mb-4">
                                <ProgressBar 
                                  progress={progressPercent} 
                                  status={prog.status}
                                  size="sm"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                  {prog.completedModules} of {prog.totalModules} modules
                                </p>
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-1 text-amber-500">
                                  <Star className="h-4 w-4 fill-current" />
                                  {course.rating}
                                </span>
                                <span className="flex items-center gap-1 text-muted-foreground">
                                  <Users className="h-4 w-4" />
                                  {course.students}
                                </span>
                              </div>
                              <Button asChild size="sm" variant={prog?.status === 'completed' ? 'outline' : 'default'} className="gap-1">
                                <Link to={`/course/${course.id}`}>
                                  {prog?.status === 'completed' ? (
                                    <>Review</>
                                  ) : prog?.status === 'in_progress' ? (
                                    <>Continue <TrendingUp className="h-3 w-3" /></>
                                  ) : (
                                    <>Start <ArrowRight className="h-3 w-3" /></>
                                  )}
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 rounded-3xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-muted-foreground mb-6">
                Take our skill assessment to get personalized course recommendations 
                based on your career goals and current skill level.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/skill-assessment">
                    Take Skill Assessment <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/dashboard">View Dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
