import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, Car, Plane, Train, Bus, Plus, Trash2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";

interface TravelRoute {
  id: string;
  transportType: string;
  from: string;
  to: string;
  distance: number;
  passengers: number;
  class?: string;
}

export default function Travel() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [routes, setRoutes] = useState<TravelRoute[]>([
    { id: "1", transportType: "flight", from: "Berlin Brandenburg", to: "Manchester", distance: 1034, passengers: 30, class: "Economy" },
    { id: "2", transportType: "flight", from: "London, UK", to: "Manchester", distance: 163, passengers: 20, class: "Economy" },
    { id: "3", transportType: "car", from: "Edinburgh, UK", to: "Manchester", distance: 559, passengers: 15, class: "" },
  ]);

  const [accommodations, setAccommodations] = useState([
    { id: "1", type: "Hotel 4 Star", city: "Manchester", nights: 2, passengers: 65 }
  ]);

  const addRoute = () => {
    const newRoute: TravelRoute = {
      id: Date.now().toString(),
      transportType: "flight",
      from: "",
      to: "",
      distance: 0,
      passengers: 0,
      class: "Economy"
    };
    setRoutes([...routes, newRoute]);
  };

  const updateRoute = (id: string, field: keyof TravelRoute, value: string | number) => {
    setRoutes(routes.map(route => 
      route.id === id ? { ...route, [field]: value } : route
    ));
  };

  const deleteRoute = (id: string) => {
    setRoutes(routes.filter(route => route.id !== id));
  };

  const getTransportIcon = (type: string) => {
    switch(type) {
      case "flight": return <Plane className="h-4 w-4" />;
      case "train": return <Train className="h-4 w-4" />;
      case "bus": return <Bus className="h-4 w-4" />;
      case "car": return <Car className="h-4 w-4" />;
      default: return <Car className="h-4 w-4" />;
    }
  };

  const calculateCO2 = (distance: number, passengers: number, type: string) => {
    // Simplified CO2 calculation (kg CO2 per passenger per km)
    const factors = {
      flight: 0.255,
      car: 0.171,
      train: 0.041,
      bus: 0.089
    };
    const factor = factors[type as keyof typeof factors] || 0.171;
    return (distance * passengers * factor).toFixed(1);
  };

  const handleSubmit = () => {
    console.log("Travel data:", { routes, accommodations });
    
    const categoryOrder = ["venue", "food", "travel", "accommodations", "promotion"];
    const { selectedCategories = [] } = location.state || {};
    const currentIndex = categoryOrder.indexOf("travel");
    
    for (let i = currentIndex + 1; i < categoryOrder.length; i++) {
      if (selectedCategories.includes(categoryOrder[i])) {
        const nextCategory = categoryOrder[i];
        if (nextCategory === "accommodations") navigate("/events/accommodations");
        else if (nextCategory === "promotion") navigate("/events/promotion-items");
        return;
      }
    }
    
    navigate("/events/questionnaire");
  };

  return (
    <div className="min-h-screen bg-dashboard">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 p-8 text-primary-foreground">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Car className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Travel Information</h1>
                <p className="text-lg text-primary-foreground/90">
                  Enter detailed travel routes and accommodation data
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Event Info Card */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Software Expo - HMRC</CardTitle>
                  <p className="text-lg text-muted-foreground">Manchester, UK • 100 Attendees • Virtual Attendees: 50</p>
                </CardHeader>
              </Card>

              <Tabs defaultValue="travel" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="travel">Travel Routes</TabsTrigger>
                  <TabsTrigger value="accommodation">Accommodation</TabsTrigger>
                </TabsList>
                
                <TabsContent value="travel" className="space-y-6">
                  <Card className="border-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl flex items-center gap-3">
                          <Plane className="w-8 h-8" />
                          Travel Routes
                        </CardTitle>
                        <Button onClick={addRoute} className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Add Route
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[120px]">Transport</TableHead>
                              <TableHead>From</TableHead>
                              <TableHead>To</TableHead>
                              <TableHead className="w-[120px]">Distance (KM)</TableHead>
                              <TableHead className="w-[100px]">Passengers</TableHead>
                              <TableHead className="w-[120px]">Class</TableHead>
                              <TableHead className="w-[100px]">CO2 (kg)</TableHead>
                              <TableHead className="w-[60px]">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {routes.map((route) => (
                              <TableRow key={route.id}>
                                <TableCell>
                                  <Select 
                                    value={route.transportType} 
                                    onValueChange={(value) => updateRoute(route.id, 'transportType', value)}
                                  >
                                    <SelectTrigger className="w-full">
                                      <div className="flex items-center gap-2">
                                        {getTransportIcon(route.transportType)}
                                        <SelectValue />
                                      </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="flight">
                                        <div className="flex items-center gap-2">
                                          <Plane className="h-4 w-4" />
                                          Flight
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="train">
                                        <div className="flex items-center gap-2">
                                          <Train className="h-4 w-4" />
                                          Train
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="bus">
                                        <div className="flex items-center gap-2">
                                          <Bus className="h-4 w-4" />
                                          Bus/Coach
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="car">
                                        <div className="flex items-center gap-2">
                                          <Car className="h-4 w-4" />
                                          Car/Taxi
                                        </div>
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={route.from}
                                    onChange={(e) => updateRoute(route.id, 'from', e.target.value)}
                                    placeholder="Origin city"
                                    className="min-w-[120px]"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={route.to}
                                    onChange={(e) => updateRoute(route.id, 'to', e.target.value)}
                                    placeholder="Destination city"
                                    className="min-w-[120px]"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    value={route.distance}
                                    onChange={(e) => updateRoute(route.id, 'distance', Number(e.target.value))}
                                    className="w-full"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    value={route.passengers}
                                    onChange={(e) => updateRoute(route.id, 'passengers', Number(e.target.value))}
                                    className="w-full"
                                  />
                                </TableCell>
                                <TableCell>
                                  {route.transportType === 'flight' ? (
                                    <Select 
                                      value={route.class || "Economy"} 
                                      onValueChange={(value) => updateRoute(route.id, 'class', value)}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Economy">Economy</SelectItem>
                                        <SelectItem value="Premium">Premium</SelectItem>
                                        <SelectItem value="Business">Business</SelectItem>
                                        <SelectItem value="First">First</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  ) : (
                                    <div className="text-muted-foreground">-</div>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <div className="text-right font-mono">
                                    {calculateCO2(route.distance, route.passengers, route.transportType)}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => deleteRoute(route.id)}
                                    className="text-destructive hover:text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                            {routes.length === 0 && (
                              <TableRow>
                                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                                  No travel routes added yet. Click "Add Route" to get started.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                      
                      {/* Summary */}
                      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-primary">
                              {routes.reduce((sum, route) => sum + route.passengers, 0)}
                            </div>
                            <div className="text-sm text-muted-foreground">Total Passengers</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-primary">
                              {routes.reduce((sum, route) => sum + route.distance, 0).toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">Total Distance (km)</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-primary">
                              {routes.reduce((sum, route) => sum + Number(calculateCO2(route.distance, route.passengers, route.transportType)), 0).toFixed(1)}
                            </div>
                            <div className="text-sm text-muted-foreground">Total CO2 (kg)</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="accommodation" className="space-y-6">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-3">
                        <Bus className="w-8 h-8" />
                        Accommodation Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Accommodation Type</TableHead>
                            <TableHead>City Name</TableHead>
                            <TableHead className="w-[100px]">Nights</TableHead>
                            <TableHead className="w-[100px]">Passengers</TableHead>
                            <TableHead className="w-[120px]">CO2 Impact</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {accommodations.map((acc) => (
                            <TableRow key={acc.id}>
                              <TableCell>
                                <Select defaultValue="hotel4star">
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="hotel4star">Hotel 4 Star</SelectItem>
                                    <SelectItem value="hotel5star">Hotel 5 Star</SelectItem>
                                    <SelectItem value="apartment">Apartment</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input defaultValue={acc.city} placeholder="City name" />
                              </TableCell>
                              <TableCell>
                                <Input type="number" defaultValue={acc.nights} />
                              </TableCell>
                              <TableCell>
                                <Input type="number" defaultValue={acc.passengers} />
                              </TableCell>
                              <TableCell>
                                <div className="text-right font-mono">
                                  {(acc.nights * acc.passengers * 12.5).toFixed(1)} kg
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Navigation */}
              <div className="flex justify-between">
                <Button
                  onClick={() => navigate(-1)}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 h-auto"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  BACK
                </Button>
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="text-lg px-8 py-4 h-auto font-semibold"
                >
                  CONTINUE
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}