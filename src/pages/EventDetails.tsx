import { Sidebar } from "@/components/dashboard/Sidebar";
import { EventsHeader } from "@/components/events/EventsHeader";
import { EventDetailsForm } from "@/components/events/EventDetailsForm";

const EventDetails = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <EventsHeader title="Create Event" subtitle="Complete your event details and schedule" />
        
        <main className="flex-1 overflow-auto p-8">
          <EventDetailsForm />
        </main>
      </div>
    </div>
  );
};

export default EventDetails;