import { Sidebar } from "@/components/dashboard/Sidebar";
import { EventsHeader } from "@/components/events/EventsHeader";
import { EventDetailsForm } from "@/components/events/EventDetailsForm";
import { EventProgressBar } from "@/components/events/EventProgressBar";

const EventDetails = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <EventsHeader title="Event Management" subtitle="Complete your event details and schedule" />
        
        <EventProgressBar currentStep={1} completedSteps={[]} />
        
        <main className="flex-1 overflow-auto p-8">
          <EventDetailsForm />
        </main>
      </div>
    </div>
  );
};

export default EventDetails;