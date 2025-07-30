import { 
  TreePine, 
  BarChart3, 
  Scale, 
  FileText, 
  Package, 
  Users, 
  Cloud, 
  Leaf, 
  Calendar, 
  MessageCircle,
  Megaphone,
  Building
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { icon: BarChart3, label: "Overview", active: true },
  { icon: Scale, label: "Balance" },
  { icon: TreePine, label: "Trees" },
  { icon: FileText, label: "Reports" },
  { icon: Package, label: "Packages" },
  { icon: Users, label: "Clients" },
  { icon: Cloud, label: "Carbon" },
  { icon: Leaf, label: "Climate CTB" },
  { icon: Calendar, label: "Events" },
  { icon: MessageCircle, label: "Meetings" },
  { icon: Megaphone, label: "Marketing" },
  { icon: Building, label: "My Company" },
];

export function Sidebar() {
  return (
    <div className="w-64 bg-sidebar-dark h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-item">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
            <TreePine className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-semibold text-lg">EcoTracker</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <button
                  className={cn(
                    "w-full flex items-center gap-3 px-6 py-3 text-left transition-colors",
                    item.active
                      ? "bg-sidebar-item-active text-white"
                      : "text-gray-400 hover:text-white hover:bg-sidebar-item"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}