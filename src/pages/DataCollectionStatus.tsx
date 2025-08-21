import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, Mail, User, Building, MapPin, Utensils, Car, Gift, Bed, HelpCircle } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { EventsHeader } from "@/components/events/EventsHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Supplier {
  id: string;
  name: string;
  email: string;
  category: string;
  dueDate: string;
}

interface Category {
  id: string;
  name: string;
  icon: any;
  description: string;
}

const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "James Smith",
    email: "james@email.com",
    category: "Food & Drink",
    dueDate: "24/08/2025"
  },
  {
    id: "2", 
    name: "John James",
    email: "john@travel.com",
    category: "Travel",
    dueDate: "08/09/2025"
  }
];

const categoriesRequiringInput: Category[] = [
  {
    id: "venue",
    name: "Venue",
    icon: Building,
    description: "No supplier assigned - requires direct data entry"
  },
  {
    id: "accommodations",
    name: "Accommodation", 
    icon: Bed,
    description: "No supplier assigned - requires direct data entry"
  },
  {
    id: "promotion-items",
    name: "Event Space",
    icon: Gift,
    description: "No supplier assigned - requires direct data entry"
  }
];

export default function DataCollectionStatus() {
  const location = useLocation();
  const navigate = useNavigate();
  const eventData = location.state?.eventData;
  const selectedCategories = location.state?.selectedCategories || [];

  const handleEnterInformation = (supplierId?: string, categoryId?: string) => {
    if (categoryId) {
      // Navigate to specific category form
      const categoryRoutes = {
        'venue': '/venue-information',
        'accommodations': '/accommodations', 
        'promotion-items': '/promotion-items'
      };
      
      const route = categoryRoutes[categoryId as keyof typeof categoryRoutes];
      if (route) {
        navigate(route, { 
          state: { 
            eventData,
            selectedCategories,
            fromDataCollection: true
          } 
        });
      }
    } else if (supplierId) {
      // Handle supplier-specific information entry
      console.log('Enter information for supplier:', supplierId);
    }
  };

  const handleCompleteSetup = () => {
    navigate('/questionnaire', { 
      state: { 
        eventData,
        selectedCategories
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
        
        <main className="flex-1 overflow-auto">
          {/* Hero Section */}
          <div className="bg-gradient-hero text-white px-8 py-12">
            <div className="max-w-4xl">
              <h1 className="text-4xl font-bold mb-4">Data Collection Status</h1>
              <p className="text-xl opacity-90">
                Track supplier contributions and enter remaining data
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-8 space-y-8">
            {/* Suppliers Awaiting Information */}
            {mockSuppliers.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Suppliers Awaiting Information
                  </CardTitle>
                  <CardDescription>
                    These suppliers need to provide their emission data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockSuppliers.map((supplier) => (
                    <div key={supplier.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground">{supplier.name}</h3>
                          <Badge variant="outline">{supplier.category}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {supplier.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Due: {supplier.dueDate}
                          </div>
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleEnterInformation(supplier.id)}
                        className="bg-gradient-hero hover:opacity-90"
                      >
                        Enter Information
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Categories Requiring Direct Input */}
            {categoriesRequiringInput.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    Categories Requiring Direct Input
                  </CardTitle>
                  <CardDescription>
                    These categories don't have suppliers assigned and need direct data entry
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categoriesRequiringInput.map((category) => (
                    <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <category.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{category.name}</h3>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleEnterInformation(undefined, category.id)}
                        className="bg-gradient-hero hover:opacity-90"
                      >
                        Enter Information
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-8">
              <Button 
                variant="outline" 
                onClick={() => navigate('/events/suppliers', { state: { eventData, selectedCategories } })}
                className="px-8"
              >
                Back to Suppliers
              </Button>
              <Button 
                onClick={handleCompleteSetup}
                className="bg-gradient-hero hover:opacity-90 px-8"
              >
                Complete Setup
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}