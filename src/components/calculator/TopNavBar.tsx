import { TreePine, LayoutDashboard, Settings, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function TopNavBar() {
  const navigate = useNavigate();

  return (
    <header className="bg-sidebar-dark border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <TreePine className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-semibold text-lg">Trees4Travel</span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              className="text-gray-300 hover:text-white hover:bg-sidebar-item"
              onClick={() => navigate("/")}
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              My Dashboard
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-300 hover:text-white hover:bg-sidebar-item"
              onClick={() => navigate("/organisation-settings")}
            >
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => navigate("/co2-calculator")}
            >
              <Leaf className="w-4 h-4 mr-2" />
              Plant Trees
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
