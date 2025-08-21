import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Car, Plane, Train } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function Travel() {
  const navigate = useNavigate();
  const location = useLocation();
  const [travelData, setTravelData] = useState({
    airTravel: 0,
    carTravel: 0,
    publicTransport: 0,
    other: 0
  });

  const handleSubmit = () => {
    console.log("Travel data:", travelData);
    
    // Get the remaining categories to navigate through
    const categoryOrder = ["venue", "food", "travel", "accommodations", "promotion"];
    const { selectedCategories = [] } = location.state || {};
    const currentIndex = categoryOrder.indexOf("travel");
    
    // Find next selected category
    for (let i = currentIndex + 1; i < categoryOrder.length; i++) {
      if (selectedCategories.includes(categoryOrder[i])) {
        const nextCategory = categoryOrder[i];
        if (nextCategory === "accommodations") navigate("/events/accommodations");
        else if (nextCategory === "promotion") navigate("/events/promotion-items");
        return;
      }
    }
    
    // If no more categories, go to questionnaire
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
                  Enter travel details for your event attendees
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Event Info Card */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Software Expo - HMRC</CardTitle>
                  <p className="text-lg text-muted-foreground">Manchester, UK • 100 Attendees</p>
                </CardHeader>
              </Card>

              {/* Travel Categories */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Car className="w-8 h-8" />
                    Travel Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-lg font-medium flex items-center gap-2">
                        <Plane className="w-5 h-5" />
                        Air Travel (number of flights)
                      </Label>
                      <Input
                        type="number"
                        value={travelData.airTravel}
                        onChange={(e) => setTravelData({...travelData, airTravel: Number(e.target.value)})}
                        className="text-lg h-12"
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-lg font-medium flex items-center gap-2">
                        <Car className="w-5 h-5" />
                        Car Travel (miles)
                      </Label>
                      <Input
                        type="number"
                        value={travelData.carTravel}
                        onChange={(e) => setTravelData({...travelData, carTravel: Number(e.target.value)})}
                        className="text-lg h-12"
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-lg font-medium flex items-center gap-2">
                        <Train className="w-5 h-5" />
                        Public Transport (trips)
                      </Label>
                      <Input
                        type="number"
                        value={travelData.publicTransport}
                        onChange={(e) => setTravelData({...travelData, publicTransport: Number(e.target.value)})}
                        className="text-lg h-12"
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-lg font-medium">Other Transport</Label>
                      <Input
                        type="number"
                        value={travelData.other}
                        onChange={(e) => setTravelData({...travelData, other: Number(e.target.value)})}
                        className="text-lg h-12"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

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