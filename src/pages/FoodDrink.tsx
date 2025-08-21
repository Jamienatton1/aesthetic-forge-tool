import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronLeft, Plus, Minus, Coffee, Utensils, Wine, Copy, Eye } from "lucide-react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";

interface FoodDrinkData {
  [date: string]: {
    meals: {
      [mealType: string]: {
        [category: string]: number;
      };
    };
    drinks: {
      [drinkType: string]: number;
    };
  };
}

const FoodDrink = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const eventData = location.state?.eventData || {};
  
  const [foodDrinkData, setFoodDrinkData] = useState<FoodDrinkData>({});
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [copyFromDate, setCopyFromDate] = useState<string>("");
  const [activeTab, setActiveTab] = useState("overview");

  // Sample event dates - in real app, this would come from eventData
  const eventDates = ["2024-08-20", "2024-08-21", "2024-08-22"];

  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Coffee Break"];
  const foodCategories = ["Poultry", "Red Meat", "Seafood", "Vegan", "Vegetarian", "Mixed Buffet", "Snacks"];
  const drinkTypes = ["Still Water", "Tap Water", "Tea/Coffee", "Wine", "Beer", "Cocktails", "Soft Drinks"];

  const updateMealData = (date: string, mealType: string, category: string, value: number) => {
    setFoodDrinkData(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        meals: {
          ...prev[date]?.meals,
          [mealType]: {
            ...prev[date]?.meals?.[mealType],
            [category]: Math.max(0, value)
          }
        }
      }
    }));
  };

  const updateDrinkData = (date: string, drinkType: string, value: number) => {
    setFoodDrinkData(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        drinks: {
          ...prev[date]?.drinks,
          [drinkType]: Math.max(0, value)
        }
      }
    }));
  };

  const getMealTotal = (date: string, mealType: string) => {
    const meals = foodDrinkData[date]?.meals?.[mealType] || {};
    return Object.values(meals).reduce((sum, val) => sum + val, 0);
  };

  const getDrinkTotal = (date: string) => {
    const drinks = foodDrinkData[date]?.drinks || {};
    return Object.values(drinks).reduce((sum, val) => sum + val, 0);
  };

  const getAllMealsTotal = (date: string) => {
    const dayData = foodDrinkData[date];
    if (!dayData?.meals) return 0;
    return Object.values(dayData.meals).reduce((sum, mealType) => {
      return sum + Object.values(mealType).reduce((mealSum, val) => mealSum + val, 0);
    }, 0);
  };

  const copyFromAnotherDay = () => {
    if (!copyFromDate || !selectedDate) return;
    
    const sourceData = foodDrinkData[copyFromDate];
    if (sourceData) {
      setFoodDrinkData(prev => ({
        ...prev,
        [selectedDate]: {
          meals: { ...sourceData.meals },
          drinks: { ...sourceData.drinks }
        }
      }));
    }
  };

  const clearValues = () => {
    if (!selectedDate) return;
    setFoodDrinkData(prev => ({
      ...prev,
      [selectedDate]: {
        meals: {},
        drinks: {}
      }
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header */}
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
                <div>
                  <h1 className="text-3xl font-bold">Food & Beverage</h1>
                  <p className="text-muted-foreground">
                    Track meals and drinks for your event: {eventData.name || "Event Name"}
                  </p>
                </div>
              </div>

              {/* Event Info */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Physical Attendees:</span>
                      <Badge variant="secondary">{eventData.physicalAttendees || 100}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Virtual Attendees:</span>
                      <Badge variant="secondary">{eventData.virtualAttendees || 50}</Badge>
                    </div>  
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Staff:</span>
                      <Badge variant="secondary">{eventData.staff || 10}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Main Content with Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="entry" className="flex items-center gap-2">
                    <Utensils className="h-4 w-4" />
                    Enter Data
                  </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Food & Beverage Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* Meals Overview Table */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Utensils className="h-5 w-5" />
                            Meals
                          </h3>
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="font-semibold">Date</TableHead>
                                  {foodCategories.map(category => (
                                    <TableHead key={category} className="text-center font-semibold min-w-[80px]">
                                      {category}
                                    </TableHead>
                                  ))}
                                  <TableHead className="text-center font-semibold bg-muted">Total Meals</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {eventDates.map(date => (
                                  <TableRow key={date}>
                                    <TableCell className="font-medium">
                                      {new Date(date).toLocaleDateString('en-US', { 
                                        weekday: 'short',
                                        month: 'short', 
                                        day: 'numeric' 
                                      })}
                                    </TableCell>
                                    {foodCategories.map(category => {
                                      const total = mealTypes.reduce((sum, mealType) => {
                                        return sum + (foodDrinkData[date]?.meals?.[mealType]?.[category] || 0);
                                      }, 0);
                                      return (
                                        <TableCell key={category} className="text-center">
                                          {total || 0}
                                        </TableCell>
                                      );
                                    })}
                                    <TableCell className="text-center font-semibold bg-muted">
                                      {getAllMealsTotal(date)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>

                        <Separator />

                        {/* Drinks Overview Table */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Wine className="h-5 w-5" />
                            Beverages
                          </h3>
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="font-semibold">Date</TableHead>
                                  {drinkTypes.map(drinkType => (
                                    <TableHead key={drinkType} className="text-center font-semibold min-w-[80px]">
                                      {drinkType}
                                    </TableHead>
                                  ))}
                                  <TableHead className="text-center font-semibold bg-muted">Total Drinks</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {eventDates.map(date => (
                                  <TableRow key={date}>
                                    <TableCell className="font-medium">
                                      {new Date(date).toLocaleDateString('en-US', { 
                                        weekday: 'short',
                                        month: 'short', 
                                        day: 'numeric' 
                                      })}
                                    </TableCell>
                                    {drinkTypes.map(drinkType => (
                                      <TableCell key={drinkType} className="text-center">
                                        {foodDrinkData[date]?.drinks?.[drinkType] || 0}
                                      </TableCell>
                                    ))}
                                    <TableCell className="text-center font-semibold bg-muted">
                                      {getDrinkTotal(date)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Data Entry Tab */}
                <TabsContent value="entry" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Utensils className="h-5 w-5" />
                        Enter Food & Beverages
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Date Selection */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Select Date</Label>
                          <Select value={selectedDate} onValueChange={setSelectedDate}>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose event date" />
                            </SelectTrigger>
                            <SelectContent>
                              {eventDates.map(date => (
                                <SelectItem key={date} value={date}>
                                  {new Date(date).toLocaleDateString('en-US', { 
                                    weekday: 'long',
                                    month: 'long', 
                                    day: 'numeric' 
                                  })}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {selectedDate && (
                          <>
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">Copy From Another Day</Label>
                              <Select value={copyFromDate} onValueChange={setCopyFromDate}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select source date" />
                                </SelectTrigger>
                                <SelectContent>
                                  {eventDates.filter(date => date !== selectedDate).map(date => (
                                    <SelectItem key={date} value={date}>
                                      {new Date(date).toLocaleDateString('en-US', { 
                                        weekday: 'short',
                                        month: 'short', 
                                        day: 'numeric' 
                                      })}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="flex gap-2 items-end">
                              <Button 
                                variant="outline" 
                                onClick={copyFromAnotherDay}
                                disabled={!copyFromDate}
                                className="flex items-center gap-2"
                              >
                                <Copy className="h-4 w-4" />
                                Copy Data
                              </Button>
                              <Button 
                                variant="outline" 
                                onClick={clearValues}
                                className="text-destructive"
                              >
                                Clear All
                              </Button>
                            </div>
                          </>
                        )}
                      </div>

                      {selectedDate && (
                        <>
                          {/* Meals Entry */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <Utensils className="h-4 w-4" />
                                Meals - {new Date(selectedDate).toLocaleDateString('en-US', { 
                                  weekday: 'long',
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                              {mealTypes.map(mealType => (
                                <div key={mealType} className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-base">{mealType}</h4>
                                    <Badge variant="outline">
                                      Total: {getMealTotal(selectedDate, mealType)}
                                    </Badge>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                                    {foodCategories.map(category => (
                                      <div key={category} className="space-y-2">
                                        <Label className="text-xs font-medium text-muted-foreground">
                                          {category}
                                        </Label>
                                        <div className="flex items-center gap-1">
                                          <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-7 w-7"
                                            onClick={() => updateMealData(
                                              selectedDate, 
                                              mealType, 
                                              category, 
                                              (foodDrinkData[selectedDate]?.meals?.[mealType]?.[category] || 0) - 1
                                            )}
                                          >
                                            <Minus className="h-3 w-3" />
                                          </Button>
                                          <Input
                                            type="number"
                                            min="0"
                                            className="h-7 text-center text-sm"
                                            value={foodDrinkData[selectedDate]?.meals?.[mealType]?.[category] || 0}
                                            onChange={(e) => updateMealData(
                                              selectedDate, 
                                              mealType, 
                                              category, 
                                              parseInt(e.target.value) || 0
                                            )}
                                          />
                                          <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-7 w-7"
                                            onClick={() => updateMealData(
                                              selectedDate, 
                                              mealType, 
                                              category, 
                                              (foodDrinkData[selectedDate]?.meals?.[mealType]?.[category] || 0) + 1
                                            )}
                                          >
                                            <Plus className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  {mealType !== mealTypes[mealTypes.length - 1] && <Separator />}
                                </div>
                              ))}
                            </CardContent>
                          </Card>

                          {/* Drinks Entry */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <Wine className="h-4 w-4" />
                                Beverages - {new Date(selectedDate).toLocaleDateString('en-US', { 
                                  weekday: 'long',
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="font-semibold text-base">All Beverages</h4>
                                <Badge variant="outline">
                                  Total: {getDrinkTotal(selectedDate)}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                                {drinkTypes.map(drinkType => (
                                  <div key={drinkType} className="space-y-2">
                                    <Label className="text-xs font-medium text-muted-foreground">
                                      {drinkType}
                                    </Label>
                                    <div className="flex items-center gap-1">
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-7 w-7"
                                        onClick={() => updateDrinkData(
                                          selectedDate, 
                                          drinkType, 
                                          (foodDrinkData[selectedDate]?.drinks?.[drinkType] || 0) - 1
                                        )}
                                      >
                                        <Minus className="h-3 w-3" />
                                      </Button>
                                      <Input
                                        type="number"
                                        min="0"
                                        className="h-7 text-center text-sm"
                                        value={foodDrinkData[selectedDate]?.drinks?.[drinkType] || 0}
                                        onChange={(e) => updateDrinkData(
                                          selectedDate, 
                                          drinkType, 
                                          parseInt(e.target.value) || 0
                                        )}
                                      />
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-7 w-7"
                                        onClick={() => updateDrinkData(
                                          selectedDate, 
                                          drinkType, 
                                          (foodDrinkData[selectedDate]?.drinks?.[drinkType] || 0) + 1
                                        )}
                                      >
                                        <Plus className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>

                          {/* Summary for selected date */}
                          <Card className="bg-muted/20">
                            <CardContent className="pt-6">
                              <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                  <div className="text-2xl font-bold text-primary">
                                    {getAllMealsTotal(selectedDate)}
                                  </div>
                                  <div className="text-sm text-muted-foreground">Total Meals</div>
                                </div>
                                <div>
                                  <div className="text-2xl font-bold text-primary">
                                    {getDrinkTotal(selectedDate)}
                                  </div>
                                  <div className="text-sm text-muted-foreground">Total Drinks</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => navigate(-1)}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Previous
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline">Save Draft</Button>
                  <Button onClick={() => {
                    console.log("Food & Drink data:", foodDrinkData);
                    
                    // Get the remaining categories to navigate through
                    const categoryOrder = ["venue", "food", "travel", "accommodations", "promotion"];
                    const { selectedCategories = [] } = location.state || {};
                    const currentIndex = categoryOrder.indexOf("food");
                    
                    // Find next selected category
                    for (let i = currentIndex + 1; i < categoryOrder.length; i++) {
                      if (selectedCategories.includes(categoryOrder[i])) {
                        const nextCategory = categoryOrder[i];
                        if (nextCategory === "travel") navigate("/events/travel");
                        else if (nextCategory === "accommodations") navigate("/events/accommodations");
                        else if (nextCategory === "promotion") navigate("/events/promotion-items");
                        return;
                      }
                    }
                    
                    // If no more categories, go to questionnaire
                    navigate("/events/questionnaire");
                  }}>
                    Continue to Next Step
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FoodDrink;