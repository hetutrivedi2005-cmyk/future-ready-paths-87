import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProgressBar({ 
  progress, 
  status, 
  showLabel = true, 
  size = 'md',
  className 
}: ProgressBarProps) {
  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  const statusColors = {
    not_started: 'bg-muted',
    in_progress: 'bg-primary',
    completed: 'bg-green-500'
  };

  const statusLabels = {
    not_started: 'Not Started',
    in_progress: 'In Progress',
    completed: 'Completed'
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className={cn(
            "text-xs font-medium",
            status === 'completed' ? 'text-green-600' : 
            status === 'in_progress' ? 'text-primary' : 'text-muted-foreground'
          )}>
            {statusLabels[status]}
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            {Math.round(progress)}%
          </span>
        </div>
      )}
      <div className={cn("w-full bg-muted rounded-full overflow-hidden", heights[size])}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            statusColors[status]
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
