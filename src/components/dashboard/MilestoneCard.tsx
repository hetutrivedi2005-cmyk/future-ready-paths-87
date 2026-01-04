import { Target, Calendar, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MilestoneCardProps {
  title: string;
  dueDate?: string;
  completed?: boolean;
  current?: boolean;
}

export function MilestoneCard({ title, dueDate, completed, current }: MilestoneCardProps) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-3 rounded-lg border transition-colors",
      completed ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800" :
      current ? "bg-primary/5 border-primary/30" : "bg-muted/30 border-border/50"
    )}>
      <div className={cn(
        "p-2 rounded-lg",
        completed ? "bg-green-100 dark:bg-green-900/30" :
        current ? "bg-primary/20" : "bg-muted"
      )}>
        {completed ? (
          <CheckCircle2 className="h-4 w-4 text-green-600" />
        ) : (
          <Target className={cn(
            "h-4 w-4",
            current ? "text-primary" : "text-muted-foreground"
          )} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-sm font-medium truncate",
          completed ? "text-green-700 dark:text-green-400" : "text-foreground"
        )}>
          {title}
        </p>
        {dueDate && (
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {dueDate}
          </p>
        )}
      </div>
      {current && (
        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
          Current
        </span>
      )}
    </div>
  );
}
