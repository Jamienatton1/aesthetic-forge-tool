import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Plus, Minus, Coffee, Utensils, Wine } from "lucide-react";
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

  // Sample event dates - in real app, this would come from eventData
  const eventDates = ["2024-08-20", "2024-08-21", "2024-08-22"];

  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Coffee Break", "Snacks"];
  const foodCategories = ["Poultry", "Red Meat", "Seafood", "Vegan", "Vegetarian", "Mixed Buffet"];
  const drinkTypes = ["Bottled Water", "Tap Water", "Tea/Coffee", "Wine", "Beer", "Cocktails", "Soft Drinks"];

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

  return (
    <div className="min-h-screen bg-background">
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="max-w-6xl mx-auto space-y-6">
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

              {/* Date Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="h-5 w-5" />
                    Select Event Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {eventDates.map((date) => (
                      <Button
                        key={date}
                        variant={selectedDate === date ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => setSelectedDate(date)}
                      >
                        {new Date(date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {selectedDate && (
                <>
                  {/* Meals Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Utensils className="h-5 w-5" />
                        Meals for {new Date(selectedDate).toLocaleDateString()}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {mealTypes.map((mealType) => (
                        <div key={mealType} className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">{mealType}</h3>
                            <Badge variant="outline">
                              Total: {getMealTotal(selectedDate, mealType)}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {foodCategories.map((category) => (
                              <div key={category} className="space-y-2">
                                <Label className="text-sm font-medium">{category}</Label>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
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
                                    className="h-8 text-center"
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
                                    className="h-8 w-8"
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
                          <Separator />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Drinks Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Wine className="h-5 w-5" />
                        Beverages for {new Date(selectedDate).toLocaleDateString()}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">All Beverages</h3>
                        <Badge variant="outline">
                          Total: {getDrinkTotal(selectedDate)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {drinkTypes.map((drinkType) => (
                          <div key={drinkType} className="space-y-2">
                            <Label className="text-sm font-medium">{drinkType}</Label>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
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
                                className="h-8 text-center"
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
                                className="h-8 w-8"
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

                  {/* Action Buttons */}
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => navigate(-1)}>
                      Back to Previous
                    </Button>
                    <div className="flex gap-3">
                      <Button variant="outline">Save Draft</Button>
                      <Button onClick={() => navigate('/events/success')}>
                        Continue to Next Step
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FoodDrink;