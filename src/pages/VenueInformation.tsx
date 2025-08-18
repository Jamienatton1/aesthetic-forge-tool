import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, Clock, Ruler, Plus, Star, ArrowLeft, Save } from "lucide-react";
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

interface Room {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  size: string;
  customSize: string;
  useAverages: boolean;
}

const VenueInformation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventData, categoryType, venueData } = location.state || {};

  const [venueRating, setVenueRating] = useState<number>(0);
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: "1",
      name: "",
      startTime: "",
      endTime: "",
      size: "average",
      customSize: "",
      useAverages: true
    }
  ]);

  const roomSizeOptions = [
    { value: "small", label: "Small (up to 50 people)" },
    { value: "medium", label: "Medium (50-150 people)" },
    { value: "large", label: "Large (150-500 people)" },
    { value: "extra-large", label: "Extra Large (500+ people)" },
    { value: "custom", label: "Custom Size" }
  ];

  const addRoom = () => {
    const newRoom: Room = {
      id: Date.now().toString(),
      name: "",
      startTime: "",
      endTime: "",
      size: "average",
      customSize: "",
      useAverages: true
    };
    setRooms([...rooms, newRoom]);
  };

  const removeRoom = (id: string) => {
    setRooms(rooms.filter(room => room.id !== id));
  };

  const updateRoom = (id: string, field: keyof Room, value: string | boolean) => {
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, [field]: value } : room
    ));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Venue Information:", { venueRating, rooms });
    navigate("/events/status");
  };

  const renderStarRating = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setVenueRating(star)}
            className={`p-1 transition-colors ${
              star <= venueRating
                ? "text-accent"
                : "text-muted-foreground hover:text-accent/70"
            }`}
          >
            <Star className="w-6 h-6 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <EventsHeader 
          title="Venue Information" 
          subtitle="Enter detailed information about the venue and rooms" 
        />
        
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Venue Details Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Venue Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Venue Name</Label>
                    <Input 
                      value={venueData?.name || eventData?.venue || ""} 
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Venue Rating</Label>
                    <div className="flex items-center gap-3">
                      {renderStarRating()}
                      <span className="text-sm text-muted-foreground">
                        {venueRating > 0 ? `${venueRating} star${venueRating > 1 ? 's' : ''}` : "No rating"}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Address</Label>
                  <Textarea 
                    value={venueData?.address || eventData?.address || ""} 
                    readOnly
                    className="bg-muted resize-none"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Rooms Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ruler className="w-5 h-5" />
                  Room Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {rooms.map((room, index) => (
                  <div key={room.id} className="space-y-4 p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Room {index + 1}</h4>
                      {rooms.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRoom(room.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Room Name/Description</Label>
                        <Input
                          placeholder="e.g., Main Hall, Conference Room A"
                          value={room.name}
                          onChange={(e) => updateRoom(room.id, "name", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Start Time</Label>
                        <Input
                          type="time"
                          value={room.startTime}
                          onChange={(e) => updateRoom(room.id, "startTime", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">End Time</Label>
                        <Input
                          type="time"
                          value={room.endTime}
                          onChange={(e) => updateRoom(room.id, "endTime", e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Use Average Carbon Calculations</Label>
                        <Switch
                          checked={room.useAverages}
                          onCheckedChange={(checked) => updateRoom(room.id, "useAverages", checked)}
                        />
                      </div>
                      
                      {!room.useAverages && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Room Size</Label>
                            <Select
                              value={room.size}
                              onValueChange={(value) => updateRoom(room.id, "size", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select room size" />
                              </SelectTrigger>
                              <SelectContent>
                                {roomSizeOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          {room.size === "custom" && (
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">Custom Size (sq ft)</Label>
                              <Input
                                type="number"
                                placeholder="Enter square footage"
                                value={room.customSize}
                                onChange={(e) => updateRoom(room.id, "customSize", e.target.value)}
                              />
                            </div>
                          )}
                        </div>
                      )}
                      
                      {room.useAverages && (
                        <div className="p-3 bg-muted rounded-md">
                          <p className="text-sm text-muted-foreground">
                            Carbon calculations will use industry averages based on venue type and event duration.
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {index < rooms.length - 1 && <Separator />}
                  </div>
                ))}
                
                <Button
                  variant="outline"
                  onClick={addRoom}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Room
                </Button>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              
              <Button 
                onClick={handleSubmit}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Information
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueInformation;