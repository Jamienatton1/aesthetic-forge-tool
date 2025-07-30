import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  unit?: string;
  description?: string;
  buttonText: string;
  className?: string;
}

export function MetricCard({ 
  icon, 
  title, 
  value, 
  unit, 
  description, 
  buttonText,
  className 
}: MetricCardProps) {
  return (
    <div className={cn(
      "bg-metric-card rounded-xl p-8 shadow-card border border-border",
      "flex flex-col items-center text-center space-y-6",
      className
    )}>
      <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center">
        {icon}
      </div>
      
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm font-medium">{title}</p>
        <div className="space-y-1">
          <h3 className="text-3xl font-bold text-foreground">
            {value} {unit && <span className="text-lg text-muted-foreground">{unit}</span>}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      
      <Button 
        className="w-full bg-sidebar-dark hover:bg-sidebar-item text-white font-medium"
        size="lg"
      >
        {buttonText}
      </Button>
    </div>
  );
}