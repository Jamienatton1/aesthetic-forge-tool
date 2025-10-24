import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TreeSwag = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">TREE SWAG</h1>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="physical-products" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="virtual-trees">Virtual Trees</TabsTrigger>
              <TabsTrigger value="physical-products">Physical Products</TabsTrigger>
              <TabsTrigger value="virtual-attendance">Virtual Attendance</TabsTrigger>
              <TabsTrigger value="staff">Staff</TabsTrigger>
            </TabsList>

            {/* Virtual Trees Tab */}
            <TabsContent value="virtual-trees">
              <Card>
                <CardHeader>
                  <CardTitle>Virtual Trees</CardTitle>
                  <CardDescription>Plant trees digitally and track their impact</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Choose virtual tree planting options for your event attendees. Each tree planted helps offset carbon emissions.
                    </p>
                    <Button>Configure Virtual Trees</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Physical Products Tab */}
            <TabsContent value="physical-products">
              <div className="space-y-6">
                {/* Mix N Match Section */}
                <Card className="bg-gradient-hero border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">MIX 'N MATCH OF TREES</CardTitle>
                    <CardDescription className="text-white/90">
                      AUTOMATICALLY GIVE UP TO 100 OF OUR TREES TO EVERY 20 EVENTS OR ADD 20 TREES TO EVERY EVENT AT $75.00 OR JUST $21 PER TREE
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-sm text-white/80 mb-1">TREES</div>
                        <div className="text-3xl font-bold text-white">5000</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-sm text-white/80 mb-1">$ PER TREE</div>
                        <div className="text-3xl font-bold text-white">$2.50</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-sm text-white/80 mb-1">22 KG OFFSET</div>
                        <div className="text-3xl font-bold text-white">Per Tree</div>
                      </div>
                    </div>
                    <Button className="bg-white text-primary hover:bg-white/90">
                      DOWNLOAD CATALOG
                    </Button>
                  </CardContent>
                </Card>

                {/* Product Options */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Your Logo Option */}
                  <Card>
                    <CardHeader>
                      <CardTitle>1 TREES WITH YOUR LOGO</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="text-6xl mb-2">📱</div>
                          <div className="text-lg font-semibold">YOUR LOGO</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Customizable tree certificates with your company logo
                      </p>
                    </CardContent>
                  </Card>

                  {/* Physical Item Option */}
                  <Card>
                    <CardHeader>
                      <CardTitle>2 YOUR LOGO</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="text-6xl mb-2">📦</div>
                          <div className="text-lg font-semibold">YOUR LOGO</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Physical sustainable products with custom branding
                      </p>
                    </CardContent>
                  </Card>

                  {/* QR Code Option */}
                  <Card>
                    <CardHeader>
                      <CardTitle>3 ITEM WITH QR CODE</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="text-6xl mb-2">▦</div>
                          <div className="text-lg font-semibold">QR CODE</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Products with QR codes linking to tree planting information
                      </p>
                    </CardContent>
                  </Card>

                  {/* Logo Placement Option */}
                  <Card>
                    <CardHeader>
                      <CardTitle>4 LOGO HERE</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="text-6xl mb-2">🌲</div>
                          <div className="text-lg font-semibold">YOUR LOGO</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Additional logo placement options for maximum visibility
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Bottom Note */}
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-sm text-muted-foreground">
                      Alternatively plant a mix of 100% of our trees for every $1,500 of event revenue through your portal or $15 per unit
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Virtual Attendance Tab */}
            <TabsContent value="virtual-attendance">
              <Card>
                <CardHeader>
                  <CardTitle>Virtual Attendance</CardTitle>
                  <CardDescription>Offset emissions for virtual participants</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Calculate and offset carbon emissions for virtual event attendees.
                    </p>
                    <Button>Set Up Virtual Attendance Offset</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Staff Tab */}
            <TabsContent value="staff">
              <Card>
                <CardHeader>
                  <CardTitle>Staff Carbon Offset</CardTitle>
                  <CardDescription>Manage staff-related carbon offsetting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Track and offset carbon emissions from staff travel and activities.
                    </p>
                    <Button>Configure Staff Offset</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default TreeSwag;
