interface StatCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="text-center p-6">
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
