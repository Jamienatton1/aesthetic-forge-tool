import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TreePine, Package, Smartphone, ShoppingCart } from "lucide-react";

const TreeSwag = () => {
  const swagOptions = [
    {
      id: 1,
      icon: TreePine,
      title: "Virtual Trees",
      description: "Plant trees digitally and track their growth online",
      features: ["Digital certificate", "GPS coordinates", "Growth updates"],
      pricePerTree: 2.50,
      co2Offset: 22,
    },
    {
      id: 2,
      icon: Package,
      title: "Physical Products",
      description: "Sustainable merchandise made from recycled materials",
      features: ["Eco-friendly materials", "Custom branding", "Carbon neutral shipping"],
      pricePerTree: 5.00,
      co2Offset: 22,
    },
    {
      id: 3,
      icon: Smartphone,
      title: "Virtual Attendance",
      description: "Offset emissions for virtual event participants",
      features: ["Per-attendee calculation", "Automated reporting", "Digital badges"],
      pricePerTree: 1.50,
      co2Offset: 15,
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto p-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Tree Swag</h1>
                <p className="text-muted-foreground">
                  Choose from our selection of sustainable products and tree planting options
                </p>
              </div>
              <Button size="lg">
                <ShoppingCart className="w-5 h-5 mr-2" />
                View Cart
              </Button>
            </div>
          </div>

          {/* Mix and Match Section */}
          <Card className="mb-8 bg-gradient-hero border-0">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Mix 'N Match of Trees</CardTitle>
              <CardDescription className="text-white/80">
                Automatically plant up to 100 of our trees for every €7,500 in sales, or you can add 20 trees for every €1,500 in total sales or just €21 per tree
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
                  <div className="text-3xl font-bold mb-1">9,661</div>
                  <div className="text-sm text-white/80">Total Trees Growing</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
                  <div className="text-3xl font-bold mb-1">885 tn</div>
                  <div className="text-sm text-white/80">CO₂ Compensated</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
                  <div className="text-3xl font-bold mb-1">€2.50</div>
                  <div className="text-sm text-white/80">Average Cost per Tree</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Swag Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {swagOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Card key={option.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {option.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Price per tree</span>
                        <span className="font-semibold">€{option.pricePerTree.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">CO₂ offset</span>
                        <Badge variant="secondary">{option.co2Offset} kg CO₂e</Badge>
                      </div>
                    </div>

                    <Button className="w-full" variant="default">
                      Select Option
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional Info */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>
                Simple steps to offset your carbon footprint with tree swag
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Choose Your Option</h3>
                  <p className="text-sm text-muted-foreground">Select from virtual trees, physical products, or virtual attendance</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Customize Your Order</h3>
                  <p className="text-sm text-muted-foreground">Set quantity and add your branding or personalization</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Complete Purchase</h3>
                  <p className="text-sm text-muted-foreground">Secure checkout with multiple payment options</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">Track Your Impact</h3>
                  <p className="text-sm text-muted-foreground">Monitor your trees and carbon offset in real-time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default TreeSwag;
