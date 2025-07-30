import { Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventsHeaderProps {
  title?: string;
  subtitle?: string;
}

export function EventsHeader({ title = "Events Management", subtitle = "Manage and track your environmental events" }: EventsHeaderProps) {
  return (
    <header className="bg-metric-card border-b border-border px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}