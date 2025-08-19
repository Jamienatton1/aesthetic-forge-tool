import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Edit3, Calendar, MapPin, Users, Building2, ChevronDown, ChevronUp } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { EventsHeader } from "@/components/events/EventsHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    { 
      id: "food", 
      label: "Food & Drink", 
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    { 
      id: "travel", 
      label: "Travel", 
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    { 
      id: "accommodations", 
      label: "Accommodations", 
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    { 
      id: "promotion", 
      label: "Promotion Items", 
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
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
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Choose Which Emissions to Calculate</h3>
                  <p className="text-muted-foreground mb-4">Empower your meetings and events sustainability; accurately track and reduce your events carbon footprint. Please select which emissions you want to calculate as part of your carbon impact report.</p>
                  <Button 
                    variant="outline" 
                    onClick={handleTickAll}
                    className="text-sm mb-4"
                    size="sm"
                  >
                    {allSelected ? "Untick All" : "Tick All"}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {calculationCategories.map((category) => (
                    <div 
                      key={category.id}
                      className={cn(
                        "rounded-lg border transition-colors",
                        selectedCategories.includes(category.id) 
                          ? "border-accent bg-accent/10" 
                          : "border-border bg-card"
                      )}
                    >
                      <div 
                        className="flex items-center gap-3 p-3 cursor-pointer hover:bg-accent/5"
                        onClick={() => handleCategoryToggle(category.id)}
                      >
                        <Checkbox 
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => handleCategoryToggle(category.id)}
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground text-sm">{category.label}</h4>
                        </div>
                      </div>
                      
                      <Collapsible 
                        open={expandedCategories.includes(category.id)}
                        onOpenChange={() => toggleCategoryExpansion(category.id)}
                      >
                        <CollapsibleTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-full justify-between text-xs h-8 px-3"
                          >
                            More information
                            {expandedCategories.includes(category.id) ? 
                              <ChevronUp className="h-3 w-3" /> : 
                              <ChevronDown className="h-3 w-3" />
                            }
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-3 pb-3">
                          <p className="text-xs text-muted-foreground bg-accent/5 p-2 rounded">
                            {category.details}
                          </p>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    {selectedCategories.length} of {calculationCategories.length} categories selected
                  </p>
                </div>
              </div>

              {/* Questionnaire Section */}
              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Create Questionnaire</h3>
                  <p className="text-muted-foreground">Would you like to create a questionnaire for your suppliers?</p>
                </div>
                
                <div className={cn(
                  "rounded-lg border transition-colors",
                  createQuestionnaire 
                    ? "border-accent bg-accent/10" 
                    : "border-border bg-card"
                )}>
                  <div 
                    className="flex items-center gap-3 p-4 cursor-pointer hover:bg-accent/5"
                    onClick={() => setCreateQuestionnaire(!createQuestionnaire)}
                  >
                    <Checkbox 
                      checked={createQuestionnaire}
                      onCheckedChange={(checked) => setCreateQuestionnaire(checked === true)}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">Create Custom Questionnaire</h4>
                      <p className="text-sm text-muted-foreground">Generate tailored questions for your suppliers and stakeholders</p>
                    </div>
                  </div>
                  
                  <Collapsible 
                    open={expandedQuestionnaire}
                    onOpenChange={setExpandedQuestionnaire}
                  >
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-between h-10 px-4"
                      >
                        More information
                        {expandedQuestionnaire ? 
                          <ChevronUp className="h-4 w-4" /> : 
                          <ChevronDown className="h-4 w-4" />
                        }
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="bg-accent/5 p-4 rounded space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  {createQuestionnaire && <span className="text-accent">• Questionnaire will be created</span>}
                </div>
                
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
        </main>
      </div>
    </div>
  );
};

export default EventSuccess;