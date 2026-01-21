import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Plane, Car, Bus, Train, Bike, Ship, Home, Building, Tent, 
  TreePine, MapPin, Calendar, Users, ArrowRight,
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
  { value: "hotel", label: "Hotel", icon: Building, co2Factor: 14.4 },
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

const CO2_PER_TREE = 150;

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
  const [tripData, setTripData] = useState(defaultTripItem);
  const [accommodationData, setAccommodationData] = useState(defaultAccommodationItem);
  const [adventureData, setAdventureData] = useState(defaultAdventureItem);

  const calculateTripCO2 = (item: typeof tripData): number => {
    const transport = transportTypes.find(t => t.value === item.transportType);
    if (!transport || !item.distance || !item.travellers) return 0;
    
    let co2 = item.distance * transport.co2Factor * item.travellers;
    
    if (item.transportType === "flight" && item.flightClass) {
      const flightClass = flightClasses.find(c => c.value === item.flightClass);
      if (flightClass) co2 *= flightClass.multiplier;
    }
    
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

  const totalCO2 = items.reduce((sum, item) => sum + item.co2, 0) + calculateCurrentCO2();
  const totalTrees = treesNeeded(totalCO2);

  const confirmItem = () => {
    const co2 = calculateCurrentCO2();
    if (co2 === 0) return;

    let newItem: CalculatorItem;
    
    if (selectedCategory === "trip") {
      newItem = { ...tripData, id: Date.now().toString(), co2 } as TripItem;
    } else if (selectedCategory === "accommodation") {
      newItem = { ...accommodationData, id: Date.now().toString(), co2 } as AccommodationItem;
    } else {
      newItem = { ...adventureData, id: Date.now().toString(), co2 } as AdventureItem;
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

  const handleCategoryChange = (category: ItemCategory) => {
    setSelectedCategory(category);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920')] bg-cover bg-center bg-fixed">
        <div className="min-h-screen bg-black/30">
          <TopNavBar />

          {/* Main Content */}
          <main className="py-8 px-4">
            <div className="max-w-6xl mx-auto">
              {/* Title */}
              <h1 className="text-4xl font-bold text-center text-foreground mb-8">CO2 CALCULATOR</h1>

              {/* Main Calculator Card */}
              <Card className="bg-card/95 backdrop-blur-sm shadow-2xl">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Item Form */}
                    <div className="space-y-6">
                      {/* Item Type */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold uppercase tracking-wide">Item Type</Label>
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

                      {/* Trip Form */}
                      {selectedCategory === "trip" && (
                        <>
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold uppercase tracking-wide">Transportation Type</Label>
                            <Select 
                              value={tripData.transportType} 
                              onValueChange={(value) => setTripData({ ...tripData, transportType: value })}
                            >
                              <SelectTrigger className="bg-background">
                                <SelectValue placeholder="Please select" />
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
                            <Label className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
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
                              <Label className="text-sm font-semibold uppercase tracking-wide">Flight Class</Label>
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

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
                                <MapPin className="h-4 w-4" />
                                From
                              </Label>
                              <Input 
                                placeholder="e.g., MNL"
                                value={tripData.from}
                                onChange={(e) => setTripData({ ...tripData, from: e.target.value })}
                                className="bg-background"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
                                <ArrowRight className="h-4 w-4" />
                                To
                              </Label>
                              <Input 
                                placeholder="e.g., BKK"
                                value={tripData.to}
                                onChange={(e) => setTripData({ ...tripData, to: e.target.value })}
                                className="bg-background"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-semibold uppercase tracking-wide">Distance (km)</Label>
                            <Input 
                              type="number" 
                              placeholder="Enter distance"
                              value={tripData.distance || ""}
                              onChange={(e) => setTripData({ ...tripData, distance: parseFloat(e.target.value) || 0 })}
                              className="bg-background"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
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
                            <div className="flex items-center space-x-2 pt-8">
                              <Switch 
                                checked={tripData.returnTrip}
                                onCheckedChange={(checked) => setTripData({ ...tripData, returnTrip: checked })}
                              />
                              <Label>Return</Label>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Accommodation Form */}
                      {selectedCategory === "accommodation" && (
                        <>
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold uppercase tracking-wide">Accommodation Type</Label>
                            <Select 
                              value={accommodationData.accommodationType} 
                              onValueChange={(value) => setAccommodationData({ ...accommodationData, accommodationType: value })}
                            >
                              <SelectTrigger className="bg-background">
                                <SelectValue placeholder="Please select" />
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
                            <Label className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
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
                            <Label className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
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

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm font-semibold uppercase tracking-wide">Nights</Label>
                              <Input 
                                type="number" 
                                min="1"
                                value={accommodationData.nights}
                                onChange={(e) => setAccommodationData({ ...accommodationData, nights: parseInt(e.target.value) || 1 })}
                                className="bg-background"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
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
                        </>
                      )}

                      {/* Adventure Form */}
                      {selectedCategory === "adventure" && (
                        <>
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold uppercase tracking-wide">Adventure Type</Label>
                            <Select 
                              value={adventureData.adventureType} 
                              onValueChange={(value) => setAdventureData({ ...adventureData, adventureType: value })}
                            >
                              <SelectTrigger className="bg-background">
                                <SelectValue placeholder="Please select" />
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
                            <Label className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
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
                            <Label className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
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

                          <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
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

                          {["lodge", "mobile_camp"].includes(adventureData.adventureType) ? (
                            <div className="space-y-2">
                              <Label className="text-sm font-semibold uppercase tracking-wide">Duration (nights)</Label>
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
                              <Label className="text-sm font-semibold uppercase tracking-wide">Distance (km)</Label>
                              <Input 
                                type="number" 
                                placeholder="Enter distance"
                                value={adventureData.distance || ""}
                                onChange={(e) => setAdventureData({ ...adventureData, distance: parseFloat(e.target.value) || 0 })}
                                className="bg-background"
                              />
                            </div>
                          )}
                        </>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4">
                        <Button 
                          onClick={confirmItem} 
                          disabled={calculateCurrentCO2() === 0}
                          className="bg-primary hover:bg-primary/90"
                        >
                          SAVE ITEM
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={resetCurrentItem}
                          className="border-foreground text-foreground hover:bg-muted"
                        >
                          NEW ITEM
                        </Button>
                      </div>
                    </div>

                    {/* Middle Column - CO2 Display */}
                    <div className="flex flex-col items-center justify-center text-center space-y-8">
                      {/* Total CO2 */}
                      <div>
                        <h2 className="text-lg font-semibold uppercase tracking-wide mb-4">Total Trip CO2</h2>
                        <p className="text-4xl font-bold">
                          {totalCO2 > 0 ? `${totalCO2.toLocaleString()} kg` : "- kg"}
                        </p>
                      </div>

                      {/* Info Text */}
                      <div className="space-y-4 max-w-xs">
                        <p className="text-lg font-medium">
                          Enter your trip to see how many trees you need to plant to remove your CO2 emissions.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          The trees you plant help create new future forests for our planet. We go that 'extra mile', combining your tree purchases with certified carbon credits investing into renewable energy projects.
                        </p>
                      </div>

                      {/* Trees Needed */}
                      {totalCO2 > 0 && (
                        <div className="bg-primary/10 rounded-lg p-4">
                          <div className="flex items-center justify-center gap-2 text-primary">
                            <TreePine className="h-6 w-6" />
                            <span className="text-xl font-bold">{totalTrees} tree{totalTrees !== 1 ? "s" : ""} needed</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column - Map & Actions */}
                    <div className="space-y-4">
                      {/* Map */}
                      <CalculatorMap />

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <Button 
                          variant="outline" 
                          className="w-full border-muted-foreground text-muted-foreground hover:bg-muted"
                          size="lg"
                        >
                          SAVE TRIP
                        </Button>
                        <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                          <TreePine className="h-4 w-4 mr-2" />
                          JUST PLANT MY TREES
                        </Button>
                      </div>

                      {/* Contact Link */}
                      <p className="text-sm text-center text-muted-foreground">
                        <a href="#" className="underline hover:text-foreground">
                          Larger Business? Contact us about automatically adding all your travel.
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
