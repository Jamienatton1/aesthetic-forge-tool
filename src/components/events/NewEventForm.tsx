import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function NewEventForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const savedData = location.state || {};
  
  const [formData, setFormData] = useState({
    eventName: savedData.eventName || "",
    client: savedData.client || "",
    venueName: savedData.venueName || "",
    eventType: savedData.eventType || "",
    country: savedData.country || "",
    city: savedData.city || ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Event basic info:", formData);
    navigate("/events/details", { state: formData });
  };

  const handleCancel = () => {
    navigate("/events");
  };

  return (
    <div className="bg-metric-card rounded-xl shadow-card border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 p-8 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">CREATE NEW EVENT</h1>
            <p className="text-xl opacity-90">
              Set up a new environmental event for tracking
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="eventName" className="text-lg font-semibold text-foreground">
                Event Name
              </Label>
              <Input
                id="eventName"
                placeholder="Enter event name"
                value={formData.eventName}
                onChange={(e) => handleInputChange("eventName", e.target.value)}
                className="h-12 text-base"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="client" className="text-lg font-semibold text-foreground">
                Client
              </Label>
              <Input
                id="client"
                placeholder="Enter client name"
                value={formData.client}
                onChange={(e) => handleInputChange("client", e.target.value)}
                className="h-12 text-base"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="venueName" className="text-lg font-semibold text-foreground">
                Venue Name
              </Label>
              <Input
                id="venueName"
                placeholder="Enter venue name"
                value={formData.venueName}
                onChange={(e) => handleInputChange("venueName", e.target.value)}
                className="h-12 text-base"
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="eventType" className="text-lg font-semibold text-foreground">
                Event Type
              </Label>
              <Select value={formData.eventType} onValueChange={(value) => handleInputChange("eventType", value)}>
                <SelectTrigger className="h-12 text-base">
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

            <div className="space-y-3">
              <Label htmlFor="country" className="text-lg font-semibold text-foreground">
                Country
              </Label>
              <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                <SelectTrigger className="h-12 text-base">
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
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="sg">Singapore</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="city" className="text-lg font-semibold text-foreground">
                City
              </Label>
              <Input
                id="city"
                placeholder="Enter city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="h-12 text-base"
                required
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 mt-12 pt-8 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="px-8 py-3 text-base font-medium h-auto uppercase tracking-wide"
            size="lg"
          >
            CANCEL
          </Button>
          <Button
            type="submit"
            className="px-8 py-3 text-base font-semibold h-auto uppercase tracking-wide"
            size="lg"
          >
            SAVE AND CONTINUE
          </Button>
        </div>
      </form>
    </div>
  );
}