import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Hotel, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function Accommodations() {
  const navigate = useNavigate();
  const [accommodationData, setAccommodationData] = useState({
    hotelNights: 0,
    guesthouses: 0,
    airbnb: 0,
    other: 0
  });

  const handleSubmit = () => {
    console.log("Accommodation data:", accommodationData);
    navigate("/events/promotion-items");
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
                <Hotel className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Accommodation Information</h1>
                <p className="text-lg text-primary-foreground/90">
                  Enter accommodation details for your event attendees
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

              {/* Accommodation Categories */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Hotel className="w-8 h-8" />
                    Accommodation Types
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-lg font-medium flex items-center gap-2">
                        <Hotel className="w-5 h-5" />
                        Hotel Nights
                      </Label>
                      <Input
                        type="number"
                        value={accommodationData.hotelNights}
                        onChange={(e) => setAccommodationData({...accommodationData, hotelNights: Number(e.target.value)})}
                        className="text-lg h-12"
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-lg font-medium flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Guesthouse Nights
                      </Label>
                      <Input
                        type="number"
                        value={accommodationData.guesthouses}
                        onChange={(e) => setAccommodationData({...accommodationData, guesthouses: Number(e.target.value)})}
                        className="text-lg h-12"
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-lg font-medium">Airbnb/Rental Nights</Label>
                      <Input
                        type="number"
                        value={accommodationData.airbnb}
                        onChange={(e) => setAccommodationData({...accommodationData, airbnb: Number(e.target.value)})}
                        className="text-lg h-12"
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-lg font-medium">Other Accommodation</Label>
                      <Input
                        type="number"
                        value={accommodationData.other}
                        onChange={(e) => setAccommodationData({...accommodationData, other: Number(e.target.value)})}
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