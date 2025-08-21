import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Gift, ShoppingBag, Shirt } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function PromotionItems() {
  const navigate = useNavigate();
  const [promotionData, setPromotionData] = useState({
    tshirts: 0,
    bags: 0,
    pens: 0,
    brochures: 0,
    other: 0
  });

  const handleSubmit = () => {
    console.log("Promotion items data:", promotionData);
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
                <Gift className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Promotion Items</h1>
                <p className="text-lg text-primary-foreground/90">
                  Enter details about promotional materials and giveaways
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

              {/* Promotion Items */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Gift className="w-8 h-8" />
                    Promotional Materials
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-lg font-medium flex items-center gap-2">
                        <Shirt className="w-5 h-5" />
                        T-shirts/Apparel (quantity)
                      </Label>
                      <Input
                        type="number"
                        value={promotionData.tshirts}
                        onChange={(e) => setPromotionData({...promotionData, tshirts: Number(e.target.value)})}
                        className="text-lg h-12"
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-lg font-medium flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        Bags/Totes (quantity)
                      </Label>
                      <Input
                        type="number"
                        value={promotionData.bags}
                        onChange={(e) => setPromotionData({...promotionData, bags: Number(e.target.value)})}
                        className="text-lg h-12"
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-lg font-medium">Pens/Stationery (quantity)</Label>
                      <Input
                        type="number"
                        value={promotionData.pens}
                        onChange={(e) => setPromotionData({...promotionData, pens: Number(e.target.value)})}
                        className="text-lg h-12"
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-lg font-medium">Brochures/Flyers (quantity)</Label>
                      <Input
                        type="number"
                        value={promotionData.brochures}
                        onChange={(e) => setPromotionData({...promotionData, brochures: Number(e.target.value)})}
                        className="text-lg h-12"
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-3 md:col-span-2">
                      <Label className="text-lg font-medium">Other Items (quantity)</Label>
                      <Input
                        type="number"
                        value={promotionData.other}
                        onChange={(e) => setPromotionData({...promotionData, other: Number(e.target.value)})}
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