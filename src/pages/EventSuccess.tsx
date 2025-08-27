import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Edit3, Calendar, MapPin, Users, Building2, ChevronDown, ChevronUp, Hotel, Utensils, Car, Gift, Info, ArrowRight, Check } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { EventsHeader } from "@/components/events/EventsHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { EventProgressBar } from "@/components/events/EventProgressBar";
import { cn } from "@/lib/utils";

const EventSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const eventData = location.state || {};
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [createQuestionnaire, setCreateQuestionnaire] = useState(false);
  const [expandedQuestionnaire, setExpandedQuestionnaire] = useState(false);
  
  const calculationCategories = [
    { 
      id: "venue", 
      label: "Venue", 
      icon: Building2,
      details: "Calculate emissions from venue energy consumption, heating, cooling, and infrastructure usage during your event."
    },
    { 
      id: "food", 
      label: "Food & Drink", 
      icon: Utensils,
      details: "Track carbon footprint from catering, including food production, transportation, and waste from meals and beverages."
    },
    { 
      id: "travel", 
      label: "Travel and Accommodation", 
      icon: Car,
      details: "Measure emissions from attendee transportation including flights, trains, cars, local transport and hotel accommodations."
    },
    { 
      id: "promotion", 
      label: "Promotion Items", 
      icon: Gift,
      details: "Include promotional materials, swag, signage, and marketing materials production and distribution emissions."
    }
  ];

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories(prev =>
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
    if (selectedCategories.length === 0) return;
    
    // Always go to suppliers first for user assignment
    navigate("/events/suppliers", { 
      state: { 
        eventData, 
        selectedCategories,
        createQuestionnaire
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
    <TooltipProvider>
      <div className="flex h-screen bg-background">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <EventsHeader 
            title="Event Management" 
            subtitle="Event created successfully - choose your calculations" 
          />
          
          <EventProgressBar currentStep={2} completedSteps={[1]} />

          <main className="flex-1 overflow-auto">
            {/* Hero Section */}
            <div className="bg-gradient-hero text-white px-8 py-12">
              <div className="max-w-4xl">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 animate-pulse" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold mb-2">Event Created Successfully!</h1>
                    <p className="text-xl opacity-90">
                      Your event "{eventData.eventName || "Untitled Event"}" has been created. Start calculating your environmental impact.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-8 py-8 space-y-8">
              {/* Event Summary Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    {eventData.eventName || "Untitled Event"} - {eventData.client || "No client specified"}
                  </CardTitle>
                  <CardDescription>
                    Event details and configuration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm text-muted-foreground">Location:</span>
                            <span className="font-semibold text-foreground">
                              {eventData.city || "Not specified"}, {eventData.country || ""}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Building2 className="w-4 h-4" />
                            <span className="text-sm text-muted-foreground">Venue:</span>
                            <span className="font-semibold text-foreground">{eventData.venueName || "Not specified"}</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Users className="w-4 h-4" />
                            <span className="text-sm text-muted-foreground">Attendees:</span>
                            <span className="font-semibold text-foreground">{eventData.physicalAttendees || eventData.attendees || "Not specified"}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm text-muted-foreground">Type:</span>
                            <span className="font-semibold text-foreground capitalize">{eventData.eventType || "Not specified"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleEdit}
                        variant="outline"
                        size="sm"
                      >
                        Edit Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Event Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Event Categories
                  </CardTitle>
                  <CardDescription>
                    Select emission categories to calculate for your carbon impact report
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {calculationCategories.map((category) => {
                    const IconComponent = category.icon;
                    const isSelected = selectedCategories.includes(category.id);
                    return (
                      <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{category.label}</h3>
                            <p className="text-sm text-muted-foreground">{category.details}</p>
                          </div>
                        </div>
                        <Button 
                          onClick={() => handleCategoryToggle(category.id)}
                          className={isSelected ? "bg-gradient-hero hover:opacity-90" : ""}
                          variant={isSelected ? "default" : "outline"}
                        >
                          {isSelected ? "Selected" : "Select"}
                        </Button>
                      </div>
                    );
                  })}
                  <div className="flex justify-end pt-4">
                    <Button 
                      onClick={handleTickAll}
                      className="bg-gradient-hero hover:opacity-90"
                    >
                      {allSelected ? "Deselect All" : "Select All"}
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedCategories.length} of {calculationCategories.length} categories selected
                  </div>
                </CardContent>
              </Card>

              {/* Questionnaire Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Questionnaire
                  </CardTitle>
                  <CardDescription>
                    Optional custom questionnaire for suppliers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Custom Supplier Questionnaire</h3>
                        <p className="text-sm text-muted-foreground">Generate tailored questions for your suppliers and stakeholders</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setCreateQuestionnaire(!createQuestionnaire)}
                      className={createQuestionnaire ? "bg-gradient-hero hover:opacity-90" : ""}
                      variant={createQuestionnaire ? "default" : "outline"}
                    >
                      {createQuestionnaire ? "Create" : "Skip"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 pt-8">
                <Button 
                  variant="outline" 
                  onClick={handleCancel}
                  className="px-8"
                >
                  Back to Events
                </Button>
                <Button 
                  variant="outline"
                  className="px-8"
                >
                  Save
                </Button>
                <Button 
                  onClick={handleContinue}
                  disabled={selectedCategories.length === 0}
                  className="bg-gradient-hero hover:opacity-90 px-8"
                >
                  Continue
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default EventSuccess;