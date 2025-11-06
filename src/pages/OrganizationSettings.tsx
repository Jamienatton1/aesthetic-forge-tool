import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function OrganizationSettings() {
  const [companyName, setCompanyName] = useState("Zeero Group");
  const [urlSegment, setUrlSegment] = useState("zeero-group");
  const [currency, setCurrency] = useState("USD");
  const [referralCode] = useState("abc123");
  const [pricePerTree, setPricePerTree] = useState("25.00");
  const [billingName, setBillingName] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [plan] = useState("Pro");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Organization Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your organization's configuration and billing</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="contributions">Contributions</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Update your organization's basic information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter company name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url-segment">URL Segment</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">www.zeero-group.com/</span>
                    <Input
                      id="url-segment"
                      value={urlSegment}
                      onChange={(e) => setUrlSegment(e.target.value)}
                      placeholder="company-name"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="referral-code">Referral Code</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="referral-code"
                      value={referralCode}
                      readOnly
                      className="bg-muted"
                    />
                    <Button variant="outline" onClick={() => navigator.clipboard.writeText(referralCode)}>
                      Copy
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contributions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Contribution Pricing</CardTitle>
                <CardDescription>
                  Manage prices per tree payable by organizations to offset their CO2 emissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="price-per-tree">Price per Tree ({currency})</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{currency === "USD" ? "$" : currency === "EUR" ? "€" : "£"}</span>
                    <Input
                      id="price-per-tree"
                      type="number"
                      step="0.01"
                      value={pricePerTree}
                      onChange={(e) => setPricePerTree(e.target.value)}
                      placeholder="25.00"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is the amount organizations will pay per tree to offset their carbon emissions
                  </p>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <h4 className="font-medium text-foreground">Pricing Overview</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">10 trees</p>
                      <p className="font-semibold">{currency === "USD" ? "$" : currency === "EUR" ? "€" : "£"}{(parseFloat(pricePerTree) * 10).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">100 trees</p>
                      <p className="font-semibold">{currency === "USD" ? "$" : currency === "EUR" ? "€" : "£"}{(parseFloat(pricePerTree) * 100).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">500 trees</p>
                      <p className="font-semibold">{currency === "USD" ? "$" : currency === "EUR" ? "€" : "£"}{(parseFloat(pricePerTree) * 500).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">1,000 trees</p>
                      <p className="font-semibold">{currency === "USD" ? "$" : currency === "EUR" ? "€" : "£"}{(parseFloat(pricePerTree) * 1000).toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button>Update Pricing</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Financial Details</CardTitle>
                <CardDescription>Manage billing information and view your subscription plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">Current Plan</h4>
                      <p className="text-sm text-muted-foreground">Your organization's subscription tier</p>
                    </div>
                    <Badge variant="default" className="text-lg px-4 py-1">
                      {plan}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Billing Contact</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="billing-name">Full Name</Label>
                    <Input
                      id="billing-name"
                      value={billingName}
                      onChange={(e) => setBillingName(e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billing-email">Email for Invoicing</Label>
                    <Input
                      id="billing-email"
                      type="email"
                      value={billingEmail}
                      onChange={(e) => setBillingEmail(e.target.value)}
                      placeholder="billing@company.com"
                    />
                    <p className="text-sm text-muted-foreground">
                      Invoices and payment receipts will be sent to this email
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billing-address">Billing Address</Label>
                    <Input
                      id="billing-address"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="New York" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postal-code">Postal Code</Label>
                      <Input id="postal-code" placeholder="10001" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select>
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Billing Details</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
