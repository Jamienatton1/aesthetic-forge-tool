import { Sidebar } from "@/components/dashboard/Sidebar";
import { EventsHeader } from "@/components/events/EventsHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  TreePine, 
  DollarSign, 
  Users, 
  Leaf,
  Plane,
  Hotel,
  UtensilsCrossed,
  Gift,
  Building,
  Download,
  Save,
  Share,
  UserCheck,
  BarChart3
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CompensationReport = () => {
  const navigate = useNavigate();
  const [showTreeSwagDialog, setShowTreeSwagDialog] = useState(false);
  
  // Mock event data
  const eventData = {
    name: "Corporate Sustainability Summit 2024",
    attendees: 250,
    date: "March 15-17, 2024",
    location: "San Francisco, CA"
  };

  // Total emissions
  const totalEmissions = 27.0;

  // Mock compensation data
  const compensationData = {
    totalTrees: 54,
    costPerPerson: 18,
    totalCost: 4500
  };

  // Mock category data with emissions values
  const categoryData = [
    { name: "Event Space", icon: Building, emissions: 3.2, unit: "tCO₂e", detail: "260m² venue" },
    { name: "Room Nights", icon: Hotel, emissions: 4.5, unit: "tCO₂e", detail: "300 nights" },
    { name: "Food & Beverages", icon: UtensilsCrossed, emissions: 2.8, unit: "tCO₂e", detail: "750 meals" },
    { name: "Travel", icon: Plane, emissions: 12.1, unit: "tCO₂e", detail: "50 trips" },
    { name: "Promotional Items", icon: Gift, emissions: 1.9, unit: "tCO₂e", detail: "250 items" },
    { name: "Attendees", icon: UserCheck, emissions: 2.5, unit: "tCO₂e", detail: "100 attendees" }
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <EventsHeader 
          title="Emissions Report" 
          subtitle="Carbon footprint analysis for your event"
        />
        
        <main className="flex-1 overflow-auto p-8 space-y-8">
          {/* Event Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-foreground">{eventData.name}</CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {eventData.attendees} attendees
                    </div>
                    <span>•</span>
                    <span>{eventData.date}</span>
                    <span>•</span>
                    <span>{eventData.location}</span>
                  </div>
                </div>
                <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
                  Report Generated
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Total Emissions Hero Section */}
          <Card className="border-2 border-border">
            <CardContent className="py-12">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-foreground" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Total Event Emissions
                  </p>
                  <h2 className="text-6xl font-bold text-foreground tracking-tight">
                    {totalEmissions.toFixed(1)} <span className="text-3xl font-medium">tCO₂e</span>
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Sum of all emission categories below
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emission Categories Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Emission Categories Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryData.map((category, index) => (
                  <div key={index} className="p-6 bg-metric-card rounded-lg border border-border">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                        <category.icon className="w-6 h-6 text-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground mb-1">{category.name}</h3>
                        <div className="text-2xl font-bold text-foreground">
                          {category.emissions} <span className="text-sm font-normal text-muted-foreground">{category.unit}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{category.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button variant="default" className="flex items-center gap-2">
              <Share className="w-4 h-4" />
              Event Marketing Kit
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Draft
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Emissions Report
            </Button>
            <Button variant="secondary" className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Emissions Report
            </Button>
          </div>

          {/* Compensation Section - Secondary, at the bottom */}
          <Card className="bg-muted/30 border-dashed">
            <CardHeader>
              <CardTitle className="text-xl text-foreground flex items-center gap-2">
                <Leaf className="w-5 h-5 text-accent" />
                Optional: Offset Your Event Emissions
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Based on {totalEmissions.toFixed(1)} tCO₂e total emissions
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-background rounded-lg border">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TreePine className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{compensationData.totalTrees}</div>
                  <div className="text-sm text-muted-foreground">Trees to Plant</div>
                </div>
                
                <div className="text-center p-4 bg-background rounded-lg border">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">${compensationData.costPerPerson}</div>
                  <div className="text-sm text-muted-foreground">Cost per Person</div>
                </div>
                
                <div className="text-center p-4 bg-background rounded-lg border">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">${compensationData.totalCost.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Cost</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="default" 
                  className="flex items-center gap-2"
                  onClick={() => setShowTreeSwagDialog(true)}
                >
                  <TreePine className="w-4 h-4" />
                  Tree Swag
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Leaf className="w-4 h-4" />
                  Purchase Offsets
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Tree Swag Dialog */}
      <Dialog open={showTreeSwagDialog} onOpenChange={setShowTreeSwagDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TreePine className="w-5 h-5 text-accent" />
              Would you like tree swag for your event?
            </DialogTitle>
            <DialogDescription className="text-base pt-4">
              Events can give trees away rather than event swag that ends up in landfills, 
              helping the environment and you get their contact details.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-4">
            <Button 
              onClick={() => {
                setShowTreeSwagDialog(false);
                navigate("/tree-swag");
              }}
              className="flex-1"
            >
              Yes
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowTreeSwagDialog(false)}
              className="flex-1"
            >
              No
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => setShowTreeSwagDialog(false)}
              className="flex-1"
            >
              Maybe Later
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompensationReport;
