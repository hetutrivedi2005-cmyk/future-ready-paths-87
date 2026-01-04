import { Award, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CertificateCardProps {
  courseName: string;
  completedDate: string;
  certificateId: string;
}

export function CertificateCard({ courseName, completedDate, certificateId }: CertificateCardProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 via-primary/10 to-accent/5 rounded-xl border border-primary/20">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/20 rounded-lg">
          <Award className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h4 className="font-medium text-foreground text-sm">{courseName}</h4>
          <p className="text-xs text-muted-foreground">
            Earned on {new Date(completedDate).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
