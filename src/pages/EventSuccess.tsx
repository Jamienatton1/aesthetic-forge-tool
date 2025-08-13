import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Edit3, Calendar, MapPin, Users, Building2 } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { EventsHeader } from "@/components/events/EventsHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const EventSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const eventData = location.state || {};
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const calculationCategories = [
    { id: "venue", label: "Venue", description: "Calculate environmental impact of venue usage" },
    { id: "food", label: "Food & Drink", description: "Calculate carbon footprint of catering and beverages" },
    { id: "travel", label: "Travel", description: "Calculate emissions from attendee and staff travel" },
    { id: "accommodation", label: "Accommodation", description: "Calculate impact of hotel stays and lodging" },
    { id: "space", label: "Event Space", description: "Calculate energy usage and facility emissions" }
  ];

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleTickAll = () => {
    const allSelected = selectedCategories.length === calculationCategories.length;
    setSelectedCategories(allSelected ? [] : calculationCategories.map(cat => cat.id));
  };

  const handleContinue = () => {
    console.log("Selected categories:", selectedCategories);
    navigate("/events/suppliers", { 
      state: { 
        eventData, 
        selectedCategories 
      } 
    });
  };

  const handleEdit = () => {
    navigate("/events/details", { state: eventData });
  };

  const handleCancel = () => {
    navigate("/events");
  };

  const allSelected = selectedCategories.length === calculationCategories.length;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <EventsHeader 
          title="Event Management" 
          subtitle="Event created successfully - choose your calculations" 
        />
        
        <main className="flex-1 overflow-auto p-8">
          <div className="bg-metric-card rounded-xl shadow-card border border-border overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-hero p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <CheckCircle className="w-8 h-8 animate-scale-in" />
                <div>
                  <h2 className="text-3xl font-bold">Event Created Successfully!</h2>
                  <p className="text-lg opacity-90">Choose what to calculate for your environmental impact assessment</p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8">
              {/* Event Summary */}
              <div className="mb-8 p-6 bg-accent/10 border border-accent/20 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{eventData.eventName || "Untitled Event"}</h3>
                    <p className="text-muted-foreground">{eventData.client || "No client specified"}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleEdit}
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Details
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Event Type</p>
                      <p className="text-sm font-medium text-foreground capitalize">{eventData.eventType || "Not specified"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm font-medium text-foreground">{eventData.city || "Not specified"}, {eventData.country || ""}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Venue</p>
                      <p className="text-sm font-medium text-foreground">{eventData.venueName || "Not specified"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Attendees</p>
                      <p className="text-sm font-medium text-foreground">{eventData.physicalAttendees || eventData.attendees || "Not specified"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculation Categories */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Choose What to Calculate</h3>
                    <p className="text-muted-foreground">Select the categories you want to include in your environmental impact calculation</p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleTickAll}
                    className="text-sm"
                  >
                    {allSelected ? "Untick All" : "Tick All"}
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {calculationCategories.map((category) => (
                    <div 
                      key={category.id}
                      className={cn(
                        "flex items-start gap-4 p-4 rounded-lg border transition-colors cursor-pointer hover:bg-accent/5",
                        selectedCategories.includes(category.id) 
                          ? "border-accent bg-accent/10" 
                          : "border-border"
                      )}
                      onClick={() => handleCategoryToggle(category.id)}
                    >
                      <Checkbox 
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => handleCategoryToggle(category.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{category.label}</h4>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    {selectedCategories.length} of {calculationCategories.length} categories selected
                  </p>
                  
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={handleCancel}
                      className="px-8"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleContinue}
                      disabled={selectedCategories.length === 0}
                      className="px-8"
                    >
                      Choose What to Calculate
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EventSuccess;