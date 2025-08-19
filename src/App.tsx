import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import NewEvent from "./pages/NewEvent";
import EventDetails from "./pages/EventDetails";
import EventSuccess from "./pages/EventSuccess";
import SupplierContributors from "./pages/SupplierContributors";
import SupplierStatus from "./pages/SupplierStatus";
import VenueInformation from "./pages/VenueInformation";
import FoodDrink from "./pages/FoodDrink";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/new" element={<NewEvent />} />
          <Route path="/events/details" element={<EventDetails />} />
          <Route path="/events/success" element={<EventSuccess />} />
          <Route path="/events/suppliers" element={<SupplierContributors />} />
          <Route path="/events/status" element={<SupplierStatus />} />
          <Route path="/events/venue-information" element={<VenueInformation />} />
          <Route path="/events/food-drink" element={<FoodDrink />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
