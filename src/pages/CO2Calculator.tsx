import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Plane, Car, Bus, Train, Bike, Ship, Home, Building, Tent, 
  Plus, Trash2, TreePine, MapPin, Calendar, Users, ArrowRight,
  Sailboat, Mountain
} from "lucide-react";
import { TopNavBar } from "@/components/calculator/TopNavBar";
import { CalculatorMap } from "@/components/calculator/CalculatorMap";
import { TooltipProvider } from "@/components/ui/tooltip";

// Item type definitions
type ItemCategory = "trip" | "accommodation" | "adventure";

interface TripItem {
  id: string;
  category: "trip";
  transportType: string;
  date: string;
  from: string;
  to: string;
  distance: number;
  manualDistance: boolean;
  travellers: number;
  returnTrip: boolean;
  flightClass?: string;
  co2: number;
}

interface AccommodationItem {
  id: string;
  category: "accommodation";
  accommodationType: string;
  date: string;
  location: string;
  nights: number;
  guests: number;
  co2: number;
}

interface AdventureItem {
  id: string;
  category: "adventure";
  adventureType: string;
  date: string;
  location: string;
  distance: number;
  duration: number;
  participants: number;
  co2: number;
}

type CalculatorItem = TripItem | AccommodationItem | AdventureItem;

// Transport types with icons and CO2 factors (kg CO2 per km per person)
const transportTypes = [
  { value: "flight", label: "Flight", icon: Plane, co2Factor: 0.255 },
  { value: "car", label: "Car", icon: Car, co2Factor: 0.17 },
  { value: "electric_car", label: "Electric Car", icon: Car, co2Factor: 0.05 },
  { value: "hybrid_car", label: "Hybrid Car", icon: Car, co2Factor: 0.10 },
  { value: "bus", label: "Bus / Coach", icon: Bus, co2Factor: 0.089 },
  { value: "train", label: "Train", icon: Train, co2Factor: 0.041 },
  { value: "ferry", label: "Ferry", icon: Ship, co2Factor: 0.19 },
  { value: "motorbike", label: "Motorbike", icon: Bike, co2Factor: 0.11 },
  { value: "scooter", label: "Scooter", icon: Bike, co2Factor: 0.07 },
  { value: "taxi", label: "Taxi", icon: Car, co2Factor: 0.21 },
];

const accommodationTypes = [
  { value: "hotel", label: "Hotel", icon: Building, co2Factor: 14.4 }, // kg CO2 per night per guest
  { value: "rental", label: "Rental / Airbnb", icon: Home, co2Factor: 8.5 },
  { value: "serviced_apartment", label: "Serviced Apartment", icon: Building, co2Factor: 10.2 },
  { value: "cruise", label: "Cruise", icon: Ship, co2Factor: 250 },
  { value: "river_cruise", label: "River Cruise", icon: Ship, co2Factor: 150 },
];

const adventureTypes = [
  { value: "4x4", label: "4x4 Vehicle Transport", icon: Car, co2Factor: 0.35 },
  { value: "boat", label: "Boat Transport", icon: Sailboat, co2Factor: 0.15 },
  { value: "helicopter", label: "Helicopter Transport", icon: Plane, co2Factor: 3.5 },
  { value: "hot_air_balloon", label: "Hot Air Balloon", icon: Mountain, co2Factor: 0.5 },
  { value: "lodge", label: "Lodge Accommodation", icon: Tent, co2Factor: 12 },
  { value: "mobile_camp", label: "Mobile Camp", icon: Tent, co2Factor: 8 },
  { value: "private_plane", label: "Private Plane Charter", icon: Plane, co2Factor: 1.2 },
  { value: "quad", label: "Quad Transport", icon: Bike, co2Factor: 0.25 },
  { value: "adventure_scooter", label: "Scooters", icon: Bike, co2Factor: 0.08 },
];

const flightClasses = [
  { value: "economy", label: "Economy", multiplier: 1 },
  { value: "premium_economy", label: "Premium Economy", multiplier: 1.5 },
  { value: "business", label: "Business", multiplier: 2.5 },
  { value: "first", label: "First Class", multiplier: 4 },
];

