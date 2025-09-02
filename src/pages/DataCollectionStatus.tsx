import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, Mail, User, Building, MapPin, Utensils, Car, Gift, Bed, HelpCircle, Hotel, Edit, CheckCircle } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { EventsHeader } from "@/components/events/EventsHeader";
import { EventProgressBar } from "@/components/events/EventProgressBar";
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
  status: 'completed' | 'awaiting-supplier' | 'pending';
  hasSuppliers?: boolean;
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

const allCategories: Category[] = [
  {
    id: "venue",
    name: "Venue Information",
    icon: Building,
    description: "Location and facility details",
    status: "completed"
  },
  {
    id: "food-drink",
    name: "Food & Drink",
    icon: Utensils,
    description: "Catering and beverage services",
    status: "awaiting-supplier",
    hasSuppliers: true
  },
  {
    id: "travel",
    name: "Travel",
    icon: Car,
    description: "Transportation including flights, trains, cars, and local transport",
    status: "awaiting-supplier",
    hasSuppliers: true
  },
  {
    id: "accommodation",
    name: "Accommodation",
    icon: Hotel,
    description: "Hotel stays, venue accommodations, and lodging arrangements",
    status: "pending"
  },
  {
    id: "promotion-items",
    name: "Promotion Items",
    icon: Gift,
    description: "Marketing materials and giveaways",
    status: "pending"
  }
];

export default function DataCollectionStatus() {
  const location = useLocation();
  const navigate = useNavigate();
  const eventData = location.state?.eventData;
  const selectedCategories = location.state?.selectedCategories || [];

  const handleEditSupplier = (supplierId: string) => {
    // Handle supplier editing
    console.log('Edit supplier:', supplierId);
  };

  const handleAddSupplier = () => {
    // Handle adding new supplier
    console.log('Add new supplier');
  };

  const handleEditCategory = (categoryId: string) => {
    // Navigate to specific category form
    const categoryRoutes = {
      'venue': '/events/venue-information',
      'food-drink': '/events/food-drink',
      'travel': '/events/travel',
      'accommodation': '/events/accommodations',
      'promotion-items': '/events/promotion-items',
      'questionnaire': '/events/questionnaire'
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
  };

  const handleSave = () => {
    // Handle saving data
    console.log('Save data collection status');
  };

  const handleContinue = () => {
    navigate('/questionnaire', { 
      state: { 
        eventData,
        selectedCategories
      } 
    });
  };

  const handleBackToSuppliers = () => {
    navigate('/events/suppliers', { 
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
        
        <EventProgressBar currentStep={5} completedSteps={[1, 2, 3, 4]} />
        
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
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleEditSupplier(supplier.id)}
                          variant="outline"
                          size="sm"
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end pt-4">
                    <Button 
                      onClick={handleAddSupplier}
                      className="bg-gradient-hero hover:opacity-90"
                    >
                      Add New Supplier
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* All Event Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Event Categories
                </CardTitle>
                <CardDescription>
                  Review and complete information for all event categories
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {allCategories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <category.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{category.name}</h3>
                          {category.status === 'completed' && (
                            <Badge className="bg-success/10 text-success border-success/20">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                          {category.status === 'awaiting-supplier' && (
                            <Badge variant="outline" className="border-warning/20 text-warning">
                              Awaiting Supplier Information
                            </Badge>
                          )}
                          {category.status === 'pending' && (
                            <Badge variant="outline">
                              Pending
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleEditCategory(category.id)}
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Questionnaire Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Questionnaire
                </CardTitle>
                <CardDescription>
                  Additional event details and requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Event Questionnaire</h3>
                      <p className="text-sm text-muted-foreground">Additional event details and requirements</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleEditCategory('questionnaire')}
                    variant="outline"
                  >
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-8">
              <Button 
                variant="outline" 
                onClick={handleBackToSuppliers}
                className="px-8"
              >
                Back to Suppliers
              </Button>
              <Button 
                variant="outline"
                onClick={handleSave}
                className="px-8"
              >
                Save
              </Button>
              <Button 
                onClick={handleContinue}
                className="bg-gradient-hero hover:opacity-90 px-8"
              >
                Generate Report
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}