import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, Clock, Ruler, Plus, Star, ArrowLeft, Save, Info, HelpCircle } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { EventsHeader } from "@/components/events/EventsHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Space {
  id: string;
  name: string;
  type: string;
  startTime: string;
  endTime: string;
  attendees: number;
  size: number;
  height: number;
  co2: number;
  useAverages: boolean;
}

interface Venue {
  id: string;
  name: string;
  address: string;
  rating: number;
  spaces: Space[];
}

const VenueInformation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventData, selectedCategories } = location.state || {};

  // Main venue state
  const [venueName, setVenueName] = useState(eventData?.venue || "");
  const [venueAddress, setVenueAddress] = useState(eventData?.address || "");
  const [venueRating, setVenueRating] = useState<number>(0);
  const [spaces, setSpaces] = useState<Space[]>([
    {
      id: "1",
      name: "Main Hall",
      type: "meeting-room",
      startTime: "",
      endTime: "",
      attendees: 0,
      size: 0,
      height: 0,
      co2: 0,
      useAverages: true
    }
  ]);

  // Additional venues state
  const [additionalVenues, setAdditionalVenues] = useState<Venue[]>([]);

  const calculateCO2 = (attendees: number, size: number, rating: number, useAverages: boolean): number => {
    if (useAverages) {
      // Base calculation with star rating multiplier
      const baseEmission = attendees * 2.5; // kg CO2 per person base
      const ratingMultiplier = rating > 0 ? (6 - rating) * 0.2 : 1; // Higher star rating = lower emissions
      return Math.round(baseEmission * ratingMultiplier * 100) / 100;
    }
    // Custom calculation based on size and other factors
    const sizeEmission = size * 0.1; // kg CO2 per sq ft
    const attendeeEmission = attendees * 2.0;
    const ratingMultiplier = rating > 0 ? (6 - rating) * 0.15 : 1;
    return Math.round((sizeEmission + attendeeEmission) * ratingMultiplier * 100) / 100;
  };

  const addSpace = () => {
    const newSpace: Space = {
      id: Date.now().toString(),
      name: "",
      type: "meeting-room",
      startTime: "",
      endTime: "",
      attendees: 0,
      size: 0,
      height: 0,
      co2: 0,
      useAverages: true
    };
    setSpaces([...spaces, newSpace]);
  };

  const removeSpace = (id: string) => {
    setSpaces(spaces.filter(space => space.id !== id));
  };

  const updateSpace = (id: string, field: keyof Space, value: string | number | boolean) => {
    setSpaces(spaces.map(space => {
      if (space.id === id) {
        const updatedSpace = { ...space, [field]: value };
        // Recalculate CO2 when relevant fields change
        if (['attendees', 'size', 'useAverages'].includes(field)) {
          updatedSpace.co2 = calculateCO2(
            updatedSpace.attendees, 
            updatedSpace.size, 
            venueRating, 
            updatedSpace.useAverages
          );
        }
        return updatedSpace;
      }
      return space;
    }));
  };

  // Recalculate CO2 for all spaces when venue rating changes
  const updateVenueRating = (rating: number) => {
    setVenueRating(rating);
    setSpaces(spaces.map(space => ({
      ...space,
      co2: calculateCO2(space.attendees, space.size, rating, space.useAverages)
    })));
  };

  // Additional venue functions
  const addAdditionalVenue = () => {
    const newVenue: Venue = {
      id: Date.now().toString(),
      name: "",
      address: "",
      rating: 0,
      spaces: [{
        id: Date.now().toString() + "_space",
        name: "Main Hall",
        type: "meeting-room",
        startTime: "",
        endTime: "",
        attendees: 0,
        size: 0,
        height: 0,
        co2: 0,
        useAverages: true
      }]
    };
    setAdditionalVenues([...additionalVenues, newVenue]);
  };

  const removeAdditionalVenue = (venueId: string) => {
    setAdditionalVenues(additionalVenues.filter(venue => venue.id !== venueId));
  };

  const updateAdditionalVenue = (venueId: string, field: keyof Venue, value: string | number) => {
    setAdditionalVenues(additionalVenues.map(venue => {
      if (venue.id === venueId) {
        const updatedVenue = { ...venue, [field]: value };
        // Recalculate CO2 for all spaces when rating changes
        if (field === 'rating') {
          updatedVenue.spaces = venue.spaces.map(space => ({
            ...space,
            co2: calculateCO2(space.attendees, space.size, value as number, space.useAverages)
          }));
        }
        return updatedVenue;
      }
      return venue;
    }));
  };

  const addSpaceToVenue = (venueId: string) => {
    setAdditionalVenues(additionalVenues.map(venue => {
      if (venue.id === venueId) {
        const newSpace: Space = {
          id: Date.now().toString(),
          name: "",
          type: "meeting-room",
          startTime: "",
          endTime: "",
          attendees: 0,
          size: 0,
          height: 0,
          co2: 0,
          useAverages: true
        };
        return { ...venue, spaces: [...venue.spaces, newSpace] };
      }
      return venue;
    }));
  };

  const removeSpaceFromVenue = (venueId: string, spaceId: string) => {
    setAdditionalVenues(additionalVenues.map(venue => {
      if (venue.id === venueId) {
        return { ...venue, spaces: venue.spaces.filter(space => space.id !== spaceId) };
      }
      return venue;
    }));
  };

  const updateVenueSpace = (venueId: string, spaceId: string, field: keyof Space, value: string | number | boolean) => {
    setAdditionalVenues(additionalVenues.map(venue => {
      if (venue.id === venueId) {
        const updatedSpaces = venue.spaces.map(space => {
          if (space.id === spaceId) {
            const updatedSpace = { ...space, [field]: value };
            // Recalculate CO2 when relevant fields change
            if (['attendees', 'size', 'useAverages'].includes(field)) {
              updatedSpace.co2 = calculateCO2(
                updatedSpace.attendees, 
                updatedSpace.size, 
                venue.rating, 
                updatedSpace.useAverages
              );
            }
            return updatedSpace;
          }
          return space;
        });
        return { ...venue, spaces: updatedSpaces };
      }
      return venue;
    }));
  };

  const handleSubmit = () => {
    const mainVenue = { name: venueName, address: venueAddress, rating: venueRating, spaces };
    console.log("Venue Information:", { mainVenue, additionalVenues });
    
    // Navigate to next category in the flow
    const categoryOrder = ["venue", "food-drink", "travel", "accommodations", "promotion-items"];
    const currentIndex = categoryOrder.indexOf("venue");
    
    // Find next selected category
    for (let i = currentIndex + 1; i < categoryOrder.length; i++) {
      if (selectedCategories?.includes(categoryOrder[i])) {
        const nextCategory = categoryOrder[i];
        if (nextCategory === "food-drink") navigate("/food-drink", { state: { eventData, selectedCategories } });
        else if (nextCategory === "travel") navigate("/travel", { state: { eventData, selectedCategories } });
        else if (nextCategory === "accommodations") navigate("/accommodations", { state: { eventData, selectedCategories } });
        else if (nextCategory === "promotion-items") navigate("/promotion-items", { state: { eventData, selectedCategories } });
        return;
      }
    }
    
    // If no more categories, go to questionnaire
    navigate("/questionnaire", { state: { eventData, selectedCategories } });
  };

  const renderStarRating = (rating: number, onRatingChange: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onRatingChange(star)}
              className={`p-1 transition-colors ${
                star <= rating
                  ? "text-yellow-400"
                  : "text-muted-foreground hover:text-yellow-400/70"
              }`}
            >
              <Star className="w-5 h-5 fill-current" />
            </button>
          ))}
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1 h-auto">
                <Info className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <p className="text-sm">
                Star rating affects CO2 calculations. Higher rated venues (4-5 stars) typically have better 
                energy efficiency and lower emissions. Lower rated venues may have higher carbon footprints.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  };

  const renderSpacesSection = (spaces: Space[], onAddSpace: () => void, onRemoveSpace: (id: string) => void, onUpdateSpace: (id: string, field: keyof Space, value: string | number | boolean) => void) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Ruler className="w-5 h-5" />
          Spaces
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1 h-auto">
                  <Info className="w-4 h-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <p className="text-sm">
                  If you don't know the size of your spaces, we'll calculate based on standard values. You can manually enter exact dimensions too.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <Button onClick={onAddSpace} size="sm" className="bg-gradient-hero hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Add Space
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {spaces.map((space) => (
          <Card key={space.id} className="border-l-4 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={space.useAverages}
                    onCheckedChange={(checked) => onUpdateSpace(space.id, "useAverages", checked)}
                  />
                  <div className="text-sm">
                    <span className="font-medium">Use industry average space size for CO₂ calculation.</span>
                  </div>
                </div>
                {spaces.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveSpace(space.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    ×
                  </Button>
                )}
              </div>

              {/* Basic Info - Always shown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Space Name</Label>
                  <Input
                    value={space.name}
                    onChange={(e) => onUpdateSpace(space.id, "name", e.target.value)}
                    placeholder="Enter space name"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Usage Times</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      value={space.startTime}
                      onChange={(e) => onUpdateSpace(space.id, "startTime", e.target.value)}
                      className="flex-1"
                    />
                    <span className="text-muted-foreground">to</span>
                    <Input
                      type="time"
                      value={space.endTime}
                      onChange={(e) => onUpdateSpace(space.id, "endTime", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              {space.useAverages ? (
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      CO₂: {space.co2.toFixed(2)} kg
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Average size will be used to calculate CO₂ emissions based on industry standards.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Type</Label>
                    <Select 
                      value={space.type} 
                      onValueChange={(value) => onUpdateSpace(space.id, "type", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meeting-room">Meeting Room</SelectItem>
                        <SelectItem value="expo">Expo Hall</SelectItem>
                        <SelectItem value="auditorium">Auditorium</SelectItem>
                        <SelectItem value="conference">Conference Room</SelectItem>
                        <SelectItem value="ballroom">Ballroom</SelectItem>
                        <SelectItem value="workshop">Workshop Space</SelectItem>
                        <SelectItem value="breakout">Breakout Room</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Size (m²)</Label>
                    <Input
                      type="number"
                      value={space.size || ""}
                      onChange={(e) => onUpdateSpace(space.id, "size", parseInt(e.target.value) || 0)}
                      placeholder="Enter size"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Attendees</Label>
                    <Input
                      type="number"
                      value={space.attendees || ""}
                      onChange={(e) => onUpdateSpace(space.id, "attendees", parseInt(e.target.value) || 0)}
                      placeholder="Number of attendees"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">CO₂ Emissions</Label>
                    <Badge variant="secondary" className="w-fit">
                      {space.co2.toFixed(2)} kg CO₂
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <EventsHeader 
          title="Venue Information" 
          subtitle="Enter detailed information about the venue and spaces" 
        />
        
        <div className="flex-1 overflow-auto">
          {/* Hero Section */}
          <div className="bg-gradient-hero text-white px-8 py-12">
            <div className="max-w-4xl">
              <h1 className="text-4xl font-bold mb-4">Spaces</h1>
              <p className="text-xl opacity-90">
                Event: {eventData?.eventName || "Event Name"} • Physical Attendees: {eventData?.physicalAttendees || 100} • Virtual Attendees: {eventData?.virtualAttendees || 50} • Staff: {eventData?.staff || 10}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-8 space-y-8">
            {/* Main Venue Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Main Venue
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Venue Name</Label>
                    <Input 
                      value={venueName}
                      onChange={(e) => setVenueName(e.target.value)}
                      placeholder="Enter venue name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      Venue Rating
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs">
                            <p className="text-sm">
                              Rate the venue's sustainability features and energy efficiency. This affects carbon emission calculations.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    {renderStarRating(venueRating, updateVenueRating)}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Address</Label>
                  <Input 
                    value={venueAddress}
                    onChange={(e) => setVenueAddress(e.target.value)}
                    placeholder="Enter venue address"
                    className="text-sm"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Main Venue Spaces */}
            {renderSpacesSection(spaces, addSpace, removeSpace, updateSpace)}

            {/* Add Additional Venue Button */}
            <div className="flex justify-center">
              <Button 
                onClick={addAdditionalVenue} 
                variant="outline" 
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Additional Venue
              </Button>
            </div>

            {/* Additional Venues */}
            {additionalVenues.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Additional Venues
                </h3>
                
                <Accordion type="multiple" className="space-y-4">
                  {additionalVenues.map((venue, index) => (
                    <AccordionItem key={venue.id} value={venue.id} className="border rounded-lg">
                      <Card>
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span className="font-medium">
                                {venue.name || `Additional Venue ${index + 1}`}
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeAdditionalVenue(venue.id);
                              }}
                              className="text-destructive hover:text-destructive"
                            >
                              Remove
                            </Button>
                          </div>
                        </AccordionTrigger>
                        
                        <AccordionContent className="px-6 pb-6">
                          <div className="space-y-6">
                            {/* Venue Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <Label className="text-sm font-medium">Venue Name</Label>
                                <Input 
                                  value={venue.name}
                                  onChange={(e) => updateAdditionalVenue(venue.id, "name", e.target.value)}
                                  placeholder="Enter venue name"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-sm font-medium flex items-center gap-2">
                                  Venue Rating
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                                      </TooltipTrigger>
                                      <TooltipContent side="top" className="max-w-xs">
                                        <p className="text-sm">
                                          Rate the venue's sustainability features and energy efficiency. This affects carbon emission calculations.
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </Label>
                                {renderStarRating(venue.rating, (rating) => updateAdditionalVenue(venue.id, "rating", rating))}
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">Address</Label>
                              <Input 
                                value={venue.address}
                                onChange={(e) => updateAdditionalVenue(venue.id, "address", e.target.value)}
                                placeholder="Enter venue address"
                                className="text-sm"
                              />
                            </div>

                            {/* Venue Spaces */}
                            <div className="border-t pt-6">
                              {renderSpacesSection(
                                venue.spaces, 
                                () => addSpaceToVenue(venue.id),
                                (spaceId) => removeSpaceFromVenue(venue.id, spaceId),
                                (spaceId, field, value) => updateVenueSpace(venue.id, spaceId, field, value)
                              )}
                            </div>
                          </div>
                        </AccordionContent>
                      </Card>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2"
              >
                ← Back
              </Button>
              
              <div className="flex gap-4">
                <Button 
                  variant="outline"
                  onClick={() => console.log("Save venue information")}
                  className="flex items-center gap-2"
                >
                  Save
                </Button>
                <Button 
                  onClick={handleSubmit}
                  className="bg-gradient-hero hover:opacity-90 flex items-center gap-2"
                >
                  Next →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueInformation;