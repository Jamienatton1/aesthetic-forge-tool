import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { EventsTable } from "@/components/events/EventsTable";

const Events = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto p-8">
          <EventsTable />
        </main>
      </div>
    </div>
  );
};

export default Events;