// CO2 per tree absorption (kg CO2 per year per tree)
const CO2_PER_TREE = 150;

// Default states for each category
const defaultTripItem = {
  category: "trip" as const,
  transportType: "",
  date: new Date().toISOString().split("T")[0],
  from: "",
  to: "",
  distance: 0,
  manualDistance: false,
  travellers: 1,
  returnTrip: false,
  flightClass: "economy",
};

const defaultAccommodationItem = {
  category: "accommodation" as const,
  accommodationType: "",
  date: new Date().toISOString().split("T")[0],
  location: "",
  nights: 1,
  guests: 1,
};

const defaultAdventureItem = {
  category: "adventure" as const,
  adventureType: "",
  date: new Date().toISOString().split("T")[0],
  location: "",
  distance: 0,
  duration: 1,
  participants: 1,
};

export default function CO2Calculator() {
  const [items, setItems] = useState<CalculatorItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory>("trip");

  // Separate state for each category
  const [tripData, setTripData] = useState(defaultTripItem);
  const [accommodationData, setAccommodationData] = useState(defaultAccommodationItem);
  const [adventureData, setAdventureData] = useState(defaultAdventureItem);

  const calculateTripCO2 = (item: typeof tripData): number => {
    const transport = transportTypes.find(t => t.value === item.transportType);
    if (!transport || !item.distance || !item.travellers) return 0;
    
    let co2 = item.distance * transport.co2Factor * item.travellers;
    
    // Apply flight class multiplier
    if (item.transportType === "flight" && item.flightClass) {
      const flightClass = flightClasses.find(c => c.value === item.flightClass);
      if (flightClass) co2 *= flightClass.multiplier;
    }
    
    // Double for return trip
    if (item.returnTrip) co2 *= 2;
    
    return Math.round(co2 * 10) / 10;
  };

  const calculateAccommodationCO2 = (item: typeof accommodationData): number => {
    const accommodation = accommodationTypes.find(a => a.value === item.accommodationType);
    if (!accommodation || !item.nights || !item.guests) return 0;
    
    return Math.round(item.nights * item.guests * accommodation.co2Factor * 10) / 10;
  };

  const calculateAdventureCO2 = (item: typeof adventureData): number => {
    const adventure = adventureTypes.find(a => a.value === item.adventureType);
    if (!adventure || !item.participants) return 0;
    
    // For transport types, use distance; for accommodation types, use duration
    if (["lodge", "mobile_camp"].includes(item.adventureType || "")) {
      return Math.round((item.duration || 0) * item.participants * adventure.co2Factor * 10) / 10;
    }
    
    return Math.round((item.distance || 0) * item.participants * adventure.co2Factor * 10) / 10;
  };

  const calculateCurrentCO2 = (): number => {
    if (selectedCategory === "trip") {
      return calculateTripCO2(tripData);
    } else if (selectedCategory === "accommodation") {
      return calculateAccommodationCO2(accommodationData);
    } else {
      return calculateAdventureCO2(adventureData);
    }
  };

  const treesNeeded = (co2: number): number => {
    return Math.ceil(co2 / CO2_PER_TREE);
  };

  const totalCO2 = items.reduce((sum, item) => sum + item.co2, 0);
  const totalTrees = treesNeeded(totalCO2 + calculateCurrentCO2());
  const totalDistance = items
    .filter((item): item is TripItem | AdventureItem => item.category === "trip" || item.category === "adventure")
    .reduce((sum, item) => sum + (item.distance || 0), 0);

  const confirmItem = () => {
    const co2 = calculateCurrentCO2();
    if (co2 === 0) return;

    let newItem: CalculatorItem;
    
    if (selectedCategory === "trip") {
      newItem = {
        ...tripData,
        id: Date.now().toString(),
        co2,
      } as TripItem;
    } else if (selectedCategory === "accommodation") {
      newItem = {
        ...accommodationData,
        id: Date.now().toString(),
        co2,
      } as AccommodationItem;
    } else {
      newItem = {
        ...adventureData,
        id: Date.now().toString(),
        co2,
      } as AdventureItem;
    }

    setItems([...items, newItem]);
    resetCurrentItem();
  };

  const resetCurrentItem = () => {
    if (selectedCategory === "trip") {
      setTripData({ ...defaultTripItem, date: new Date().toISOString().split("T")[0] });
    } else if (selectedCategory === "accommodation") {
      setAccommodationData({ ...defaultAccommodationItem, date: new Date().toISOString().split("T")[0] });
    } else {
      setAdventureData({ ...defaultAdventureItem, date: new Date().toISOString().split("T")[0] });
    }
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleCategoryChange = (category: ItemCategory) => {
    setSelectedCategory(category);
  };

  const getItemIcon = (item: CalculatorItem) => {
    if (item.category === "trip") {
      const transport = transportTypes.find(t => t.value === item.transportType);
      return transport ? transport.icon : MapPin;
    } else if (item.category === "accommodation") {
      const accommodation = accommodationTypes.find(a => a.value === item.accommodationType);
      return accommodation ? accommodation.icon : Building;
    } else {
      const adventure = adventureTypes.find(a => a.value === item.adventureType);
      return adventure ? adventure.icon : Tent;
    }
  };

  const getItemLabel = (item: CalculatorItem): string => {
    if (item.category === "trip") {
      const transport = transportTypes.find(t => t.value === item.transportType);
      return transport?.label || "Trip";
    } else if (item.category === "accommodation") {
      const accommodation = accommodationTypes.find(a => a.value === item.accommodationType);
      return accommodation?.label || "Accommodation";
    } else {
      const adventure = adventureTypes.find(a => a.value === item.adventureType);
      return adventure?.label || "Adventure";
    }
  };

  const getItemDescription = (item: CalculatorItem): string => {
    if (item.category === "trip") {
      return `${item.from} → ${item.to}`;
    } else if (item.category === "accommodation") {
      return `${item.nights} night${item.nights > 1 ? "s" : ""} in ${item.location}`;
    } else {
      return item.location;
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <TopNavBar />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">CO₂ Calculator</h1>
            <p className="text-primary-foreground/80">
              Calculate your carbon footprint and see how many trees you need to offset your emissions
            </p>
          </div>
        </div>

        {/* Main Content - Three Column Layout */}
        <main className="flex-1 py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {/* Column 1 - Item Type Form */}
              <Card className="flex flex-col">
                <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Plus className="h-5 w-5" />
                    Add Item
                  </CardTitle>
                </CardHeader>
                  <CardContent className="space-y-4 flex-1">
                    {/* Item Type Selector */}
                    <div className="space-y-2">
                      <Label>Item Type</Label>
                      <Select 
                        value={selectedCategory} 
                        onValueChange={(value) => handleCategoryChange(value as ItemCategory)}
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Select item type" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover z-50">
                          <SelectItem value="trip">Trip</SelectItem>
                          <SelectItem value="accommodation">Accommodation</SelectItem>
                          <SelectItem value="adventure">Adventure Travel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    {/* Trip Form */}
                    {selectedCategory === "trip" && (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label>Transportation Type</Label>
                          <Select 
                            value={tripData.transportType} 
                            onValueChange={(value) => setTripData({ ...tripData, transportType: value })}
                          >
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select transport type" />
                            </SelectTrigger>
                            <SelectContent className="bg-popover z-50">
                              {transportTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  <div className="flex items-center gap-2">
                                    <type.icon className="h-4 w-4" />
                                    {type.label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Date
                          </Label>
                          <Input 
                            type="date" 
                            value={tripData.date}
                            onChange={(e) => setTripData({ ...tripData, date: e.target.value })}
                            className="bg-background"
                          />
                        </div>
                        
                        {tripData.transportType === "flight" && (
                          <div className="space-y-2">
                            <Label>Flight Class</Label>
                            <Select 
                              value={tripData.flightClass} 
                              onValueChange={(value) => setTripData({ ...tripData, flightClass: value })}
                            >
                              <SelectTrigger className="bg-background">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-popover z-50">
                                {flightClasses.map((fc) => (
                                  <SelectItem key={fc.value} value={fc.value}>
                                    {fc.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Trip From
                          </Label>
                          <Input 
                            placeholder="e.g., MNL - Manila"
                            value={tripData.from}
                            onChange={(e) => setTripData({ ...tripData, from: e.target.value })}
                            className="bg-background"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <ArrowRight className="h-4 w-4" />
                            To
                          </Label>
                          <Input 
                            placeholder="e.g., BKK - Bangkok"
                            value={tripData.to}
                            onChange={(e) => setTripData({ ...tripData, to: e.target.value })}
                            className="bg-background"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Distance (km)</Label>
                          <Input 
                            type="number" 
                            placeholder="Enter distance"
                            value={tripData.distance || ""}
                            onChange={(e) => setTripData({ ...tripData, distance: parseFloat(e.target.value) || 0 })}
                            className="bg-background"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Travellers
                          </Label>
                          <Input 
                            type="number" 
                            min="1"
                            value={tripData.travellers}
                            onChange={(e) => setTripData({ ...tripData, travellers: parseInt(e.target.value) || 1 })}
                            className="bg-background"
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch 
                            checked={tripData.returnTrip}
                            onCheckedChange={(checked) => setTripData({ ...tripData, returnTrip: checked })}
                          />
                          <Label>Return Trip</Label>
                        </div>
                      </div>
                    )}

                    {/* Accommodation Form */}
                    {selectedCategory === "accommodation" && (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label>Accommodation Type</Label>
                          <Select 
                            value={accommodationData.accommodationType} 
                            onValueChange={(value) => setAccommodationData({ ...accommodationData, accommodationType: value })}
                          >
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select accommodation type" />
                            </SelectTrigger>
                            <SelectContent className="bg-popover z-50">
                              {accommodationTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  <div className="flex items-center gap-2">
                                    <type.icon className="h-4 w-4" />
                                    {type.label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Check-in Date
                          </Label>
                          <Input 
                            type="date" 
                            value={accommodationData.date}
                            onChange={(e) => setAccommodationData({ ...accommodationData, date: e.target.value })}
                            className="bg-background"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Nights</Label>
                          <Input 
                            type="number" 
                            min="1"
                            value={accommodationData.nights}
                            onChange={(e) => setAccommodationData({ ...accommodationData, nights: parseInt(e.target.value) || 1 })}
                            className="bg-background"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Location
                          </Label>
                          <Input 
                            placeholder="e.g., Milan, Italy"
                            value={accommodationData.location}
                            onChange={(e) => setAccommodationData({ ...accommodationData, location: e.target.value })}
                            className="bg-background"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Guests
                          </Label>
                          <Input 
                            type="number" 
                            min="1"
                            value={accommodationData.guests}
                            onChange={(e) => setAccommodationData({ ...accommodationData, guests: parseInt(e.target.value) || 1 })}
                            className="bg-background"
                          />
                        </div>
                      </div>
                    )}

                    {/* Adventure Form */}
                    {selectedCategory === "adventure" && (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label>Adventure Type</Label>
                          <Select 
                            value={adventureData.adventureType} 
                            onValueChange={(value) => setAdventureData({ ...adventureData, adventureType: value })}
                          >
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select adventure type" />
                            </SelectTrigger>
                            <SelectContent className="bg-popover z-50">
                              {adventureTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  <div className="flex items-center gap-2">
                                    <type.icon className="h-4 w-4" />
                                    {type.label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Date
                          </Label>
                          <Input 
                            type="date" 
                            value={adventureData.date}
                            onChange={(e) => setAdventureData({ ...adventureData, date: e.target.value })}
                            className="bg-background"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Participants
                          </Label>
                          <Input 
                            type="number" 
                            min="1"
                            value={adventureData.participants}
                            onChange={(e) => setAdventureData({ ...adventureData, participants: parseInt(e.target.value) || 1 })}
                            className="bg-background"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Location
                          </Label>
                          <Input 
                            placeholder="e.g., Serengeti, Tanzania"
                            value={adventureData.location}
                            onChange={(e) => setAdventureData({ ...adventureData, location: e.target.value })}
                            className="bg-background"
                          />
                        </div>

                        {["lodge", "mobile_camp"].includes(adventureData.adventureType) ? (
                          <div className="space-y-2">
                            <Label>Duration (nights)</Label>
                            <Input 
                              type="number" 
                              min="1"
                              value={adventureData.duration}
                              onChange={(e) => setAdventureData({ ...adventureData, duration: parseInt(e.target.value) || 1 })}
                              className="bg-background"
                            />
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Label>Distance (km)</Label>
                            <Input 
                              type="number" 
                              placeholder="Enter distance"
                              value={adventureData.distance || ""}
                              onChange={(e) => setAdventureData({ ...adventureData, distance: parseFloat(e.target.value) || 0 })}
                              className="bg-background"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    <Separator />

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button 
                        onClick={confirmItem} 
                        disabled={calculateCurrentCO2() === 0}
                        className="flex-1"
                        size="sm"
                      >
                        Confirm
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={resetCurrentItem}
                        size="sm"
                      >
                        New Item
                      </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Column 2 - Trip CO2 Summary */}
              <Card className="flex flex-col">
                <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <TreePine className="h-5 w-5" />
                    Trip CO₂
                  </CardTitle>
                </CardHeader>
                  <CardContent className="pt-4 space-y-4 flex-1">
                    {/* Items List */}
                    {items.length > 0 ? (
                      <div className="space-y-2">
                        {items.map((item) => {
                          const Icon = getItemIcon(item);
                          const distance = (item as TripItem | AdventureItem).distance || 0;
                          return (
                            <div 
                              key={item.id} 
                              className="flex items-center justify-between p-2 bg-muted rounded-lg text-sm"
                            >
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4 text-primary" />
                                <div>
                                  <p className="font-medium text-xs">{getItemLabel(item)}</p>
                                  <p className="text-xs text-muted-foreground">{getItemDescription(item)}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="text-right">
                                  {distance > 0 && (
                                    <p className="text-xs text-muted-foreground">{distance.toLocaleString()} km</p>
                                  )}
                                  <p className="font-bold text-xs">{item.co2} kg</p>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-6 w-6 text-destructive hover:text-destructive"
                                  onClick={() => deleteItem(item.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No items added yet. Add your first trip item.
                      </p>
                    )}

                    <Separator />

                    {/* Total CO2 */}
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Total Trip CO₂</span>
                      <span className="text-xl font-bold text-foreground">
                        {(totalCO2 + calculateCurrentCO2()).toLocaleString()} kg
                      </span>
                    </div>

                    {/* Trees Needed Message */}
                    <div className="bg-primary/10 rounded-lg p-3 text-center">
                      <div className="flex justify-center mb-1">
                        <TreePine className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        You'll need <span className="font-bold text-primary text-lg">{totalTrees}</span> tree{totalTrees !== 1 ? "s" : ""} to remove this trip's CO₂ emissions
                      </p>
                    </div>

                    {/* Info Text */}
                    <p className="text-xs text-muted-foreground">
                      The trees you plant help create new future forests for our planet. 
                      We go that 'extra mile', combining your tree purchases with certified 
                      carbon credits investing into renewable energy projects.
                  </p>
                </CardContent>
              </Card>

              {/* Column 3 - Map */}
              <Card className="flex flex-col">
                <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <TreePine className="h-5 w-5" />
                    Tree Planting Locations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-1 flex flex-col">
                  <CalculatorMap />
                  
                  {/* Action Buttons below map */}
                <div className="space-y-2">
                  <Button className="w-full" size="lg">
                    Save Trip
                  </Button>
                  <Button variant="secondary" className="w-full" size="lg">
                    <TreePine className="h-4 w-4 mr-2" />
                    Just Plant My Trees
                  </Button>
                  </div>

                  <p className="text-sm text-center text-muted-foreground p-4 pt-0">
                    Larger Business?{" "}
                    <a href="#" className="text-primary hover:underline">
                      Contact us
                    </a>{" "}
                    about automatically adding all your travel.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
