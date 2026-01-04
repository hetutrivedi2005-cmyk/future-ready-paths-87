import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "./ProgressBar";
import { Clock, BookOpen, Play, CheckCircle2 } from "lucide-react";
import { Course } from "@/data/courseData";
import { ProgressStatus } from "@/contexts/ProgressContext";

interface CourseCardProps {
  course: Course;
  progress?: {
    status: ProgressStatus;
    completedModules: number;
    totalModules: number;
  };
  showProgress?: boolean;
}

export function CourseCard({ course, progress, showProgress = true }: CourseCardProps) {
  const progressPercent = progress 
    ? (progress.completedModules / progress.totalModules) * 100 
    : 0;

  const getStatusIcon = () => {
    if (!progress || progress.status === 'not_started') {
      return <Play className="h-4 w-4" />;
    }
    if (progress.status === 'completed') {
      return <CheckCircle2 className="h-4 w-4" />;
    }
    return <Play className="h-4 w-4" />;
  };

  const getButtonText = () => {
    if (!progress || progress.status === 'not_started') {
      return "Start Course";
    }
    if (progress.status === 'completed') {
      return "Review Course";
    }
    return "Continue Learning";
  };

  return (
    <div className="group bg-card rounded-xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all hover:shadow-lg">
      <div className="relative h-40 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 left-3 bg-background/90">
          {course.level}
        </Badge>
        {progress?.status === 'completed' && (
          <div className="absolute top-3 right-3 bg-green-500 text-white p-1.5 rounded-full">
            <CheckCircle2 className="h-4 w-4" />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {course.modules.length} modules
          </span>
        </div>

        {showProgress && progress && (
          <div className="mb-3">
            <ProgressBar 
              progress={progressPercent} 
              status={progress.status}
              size="sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {progress.completedModules} of {progress.totalModules} modules completed
            </p>
          </div>
        )}

        <Button asChild size="sm" className="w-full gap-2" variant={progress?.status === 'completed' ? 'outline' : 'default'}>
          <Link to={`/course/${course.id}`}>
            {getStatusIcon()}
            {getButtonText()}
          </Link>
        </Button>
      </div>
    </div>
  );
}
