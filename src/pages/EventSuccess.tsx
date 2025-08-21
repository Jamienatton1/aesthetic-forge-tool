import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Edit3, Calendar, MapPin, Users, Building2, ChevronDown, ChevronUp, Hotel, Utensils, Car, Gift, Info, ArrowRight, Check } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { EventsHeader } from "@/components/events/EventsHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
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
      label: "Travel", 
      icon: Car,
      details: "Measure emissions from attendee transportation including flights, trains, cars, and local transport to reach the venue."
    },
    { 
      id: "accommodations", 
      label: "Accommodations", 
      icon: Hotel,
      details: "Account for hotel stays, energy usage, and related services for out-of-town attendees and event staff."
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
    
    // Navigate to first selected category in priority order
    if (selectedCategories.includes("venue")) {
      navigate("/events/venue-information");
    } else if (selectedCategories.includes("food")) {
      navigate("/events/food-drink");
    } else if (selectedCategories.includes("travel")) {
      navigate("/events/travel");
    } else if (selectedCategories.includes("accommodations")) {
      navigate("/events/accommodations");
    } else if (selectedCategories.includes("promotion")) {
      navigate("/events/promotion-items");
    } else if (createQuestionnaire) {
      navigate("/events/questionnaire");
    } else {
      navigate("/events/suppliers", { 
        state: { 
          eventData, 
          selectedCategories 
        } 
      });
    }
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
          
          <main className="flex-1 overflow-auto p-8">
            <div className="bg-metric-card rounded-xl shadow-card border border-border overflow-hidden">
              
              {/* Progress UI */}
              <div className="px-8 pt-6 pb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-accent">
                    <Check className="w-4 h-4" />
                    <span className="font-medium">Step 1: Event Details</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <div className="flex items-center gap-2 text-foreground">
                    <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span className="font-medium">Step 2: Select Emission Categories</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30"></div>
                    <span>Step 3: Generate Report</span>
                  </div>
                </div>
                <Progress value={33} className="mt-3" />
              </div>

              {/* Success Header */}
              <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 p-8 text-primary-foreground">
                <div className="flex items-center">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 animate-pulse" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold mb-2">Event Created Successfully!</h1>
                      <p className="text-xl opacity-90 mb-4">
                        Your event "{eventData.eventName || "Untitled Event"}" has been created. Start calculating your environmental impact.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Info Card */}
              <div className="p-8">
                <div className="bg-white rounded-xl border border-border shadow-sm p-8 mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                        <Calendar className="w-6 h-6 text-primary" />
                        {eventData.eventName || "Untitled Event"} - {eventData.client || "No client specified"}
                      </h2>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={handleEdit}
                      className="flex items-center gap-2 text-base font-medium px-6 py-3 h-auto hover:bg-accent"
                    >
                      <Edit3 className="w-5 h-5" />
                      Edit Details
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <MapPin className="w-6 h-6 text-primary" />
                        <div>
                          <p className="text-base font-semibold text-foreground">
                            {eventData.city || "Not specified"}, {eventData.country || ""}
                          </p>
                          <p className="text-sm text-muted-foreground">Location</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Building2 className="w-6 h-6 text-primary" />
                        <div>
                          <p className="text-base font-semibold text-foreground">{eventData.venueName || "Not specified"}</p>
                          <p className="text-sm text-muted-foreground">Venue</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Users className="w-6 h-6 text-primary" />
                        <div>
                          <p className="text-base font-semibold text-foreground">{eventData.physicalAttendees || eventData.attendees || "Not specified"}</p>
                          <p className="text-sm text-muted-foreground">Attendees</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <CheckCircle className="w-6 h-6 text-primary" />
                        <div>
                          <p className="text-base font-semibold text-foreground capitalize">{eventData.eventType || "Not specified"}</p>
                          <p className="text-sm text-muted-foreground">Event Type</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Choose Emission Categories */}
                <div className="space-y-6 mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Choose Emission Categories</h2>
                    <p className="text-base text-muted-foreground mb-6">
                      Empower your meetings and events sustainability; accurately track and reduce your events carbon footprint. 
                      Please select which emissions you want to calculate as part of your carbon impact report.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={handleTickAll}
                      className="text-sm font-semibold uppercase tracking-wide px-4 py-2"
                      size="sm"
                    >
                      {allSelected ? "UNTICK ALL" : "TICK ALL"}
                    </Button>
                  </div>
                  
                  <div className="grid gap-4">
                    {calculationCategories.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <div 
                          key={category.id}
                          className={cn(
                            "rounded-xl border-2 transition-all duration-200 hover:shadow-md",
                            selectedCategories.includes(category.id) 
                              ? "border-primary bg-primary/5 shadow-sm" 
                              : "border-border bg-card hover:border-primary/30"
                          )}
                        >
                          <div 
                            className="flex items-center gap-4 p-6 cursor-pointer"
                            onClick={() => handleCategoryToggle(category.id)}
                          >
                            <Checkbox 
                              checked={selectedCategories.includes(category.id)}
                              onCheckedChange={() => handleCategoryToggle(category.id)}
                              className="w-5 h-5"
                            />
                            <IconComponent className="w-8 h-8 text-primary" />
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-foreground">{category.label}</h3>
                            </div>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="text-muted-foreground hover:text-foreground"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleCategoryExpansion(category.id);
                                  }}
                                >
                                  <Info className="w-4 h-4" />
                                  More info
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs">
                                <p className="text-sm">{category.details}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="flex justify-between items-center pt-6 border-t border-border">
                    <p className="text-base text-muted-foreground">
                      {selectedCategories.length} of {calculationCategories.length} categories selected
                    </p>
                  </div>
                </div>

                {/* Create Custom Questionnaire */}
                <div className="space-y-6 mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Create Custom Questionnaire</h2>
                    <p className="text-base text-muted-foreground">Would you like to create a questionnaire for your suppliers?</p>
                  </div>
                  
                  <div className={cn(
                    "rounded-xl border-2 transition-all duration-200",
                    createQuestionnaire 
                      ? "border-primary bg-primary/5 shadow-sm" 
                      : "border-border bg-card hover:border-primary/30"
                  )}>
                    <div 
                      className="flex items-center gap-4 p-6 cursor-pointer"
                      onClick={() => setCreateQuestionnaire(!createQuestionnaire)}
                    >
                      <Checkbox 
                        checked={createQuestionnaire}
                        onCheckedChange={(checked) => setCreateQuestionnaire(checked === true)}
                        className="w-5 h-5"
                      />
                      <Gift className="w-8 h-8 text-primary" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground">Create Custom Questionnaire</h3>
                        <p className="text-base text-muted-foreground">Generate tailored questions for your suppliers and stakeholders</p>
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedQuestionnaire(!expandedQuestionnaire);
                            }}
                          >
                            <Info className="w-4 h-4" />
                            More info
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <p className="text-sm">Create customized questionnaires to gather specific sustainability data from your suppliers and stakeholders for more accurate carbon footprint calculations.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-8 border-t border-border">
                  <div className="text-base text-muted-foreground">
                    {createQuestionnaire && (
                      <span className="text-primary font-medium">• Custom questionnaire will be created</span>
                    )}
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={handleCancel}
                      className="px-8 py-3 text-base font-medium h-auto"
                      size="lg"
                    >
                      CANCEL
                    </Button>
                    <Button 
                      onClick={handleContinue}
                      disabled={selectedCategories.length === 0}
                      className="px-8 py-3 text-base font-semibold h-auto uppercase tracking-wide"
                      size="lg"
                    >
                      CONTINUE
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default EventSuccess;