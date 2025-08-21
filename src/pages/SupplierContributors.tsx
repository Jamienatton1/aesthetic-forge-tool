import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Plus, ArrowLeft, Trash2, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { EventsHeader } from "@/components/events/EventsHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface Supplier {
  id: string;
  name: string;
  email: string;
  category: string;
  dueDate: Date | undefined;
}

const SupplierContributors = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventData, selectedCategories = [] } = location.state || {};
  
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: "1",
      name: "",
      email: "",
      category: "",
      dueDate: undefined
    }
  ]);

  const categoryLabels: { [key: string]: string } = {
    venue: "Venue",
    food: "Food & Drink", 
    travel: "Travel",
    accommodation: "Accommodation",
    space: "Event Space"
  };

  const handleSupplierChange = (id: string, field: keyof Supplier, value: string | Date | undefined) => {
    setSuppliers(prev => prev.map(supplier => 
      supplier.id === id ? { ...supplier, [field]: value } : supplier
    ));
  };

  const addSupplier = () => {
    const newSupplier: Supplier = {
      id: Date.now().toString(),
      name: "",
      email: "",
      category: "",
      dueDate: undefined
    };
    setSuppliers(prev => [...prev, newSupplier]);
  };

  const removeSupplier = (id: string) => {
    setSuppliers(prev => prev.filter(supplier => supplier.id !== id));
  };

  const handleBack = () => {
    navigate("/events/success", { state: { eventData } });
  };

  const handleSaveAndContinue = () => {
    const validSuppliers = suppliers.filter(s => s.name && s.email && s.category);
    console.log("Valid suppliers:", validSuppliers);
    
    // Navigate to data collection status overview
    navigate("/events/data-collection-status", { 
      state: { eventData, selectedCategories, suppliers: validSuppliers } 
    });
  };

  const handleSkip = () => {
    // Navigate to data collection status overview with empty suppliers
    navigate("/events/data-collection-status", { 
      state: { eventData, selectedCategories, suppliers: [] } 
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <EventsHeader 
          title="Event Management" 
          subtitle="Add supplier contributors to manage data collection" 
        />
        
        <main className="flex-1 overflow-auto p-8">
          <div className="bg-metric-card rounded-xl shadow-card border border-border overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-hero p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <h2 className="text-3xl font-bold">Add Supplier Contributors</h2>
                  <p className="text-lg opacity-90">Assign data collection responsibilities to your suppliers</p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8">
              {/* Description */}
              <div className="mb-8 p-6 bg-accent/10 border border-accent/20 rounded-lg">
                <p className="text-foreground leading-relaxed">
                  You can assign parts of your event's carbon data collection to suppliers. Once invited, they'll receive an email prompting them to submit the necessary details directly into the system. This allows you to easily track and manage their input alongside your event data.
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  Each supplier must be linked to at least one category, and you can assign multiple categories to the same supplier if needed. After adding suppliers, click Save and Continue to move forward with your event setup. If you don't have suppliers to add right now, select Skip to proceed.
                </p>
              </div>

              {/* Suppliers Form */}
              <div className="space-y-6">
                <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground pb-4 border-b border-border">
                  <span>Supplier name</span>
                  <span>Supplier email</span>
                  <span>Categories</span>
                  <span>Due Date</span>
                </div>

                <div className="space-y-4">
                  {suppliers.map((supplier) => (
                    <div key={supplier.id} className="grid grid-cols-4 gap-4 items-start">
                      <Input
                        placeholder="Enter name"
                        value={supplier.name}
                        onChange={(e) => handleSupplierChange(supplier.id, "name", e.target.value)}
                      />
                      
                      <Input
                        type="email"
                        placeholder="Enter email"
                        value={supplier.email}
                        onChange={(e) => handleSupplierChange(supplier.id, "email", e.target.value)}
                      />
                      
                      <Select 
                        value={supplier.category} 
                        onValueChange={(value) => handleSupplierChange(supplier.id, "category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedCategories.map((categoryId: string) => (
                            <SelectItem key={categoryId} value={categoryId}>
                              {categoryLabels[categoryId] || categoryId}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <div className="flex gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !supplier.dueDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {supplier.dueDate ? format(supplier.dueDate, "dd/MM/yyyy") : "DD/MM/YYYY"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={supplier.dueDate}
                              onSelect={(date) => handleSupplierChange(supplier.id, "dueDate", date)}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        {suppliers.length > 1 && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeSupplier(supplier.id)}
                            className="shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  onClick={addSupplier}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add supplier
                </Button>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-6 border-t border-border">
                  <Button 
                    variant="outline" 
                    onClick={handleBack}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Categories
                  </Button>
                  
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={handleSkip}
                      className="px-8"
                    >
                      Skip
                    </Button>
                    <Button 
                      onClick={handleSaveAndContinue}
                      className="px-8"
                    >
                      Save and Continue
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SupplierContributors;