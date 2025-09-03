import { Sidebar } from "@/components/dashboard/Sidebar";
import { EventsHeader } from "@/components/events/EventsHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TreePine, 
  DollarSign, 
  Users, 
  Leaf,
  Plane,
  Hotel,
  UtensilsCrossed,
  Car,
  Gift,
  Building,
  Music,
  FileText,
  Download,
  Save,
  Share
} from "lucide-react";

const CompensationReport = () => {
  // Mock event data
  const eventData = {
    name: "Corporate Sustainability Summit 2024",
    attendees: 250,
    date: "March 15-17, 2024",
    location: "San Francisco, CA"
  };

  // Mock compensation data
  const compensationData = {
    totalCO2: 42.5,
    totalTrees: 85,
    costPerPerson: 25,
    totalCost: 6250
  };

  // Mock category data
  const categoryData = [
    { name: "Event Space", icon: Building },
    { name: "Room Nights", icon: Hotel },
    { name: "Food & Drink", icon: UtensilsCrossed },
    { name: "Travel", icon: Plane },
    { name: "Promotional Items", icon: Gift }
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <EventsHeader 
          title="Compensation Report" 
          subtitle="Carbon footprint analysis and offset recommendations"
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
                <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                  Report Generated
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Compensation Estimate Section */}
          <Card className="bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
            <CardHeader>
              <CardTitle className="text-xl text-foreground flex items-center gap-2">
                <Leaf className="w-5 h-5 text-accent" />
                Carbon Compensation Estimate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-background rounded-lg border">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Leaf className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{compensationData.totalCO2}</div>
                  <div className="text-sm text-muted-foreground">tCO2e Total</div>
                </div>
                
                <div className="text-center p-4 bg-background rounded-lg border">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TreePine className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{compensationData.totalTrees}</div>
                  <div className="text-sm text-muted-foreground">Trees to Plant</div>
                </div>
                
                <div className="text-center p-4 bg-background rounded-lg border">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">${compensationData.costPerPerson}</div>
                  <div className="text-sm text-muted-foreground">Cost per Person</div>
                </div>
                
                <div className="text-center p-4 bg-background rounded-lg border">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">${compensationData.totalCost.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Cost</div>
                </div>
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
              Download Quote
            </Button>
            <Button variant="secondary" className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Quote
            </Button>
          </div>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Emission Categories Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categoryData.map((category, index) => (
                  <div key={index} className="p-4 bg-metric-card rounded-lg border border-border text-center">
                    <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-3">
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground">{category.name}</h3>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default CompensationReport;