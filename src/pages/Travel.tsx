import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Car, Plane, Train, Bus, Plus, Trash2, Info, ChevronDown, Upload, Hotel } from "lucide-react";
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

interface AccommodationData {
  id: string;
  city: string;
  type: string;
  nights: number;
  guests: number;
}

export default function Travel() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [routes, setRoutes] = useState<TravelRoute[]>([
    { id: "1", transportType: "flight", from: "Berlin Brandenburg", to: "Manchester", distance: 1034, passengers: 30, class: "Economy" },
    { id: "2", transportType: "flight", from: "London, UK", to: "Manchester", distance: 163, passengers: 20, class: "Economy" },
    { id: "3", transportType: "car", from: "Edinburgh, UK", to: "Manchester", distance: 559, passengers: 15, class: "" },
  ]);

  const [averageTravel, setAverageTravel] = useState({
    flight: { economy: 0, premium: 0, business: 0, first: 0 },
    rail: { trips: 0 },
    car: { cars: 0 },
    taxi: { trips: 0 }
  });

  const [accommodations, setAccommodations] = useState<AccommodationData[]>([
    { id: "1", type: "Hotel 4 Star", city: "Manchester", nights: 2, guests: 65 }
  ]);

  const [estimateBasedOnAttendees, setEstimateBasedOnAttendees] = useState(false);
  const [flightSectionOpen, setFlightSectionOpen] = useState(true);
  const [railSectionOpen, setRailSectionOpen] = useState(false);
  const [carSectionOpen, setCarSectionOpen] = useState(false);
  const [taxiSectionOpen, setTaxiSectionOpen] = useState(false);
  const [accommodationSectionOpen, setAccommodationSectionOpen] = useState(false);

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

  const addAccommodation = () => {
    const newAccommodation: AccommodationData = {
      id: Date.now().toString(),
      city: "",
      type: "Hotel 3 Star",
      nights: 1,
      guests: 0
    };
    setAccommodations([...accommodations, newAccommodation]);
  };

  const updateAccommodation = (id: string, field: keyof AccommodationData, value: string | number) => {
    setAccommodations(accommodations.map(acc => 
      acc.id === id ? { ...acc, [field]: value } : acc
    ));
  };

  const deleteAccommodation = (id: string) => {
    setAccommodations(accommodations.filter(acc => acc.id !== id));
  };

  const updateRoute = (id: string, field: keyof TravelRoute, value: string | number) => {
    setRoutes(routes.map(route => 
      route.id === id ? { ...route, [field]: value } : route
    ));
  };

  const deleteRoute = (id: string) => {
    setRoutes(routes.filter(route => route.id !== id));
  };

  const handleImportData = () => {
    // Placeholder for import functionality
    console.log("Import travel data functionality");
  };

  const handleAttendeeBasedEstimate = (checked: boolean) => {
    setEstimateBasedOnAttendees(checked);
    if (checked) {
      // Pre-fill with estimated values based on 100 attendees
      setAverageTravel({
        flight: { economy: 50, premium: 20, business: 10, first: 5 },
        rail: { trips: 10 },
        car: { cars: 8 },
        taxi: { trips: 15 }
      });
    } else {
      setAverageTravel({
        flight: { economy: 0, premium: 0, business: 0, first: 0 },
        rail: { trips: 0 },
        car: { cars: 0 },
        taxi: { trips: 0 }
      });
    }
  };

  const getTransportIcon = (type: string) => {
    switch(type) {
      case "flight": return <Plane className="h-4 w-4" />;
      case "train": return <Train className="h-4 w-4" />;
      case "bus": return <Bus className="h-4 w-4" />;
      case "car": return <Car className="h-4 w-4" />;
      case "taxi": return <Car className="h-4 w-4" />;
      default: return <Car className="h-4 w-4" />;
    }
  };

  const calculateCO2 = (distance: number, passengers: number, type: string) => {
    // Simplified CO2 calculation (kg CO2 per passenger per km)
    const factors = {
      flight: 0.255,
      car: 0.171,
      taxi: 0.171,
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
                <Plane className="w-10 h-10" />
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

              <Tabs defaultValue="average" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="average">Average Travel</TabsTrigger>
                  <TabsTrigger value="accurate">Accurate Travel</TabsTrigger>
                </TabsList>
                
                <TabsContent value="average" className="space-y-6">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-3">
                        Average Travel Estimate
                      </CardTitle>
                      <div className="flex items-center space-x-2 pt-4">
                        <Checkbox 
                          id="attendee-estimate" 
                          checked={estimateBasedOnAttendees}
                          onCheckedChange={handleAttendeeBasedEstimate}
                        />
                        <Label htmlFor="attendee-estimate" className="text-sm font-medium">
                          Estimate based on attendee numbers (100 attendees)
                        </Label>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <TooltipProvider>
                        {/* Flight Section */}
                        <Collapsible open={flightSectionOpen} onOpenChange={setFlightSectionOpen}>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                              <div className="flex items-center gap-3">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                  <Plane className="h-5 w-5" />
                                  Flight Travel
                                </h3>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">Based on average UK domestic and international flight distances. Estimates include return journeys with standard CO2 factors per class.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${flightSectionOpen ? 'transform rotate-180' : ''}`} />
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="space-y-4 pt-4">
                            <div className="overflow-x-auto">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Route Type</TableHead>
                                    <TableHead className="text-center">Economy</TableHead>
                                    <TableHead className="text-center">Premium</TableHead>
                                    <TableHead className="text-center">Business</TableHead>
                                    <TableHead className="text-center">First</TableHead>
                                    <TableHead className="text-center">Total</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Return Domestic (UK)</TableCell>
                                    <TableCell>
                                      <Input 
                                        type="number" 
                                        placeholder="0" 
                                        className="text-center"
                                        value={averageTravel.flight.economy}
                                        onChange={(e) => setAverageTravel(prev => ({
                                          ...prev,
                                          flight: { ...prev.flight, economy: Number(e.target.value) }
                                        }))}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Input 
                                        type="number" 
                                        placeholder="0" 
                                        className="text-center"
                                        value={averageTravel.flight.premium}
                                        onChange={(e) => setAverageTravel(prev => ({
                                          ...prev,
                                          flight: { ...prev.flight, premium: Number(e.target.value) }
                                        }))}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Input 
                                        type="number" 
                                        placeholder="0" 
                                        className="text-center"
                                        value={averageTravel.flight.business}
                                        onChange={(e) => setAverageTravel(prev => ({
                                          ...prev,
                                          flight: { ...prev.flight, business: Number(e.target.value) }
                                        }))}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Input 
                                        type="number" 
                                        placeholder="0" 
                                        className="text-center"
                                        value={averageTravel.flight.first}
                                        onChange={(e) => setAverageTravel(prev => ({
                                          ...prev,
                                          flight: { ...prev.flight, first: Number(e.target.value) }
                                        }))}
                                      />
                                    </TableCell>
                                    <TableCell className="text-center font-medium">
                                      {averageTravel.flight.economy + averageTravel.flight.premium + averageTravel.flight.business + averageTravel.flight.first}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>

                        {/* Rail/Bus Section */}
                        <Collapsible open={railSectionOpen} onOpenChange={setRailSectionOpen}>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                              <div className="flex items-center gap-3">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                  <Train className="h-5 w-5" />
                                  Rail & Bus Travel
                                </h3>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">Estimates for train and bus journeys based on average UK intercity routes with lower CO2 emissions per passenger.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${railSectionOpen ? 'transform rotate-180' : ''}`} />
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="space-y-4 pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Number of Return Trips</Label>
                                <Input 
                                  type="number" 
                                  placeholder="0"
                                  value={averageTravel.rail.trips}
                                  onChange={(e) => setAverageTravel(prev => ({
                                    ...prev,
                                    rail: { trips: Number(e.target.value) }
                                  }))}
                                />
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>

                        {/* Car Section */}
                        <Collapsible open={carSectionOpen} onOpenChange={setCarSectionOpen}>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                              <div className="flex items-center gap-3">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                  <Car className="h-5 w-5" />
                                  Car Travel
                                </h3>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">Private car journeys calculated using average fuel efficiency and occupancy rates for event travel.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${carSectionOpen ? 'transform rotate-180' : ''}`} />
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="space-y-4 pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Number of Cars</Label>
                                <Input 
                                  type="number" 
                                  placeholder="0"
                                  value={averageTravel.car.cars}
                                  onChange={(e) => setAverageTravel(prev => ({
                                    ...prev,
                                    car: { cars: Number(e.target.value) }
                                  }))}
                                />
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>

                        {/* Taxi Section */}
                        <Collapsible open={taxiSectionOpen} onOpenChange={setTaxiSectionOpen}>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                              <div className="flex items-center gap-3">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                  <Car className="h-5 w-5" />
                                  Taxi & Ride-share Travel
                                </h3>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">Taxi and ride-share services including airport transfers and local transport during the event.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${taxiSectionOpen ? 'transform rotate-180' : ''}`} />
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="space-y-4 pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Number of Trips</Label>
                                <Input 
                                  type="number" 
                                  placeholder="0"
                                  value={averageTravel.taxi.trips}
                                  onChange={(e) => setAverageTravel(prev => ({
                                    ...prev,
                                    taxi: { trips: Number(e.target.value) }
                                  }))}
                                />
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </TooltipProvider>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="accurate" className="space-y-6">
                  <div className="flex gap-4 mb-6">
                    <Button onClick={handleImportData} variant="outline" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Import Travel Data
                    </Button>
                  </div>

                  {/* Travel Routes Card */}
                  <Card className="border-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Plane className="h-5 w-5" />
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
                              <TableHead className="w-[100px]">PAX</TableHead>
                              <TableHead className="w-[120px]">Class</TableHead>
                              <TableHead className="w-[100px]">CO₂e (kg)</TableHead>
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
                                      <SelectItem value="car">
                                        <div className="flex items-center gap-2">
                                          <Car className="h-4 w-4" />
                                          Car
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="train">
                                        <div className="flex items-center gap-2">
                                          <Train className="h-4 w-4" />
                                          Rail
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="taxi">
                                        <div className="flex items-center gap-2">
                                          <Car className="h-4 w-4" />
                                          Taxi
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
                                    placeholder="Auto-calc"
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
                                    <div className="text-muted-foreground text-center">-</div>
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
                    </CardContent>
                  </Card>

                  {/* Accommodations Card */}
                  <TooltipProvider>
                    <Collapsible open={accommodationSectionOpen} onOpenChange={setAccommodationSectionOpen}>
                      <Card className="border-2">
                        <CardHeader>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                              <div className="flex items-center gap-3">
                                <CardTitle className="text-xl flex items-center gap-2">
                                  <Hotel className="h-5 w-5" />
                                  Accommodation Data
                                </CardTitle>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">Track accommodation details including hotel types, locations, duration and occupancy for accurate carbon footprint calculations.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button onClick={addAccommodation} size="sm" className="flex items-center gap-1">
                                  <Plus className="h-3 w-3" />
                                  Add
                                </Button>
                                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${accommodationSectionOpen ? 'transform rotate-180' : ''}`} />
                              </div>
                            </Button>
                          </CollapsibleTrigger>
                        </CardHeader>
                        <CollapsibleContent>
                          <CardContent>
                            <div className="overflow-x-auto">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>City Name</TableHead>
                                    <TableHead>Accommodation Type</TableHead>
                                    <TableHead className="w-[100px]">Nights</TableHead>
                                    <TableHead className="w-[100px]">Guests</TableHead>
                                    <TableHead className="w-[60px]">Actions</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {accommodations.map((acc) => (
                                    <TableRow key={acc.id}>
                                      <TableCell>
                                        <Input
                                          value={acc.city}
                                          onChange={(e) => updateAccommodation(acc.id, 'city', e.target.value)}
                                          placeholder="City name"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Select 
                                          value={acc.type} 
                                          onValueChange={(value) => updateAccommodation(acc.id, 'type', value)}
                                        >
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="Hotel 3 Star">Hotel 3 Star</SelectItem>
                                            <SelectItem value="Hotel 4 Star">Hotel 4 Star</SelectItem>
                                            <SelectItem value="Hotel 5 Star">Hotel 5 Star</SelectItem>
                                            <SelectItem value="Boutique Hotel">Boutique Hotel</SelectItem>
                                            <SelectItem value="Budget Hotel">Budget Hotel</SelectItem>
                                            <SelectItem value="Hostel">Hostel</SelectItem>
                                            <SelectItem value="Apartment">Apartment</SelectItem>
                                            <SelectItem value="Guesthouse">Guesthouse</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </TableCell>
                                      <TableCell>
                                        <Input
                                          type="number"
                                          value={acc.nights}
                                          onChange={(e) => updateAccommodation(acc.id, 'nights', Number(e.target.value))}
                                          className="w-full"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Input
                                          type="number"
                                          value={acc.guests}
                                          onChange={(e) => updateAccommodation(acc.id, 'guests', Number(e.target.value))}
                                          className="w-full"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => deleteAccommodation(acc.id)}
                                          className="text-destructive hover:text-destructive"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                  {accommodations.length === 0 && (
                                    <TableRow>
                                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                                        No accommodation data added yet. Click "Add" to get started.
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </TableBody>
                              </Table>
                            </div>
                          </CardContent>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  </TooltipProvider>
                </TabsContent>
              </Tabs>

              {/* Sticky Summary Bar */}
              <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t p-4 -m-8 mt-8">
                <div className="max-w-6xl mx-auto">
                  <div className="flex items-center justify-between">
                    <div className="grid grid-cols-4 gap-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {routes.reduce((sum, route) => sum + route.passengers, 0)}
                        </div>
                        <div className="text-sm text-muted-foreground">Total PAX</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {routes.reduce((sum, route) => sum + route.distance, 0).toLocaleString()} km
                        </div>
                        <div className="text-sm text-muted-foreground">Distance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {accommodations.reduce((sum, acc) => sum + acc.nights, 0)} nights
                        </div>
                        <div className="text-sm text-muted-foreground">Accommodation</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-destructive">
                          {routes.reduce((sum, route) => sum + Number(calculateCO2(route.distance, route.passengers, route.transportType)), 0).toFixed(1)} kg
                        </div>
                        <div className="text-sm text-muted-foreground">Total CO₂e</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        onClick={() => navigate(-1)}
                        variant="outline"
                        size="lg"
                        className="text-lg px-8"
                      >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        size="lg"
                        className="text-lg px-8 font-semibold"
                      >
                        Save & Continue
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}