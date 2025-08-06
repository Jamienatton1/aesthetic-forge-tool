import { Sidebar } from "@/components/dashboard/Sidebar";
import { EventsHeader } from "@/components/events/EventsHeader";
import { NewEventForm } from "@/components/events/NewEventForm";

const NewEvent = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <EventsHeader />
        
        <main className="flex-1 overflow-auto p-8">
          <NewEventForm />
        </main>
      </div>
    </div>
  );
};

export default NewEvent;