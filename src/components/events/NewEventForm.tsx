import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function NewEventForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventName: "",
    client: "",
    eventType: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    venue: "",
    venueType: "",
    expectedAttendees: "",
    description: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Event created:", formData);
    navigate("/events");
  };

  const handleCancel = () => {
    navigate("/events");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-background border border-border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Create event</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="eventName" className="text-sm font-medium text-foreground">
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
            <Label htmlFor="client" className="text-sm font-medium text-foreground">
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
              <Label htmlFor="startDate" className="text-sm font-medium text-foreground">
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
              <Label htmlFor="startTime" className="text-sm font-medium text-foreground">
                Start Time
              </Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => handleInputChange("startTime", e.target.value)}
                className="w-full"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
            <div className="space-y-2">
              <Label htmlFor="endTime" className="text-sm font-medium text-foreground">
                End Time
              </Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => handleInputChange("endTime", e.target.value)}
                className="w-full"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="venue" className="text-sm font-medium text-foreground">
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
            <Label htmlFor="venueType" className="text-sm font-medium text-foreground">
              Venue Type
            </Label>
            <Select value={formData.venueType} onValueChange={(value) => handleInputChange("venueType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select venue type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exhibition-centre">Exhibition Centre</SelectItem>
                <SelectItem value="hotel">Hotel</SelectItem>
                <SelectItem value="conference-centre">Conference Centre</SelectItem>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="outdoor">Outdoor</SelectItem>
                <SelectItem value="virtual">Virtual</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expectedAttendees" className="text-sm font-medium text-foreground">
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

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-foreground">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter event description (optional)"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Save and Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}