import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { format, differenceInDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface EventDetailsFormProps {
  initialEventType?: string;
}

export function EventDetailsForm({ initialEventType = "" }: EventDetailsFormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const eventData = location.state || {};
  
  const [formData, setFormData] = useState({
    eventType: initialEventType || eventData.eventType || "",
    industry: "",
    physicalAttendees: "",
    virtualAttendees: "",
    eventStaff: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined
  });

  const [daysDifference, setDaysDifference] = useState<number | null>(null);

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const days = differenceInDays(formData.endDate, formData.startDate);
      setDaysDifference(days >= 0 ? days + 1 : null); // +1 to include both start and end days
    } else {
      setDaysDifference(null);
    }
  }, [formData.startDate, formData.endDate]);

  const handleInputChange = (field: string, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Event details completed:", { ...eventData, ...formData });
    navigate("/events");
  };

  const handleBack = () => {
    navigate("/events/new", { state: eventData });
  };

  return (
    <div className="bg-metric-card rounded-xl shadow-card border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-hero p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">CREATE EVENT</h2>
        <p className="text-lg opacity-90">
          Complete your event details and schedule
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-8">
        <div className="space-y-6">
          {/* Event Type */}
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

          {/* Industry */}
          <div className="space-y-2">
            <Label htmlFor="industry" className="text-sm font-medium text-foreground">
              Industry
            </Label>
            <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="energy">Energy</SelectItem>
                <SelectItem value="transportation">Transportation</SelectItem>
                <SelectItem value="media">Media & Entertainment</SelectItem>
                <SelectItem value="government">Government</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Fields - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Event Live Start Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => handleInputChange("startDate", date)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Event End Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? format(formData.endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) => handleInputChange("endDate", date)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                    disabled={(date) => formData.startDate ? date < formData.startDate : false}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Duration Display */}
          {daysDifference !== null && (
            <div className="p-4 bg-accent/50 rounded-lg border border-border">
              <p className="text-sm font-medium text-foreground">
                Event Duration: <span className="text-primary font-bold">{daysDifference} day{daysDifference !== 1 ? 's' : ''}</span>
              </p>
            </div>
          )}

          {/* Attendees Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="physicalAttendees" className="text-sm font-medium text-foreground">
                Physical Attendees
              </Label>
              <Input
                id="physicalAttendees"
                type="number"
                placeholder="Number of physical attendees"
                value={formData.physicalAttendees}
                onChange={(e) => handleInputChange("physicalAttendees", e.target.value)}
                className="w-full"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="virtualAttendees" className="text-sm font-medium text-foreground">
                Virtual Attendees
              </Label>
              <Input
                id="virtualAttendees"
                type="number"
                placeholder="Number of virtual attendees"
                value={formData.virtualAttendees}
                onChange={(e) => handleInputChange("virtualAttendees", e.target.value)}
                className="w-full"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventStaff" className="text-sm font-medium text-foreground">
                Event Staff
              </Label>
              <Input
                id="eventStaff"
                type="number"
                placeholder="Number of event staff"
                value={formData.eventStaff}
                onChange={(e) => handleInputChange("eventStaff", e.target.value)}
                className="w-full"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-between gap-4 mt-8 pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="px-8"
          >
            Back
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