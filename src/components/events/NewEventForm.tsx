import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, CalendarDays, Users, MapPin, Building2 } from "lucide-react";

export function NewEventForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventName: "",
    client: "",
    eventType: "",
    startDate: "",
    endDate: "",
    venue: "",
    city: "",
    country: "",
    expectedAttendees: "",
    description: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Event created:", formData);
    navigate("/events");
  };

  const handleCancel = () => {
    navigate("/events");
  };

  return (
    <div className="bg-metric-card rounded-xl shadow-card border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-hero p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">NEW EVENT</h2>
        <p className="text-lg opacity-90">
          Create a new event to track environmental impact and carbon emissions.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="eventName" className="text-sm font-medium text-foreground flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                Event Name
              </Label>
              <Input
                id="eventName"
                placeholder="Enter event name"
                value={formData.eventName}
                onChange={(e) => handleInputChange("eventName", e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="client" className="text-sm font-medium text-foreground flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Client
              </Label>
              <Input
                id="client"
                placeholder="Enter client name"
                value={formData.client}
                onChange={(e) => handleInputChange("client", e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventType" className="text-sm font-medium text-foreground">
                Event Type
              </Label>
              <Select value={formData.eventType} onValueChange={(value) => handleInputChange("eventType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="seminar">Seminar</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="exhibition">Exhibition</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-sm font-medium text-foreground">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className="w-full"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedAttendees" className="text-sm font-medium text-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Expected Attendees
              </Label>
              <Input
                id="expectedAttendees"
                type="number"
                placeholder="Enter number of attendees"
                value={formData.expectedAttendees}
                onChange={(e) => handleInputChange("expectedAttendees", e.target.value)}
                className="w-full"
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="venue" className="text-sm font-medium text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Venue
              </Label>
              <Input
                id="venue"
                placeholder="Enter venue name"
                value={formData.venue}
                onChange={(e) => handleInputChange("venue", e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium text-foreground">
                City
              </Label>
              <Input
                id="city"
                placeholder="Enter city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="text-sm font-medium text-foreground">
                Country
              </Label>
              <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="es">Spain</SelectItem>
                  <SelectItem value="it">Italy</SelectItem>
                  <SelectItem value="nl">Netherlands</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-foreground">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter event description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="min-h-[120px] resize-none"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="px-8"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-8"
          >
            Create Event
          </Button>
        </div>
      </form>
    </div>
  );
}