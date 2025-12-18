import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
      <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h4 className="font-medium text-foreground mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
