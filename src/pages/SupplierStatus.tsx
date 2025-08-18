import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, User, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { EventsHeader } from "@/components/events/EventsHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Supplier {
  id: string;
  name: string;
  email: string;
  category: string;
  dueDate: Date | undefined;
}

const SupplierStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventData, selectedCategories = [], suppliers = [] } = location.state || {};

  const categoryLabels: { [key: string]: string } = {
    venue: "Venue",
    food: "Food & Drink", 
    travel: "Travel",
    accommodation: "Accommodation",
    space: "Event Space"
  };

  // Get categories that haven't been assigned to suppliers
  const assignedCategories = suppliers.map((s: Supplier) => s.category);
  const remainingCategories = selectedCategories.filter((cat: string) => !assignedCategories.includes(cat));

  const handleEnterInformation = (categoryId?: string) => {
    // Navigate to venue information form
    navigate("/events/venue-information", {
      state: {
        eventData,
        categoryType: categoryId,
        venueData: eventData
      }
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <EventsHeader 
          title="Event Management" 
          subtitle="Track data collection progress and enter remaining information" 
        />
        
        <main className="flex-1 overflow-auto p-8">
          <div className="bg-metric-card rounded-xl shadow-card border border-border overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-hero p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <h2 className="text-3xl font-bold">Data Collection Status</h2>
                  <p className="text-lg opacity-90">Track supplier contributions and enter remaining data</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Suppliers Awaiting Information */}
              {suppliers.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Suppliers Awaiting Information
                  </h3>
                  <div className="grid gap-4">
                    {suppliers.map((supplier: Supplier) => (
                      <Card key={supplier.id} className="border-border">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-2">
                                <h4 className="font-medium text-foreground">{supplier.name}</h4>
                                <Badge variant="secondary">
                                  {categoryLabels[supplier.category] || supplier.category}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{supplier.email}</p>
                              {supplier.dueDate && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="w-4 h-4" />
                                  Due: {format(supplier.dueDate, "dd/MM/yyyy")}
                                </div>
                              )}
                            </div>
                            <Button 
                              variant="outline"
                              onClick={() => handleEnterInformation(supplier.category)}
                            >
                              Enter Information
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Remaining Categories */}
              {remainingCategories.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Categories Requiring Direct Input
                  </h3>
                  <div className="grid gap-4">
                    {remainingCategories.map((categoryId: string) => (
                      <Card key={categoryId} className="border-border">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground mb-2">
                                {categoryLabels[categoryId] || categoryId}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                No supplier assigned - requires direct data entry
                              </p>
                            </div>
                            <Button 
                              onClick={() => handleEnterInformation(categoryId)}
                            >
                              Enter Information
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {suppliers.length === 0 && remainingCategories.length === 0 && (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No Data Collection Required</h3>
                  <p className="text-muted-foreground">
                    All categories have been processed or no categories were selected.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-border">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/events/suppliers", { state: { eventData, selectedCategories, suppliers } })}
                >
                  Back to Suppliers
                </Button>
                
                <Button 
                  onClick={() => navigate("/events")}
                  className="px-8"
                >
                  Complete Setup
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SupplierStatus;