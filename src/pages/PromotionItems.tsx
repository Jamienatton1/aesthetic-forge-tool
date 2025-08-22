import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, ArrowRight, Gift, ShoppingBag, Shirt, Badge, Droplets } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";

interface PromotionItem {
  id: string;
  name: string;
  icon: React.ElementType;
  quantity: number;
  pricePerUnit: number;
  co2Factor: number; // kg CO2e per unit
}

export default function PromotionItems() {
  const navigate = useNavigate();
  
  const [items, setItems] = useState<PromotionItem[]>([
    {
      id: 'lanyards',
      name: 'Lanyards',
      icon: Badge,
      quantity: 0,
      pricePerUnit: 0,
      co2Factor: 0.05
    },
    {
      id: 'bags',
      name: 'Bags',
      icon: ShoppingBag,
      quantity: 0,
      pricePerUnit: 0,
      co2Factor: 0.2
    },
    {
      id: 'clothes',
      name: 'Clothes',
      icon: Shirt,
      quantity: 0,
      pricePerUnit: 0,
      co2Factor: 2.5
    },
    {
      id: 'bottles',
      name: 'Water Bottles',
      icon: Droplets,
      quantity: 0,
      pricePerUnit: 0,
      co2Factor: 0.1
    }
  ]);

  const updateItem = (id: string, field: 'quantity' | 'pricePerUnit', value: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const totals = useMemo(() => {
    return items.reduce((acc, item) => ({
      totalItems: acc.totalItems + item.quantity,
      totalCost: acc.totalCost + (item.quantity * item.pricePerUnit),
      totalCO2e: acc.totalCO2e + (item.quantity * item.co2Factor)
    }), { totalItems: 0, totalCost: 0, totalCO2e: 0 });
  }, [items]);

  const handleSubmit = () => {
    console.log("Promotion items data:", items);
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
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Event Info Card */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Software Expo - HMRC</CardTitle>
                  <p className="text-lg text-muted-foreground">Manchester, UK • 100 Attendees</p>
                </CardHeader>
              </Card>

              {/* Promotion Items Table */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Gift className="w-8 h-8" />
                    Promotional Materials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-lg font-semibold">Item Type</TableHead>
                        <TableHead className="text-lg font-semibold">Quantity</TableHead>
                        <TableHead className="text-lg font-semibold">Price Per Unit (£)</TableHead>
                        <TableHead className="text-lg font-semibold">Total (£)</TableHead>
                        <TableHead className="text-lg font-semibold">CO₂e (Kg)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item) => {
                        const Icon = item.icon;
                        const total = item.quantity * item.pricePerUnit;
                        const co2e = item.quantity * item.co2Factor;
                        
                        return (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-3">
                                <Icon className="w-5 h-5 text-primary" />
                                <span className="text-lg">{item.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value) || 0)}
                                className="w-24 h-10"
                                placeholder="0"
                                min="0"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                step="0.01"
                                value={item.pricePerUnit}
                                onChange={(e) => updateItem(item.id, 'pricePerUnit', Number(e.target.value) || 0)}
                                className="w-28 h-10"
                                placeholder="0.00"
                                min="0"
                              />
                            </TableCell>
                            <TableCell className="font-medium text-lg">
                              £{total.toFixed(2)}
                            </TableCell>
                            <TableCell className="font-medium text-lg">
                              {co2e.toFixed(3)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Summary Card */}
              <Card className="border-2 bg-muted/50">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {totals.totalItems}
                      </div>
                      <div className="text-lg text-muted-foreground">Total Items</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        £{totals.totalCost.toFixed(2)}
                      </div>
                      <div className="text-lg text-muted-foreground">Total Cost</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {totals.totalCO2e.toFixed(3)}
                      </div>
                      <div className="text-lg text-muted-foreground">Total CO₂e (Kg)</div>
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