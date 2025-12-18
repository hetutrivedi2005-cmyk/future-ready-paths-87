import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SectorCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  skills: string[];
  color?: string;
}

export function SectorCard({ icon: Icon, title, description, skills }: SectorCardProps) {
  return (
    <Card className="group h-full card-hover border-border/50 hover:border-primary/30 bg-card">
      <CardContent className="p-6">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
