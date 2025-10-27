import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const TreeSwag = () => {
  const [maxTrees, setMaxTrees] = useState("100");
  const [usDays, setUsDays] = useState("30");

  const totalCost = (parseInt(maxTrees) || 0) * 0.015;

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

          {/* Configuration Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div>
              <Label htmlFor="maxTrees" className="text-sm font-medium mb-2 block">
                MAX NUMBER OF TREES
              </Label>
              <Input
                id="maxTrees"
                type="number"
                value={maxTrees}
                onChange={(e) => setMaxTrees(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">TOTAL COST</Label>
              <div className="h-10 px-3 py-2 border rounded-md bg-muted flex items-center font-semibold">
                ${totalCost.toFixed(2)}
              </div>
            </div>
            <div>
              <Label htmlFor="usDays" className="text-sm font-medium mb-2 block">
                GIFTS USED
              </Label>
              <Input
                id="usDays"
                type="number"
                value={usDays}
                onChange={(e) => setUsDays(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block invisible">ACTION</Label>
              <Button variant="default" className="w-full h-10">
                DOWNLOAD QR CODE
              </Button>
            </div>
          </div>

          {/* 3-Step Process */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Step 1: Display QR Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    1
                  </span>
                  Display your QR code at an event
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-2">▦</div>
                    <div className="text-lg font-semibold">QR CODE</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Link to Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    2
                  </span>
                  Link to form for contact information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-2">📱</div>
                    <div className="text-lg font-semibold">YOUR LOGO</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Tree Gift by Email */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    3
                  </span>
                  The tree gift is sent by email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-2">🌲</div>
                    <div className="text-lg font-semibold">YOUR LOGO</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alternative Text */}
          <div className="text-center text-sm text-muted-foreground mb-6">
            <p>Alternatively, you can use this link to gift trees by email of add it to your confrence app:</p>
            <a
              href="https://my.trees4trevel.com/testlink/123"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              https://my.trees4trevel.com/testlink/123
            </a>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TreeSwag;
