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
import { Check, X, UserPlus, Trash2, Mail } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

type UserRole = "account_owner" | "billing_manager" | "user";

interface OrganizationUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: "active" | "pending";
}

export default function OrganizationSettings() {
  const [companyName, setCompanyName] = useState("Zeero Group");
  const [urlSegment, setUrlSegment] = useState("zeero-group");
  const [currency, setCurrency] = useState("USD");
  const [referralCode] = useState("abc123");
  const [pricePerTree, setPricePerTree] = useState("25.00");
  const [billingName, setBillingName] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [plan] = useState("Core");
  
  // User management state
  const [users, setUsers] = useState<OrganizationUser[]>([
    { id: "1", email: "john@zeero-group.com", name: "John Smith", role: "account_owner", status: "active" },
    { id: "2", email: "jane@zeero-group.com", name: "Jane Doe", role: "billing_manager", status: "active" },
    { id: "3", email: "mike@zeero-group.com", name: "Mike Johnson", role: "user", status: "active" },
  ]);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<UserRole>("user");

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "account_owner":
        return "bg-primary/10 text-primary border-primary/20";
      case "billing_manager":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "user":
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case "account_owner":
        return "Account Owner";
      case "billing_manager":
        return "Billing Manager";
      case "user":
        return "User";
    }
  };

  const handleInviteUser = () => {
    if (!newUserEmail) {
      toast.error("Please enter an email address");
      return;
    }
    
    if (users.some(u => u.email === newUserEmail)) {
      toast.error("This user is already a member");
      return;
    }

    const newUser: OrganizationUser = {
      id: Date.now().toString(),
      email: newUserEmail,
      name: "",
      role: newUserRole,
      status: "pending",
    };

    setUsers([...users, newUser]);
    setNewUserEmail("");
    setNewUserRole("user");
    toast.success("Invitation sent successfully");
  };

  const handleRemoveUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user?.role === "account_owner") {
      toast.error("Cannot remove the account owner");
      return;
    }
    setUsers(users.filter(u => u.id !== userId));
    toast.success("User removed successfully");
  };

  const handleUpdateRole = (userId: string, newRole: UserRole) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, role: newRole } : u
    ));
    toast.success("Role updated successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Organization Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your organization's configuration and billing</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full max-w-lg grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
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

          <TabsContent value="users" className="mt-6 space-y-6">
            {/* Invite User Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Invite New User
                </CardTitle>
                <CardDescription>
                  Add team members to your organization and assign their roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="new-user-email" className="sr-only">Email</Label>
                    <Input
                      id="new-user-email"
                      type="email"
                      placeholder="Enter email address"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                    />
                  </div>
                  <div className="w-full sm:w-48">
                    <Label htmlFor="new-user-role" className="sr-only">Role</Label>
                    <Select value={newUserRole} onValueChange={(value: UserRole) => setNewUserRole(value)}>
                      <SelectTrigger id="new-user-role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="account_owner">Account Owner</SelectItem>
                        <SelectItem value="billing_manager">Billing Manager</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleInviteUser} className="gap-2">
                    <Mail className="h-4 w-4" />
                    Send Invite
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Users List Card */}
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Manage your organization's users and their permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">
                              {user.name || "Pending invitation"}
                            </p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={user.role}
                            onValueChange={(value: UserRole) => handleUpdateRole(user.id, value)}
                            disabled={user.role === "account_owner"}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="account_owner">Account Owner</SelectItem>
                              <SelectItem value="billing_manager">Billing Manager</SelectItem>
                              <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={user.status === "active" 
                              ? "bg-green-500/10 text-green-600 border-green-500/20" 
                              : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                            }
                          >
                            {user.status === "active" ? "Active" : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveUser(user.id)}
                            disabled={user.role === "account_owner"}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Role Descriptions */}
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium text-foreground mb-3">Role Permissions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-primary">Account Owner</p>
                      <p className="text-muted-foreground">Full access to all features, billing, and user management</p>
                    </div>
                    <div>
                      <p className="font-medium text-amber-600">Billing Manager</p>
                      <p className="text-muted-foreground">Can manage billing, view invoices, and update payment methods</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">User</p>
                      <p className="text-muted-foreground">Can create and manage events, view reports</p>
                    </div>
                  </div>
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

          <TabsContent value="billing" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plans</CardTitle>
                <CardDescription>Choose the plan that best fits your organization's needs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6">
                  {/* Core Plan */}
                  <div className={`border-2 rounded-lg p-6 ${plan === "Core" ? "border-primary bg-primary/5" : "border-border"}`}>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">Core</h3>
                        <div className="mt-2">
                          <span className="text-4xl font-bold text-foreground">$100</span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                      </div>
                      {plan === "Core" ? (
                        <Badge variant="default" className="w-full justify-center">Current Plan</Badge>
                      ) : (
                        <Button variant="outline" className="w-full">Downgrade</Button>
                      )}
                      <Separator />
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>Impact Reports</span>
                        </li>
                        <li className="flex items-center gap-2 text-muted-foreground">
                          <X className="h-4 w-4 text-red-600" />
                          <span>Co-Branded Impact Reports</span>
                        </li>
                        <li className="flex items-center gap-2 text-muted-foreground">
                          <X className="h-4 w-4 text-red-600" />
                          <span>Expo & Logistics</span>
                        </li>
                        <li className="flex items-center gap-2 text-muted-foreground">
                          <X className="h-4 w-4 text-red-600" />
                          <span>White Labelled Reports</span>
                        </li>
                        <li className="flex items-center gap-2 text-muted-foreground">
                          <X className="h-4 w-4 text-red-600" />
                          <span>Multi-User Access</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Pro Plan */}
                  <div className={`border-2 rounded-lg p-6 ${plan === "Pro" ? "border-primary bg-primary/5" : "border-border"}`}>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">Pro</h3>
                        <div className="mt-2">
                          <span className="text-4xl font-bold text-foreground">$400</span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                      </div>
                      {plan === "Pro" ? (
                        <Badge variant="default" className="w-full justify-center">Current Plan</Badge>
                      ) : (
                        <Button className="w-full">Upgrade to Pro</Button>
                      )}
                      <Separator />
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>Impact Reports</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>Co-Branded Impact Reports</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>Expo & Logistics</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>White Labelled Reports</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>Multi-User Access</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Enterprise Plan */}
                  <div className={`border-2 rounded-lg p-6 ${plan === "Enterprise" ? "border-primary bg-primary/5" : "border-border"}`}>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">Enterprise</h3>
                        <div className="mt-2">
                          <span className="text-4xl font-bold text-foreground">$1,000</span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                      </div>
                      {plan === "Enterprise" ? (
                        <Badge variant="default" className="w-full justify-center">Current Plan</Badge>
                      ) : (
                        <Button className="w-full">Upgrade to Enterprise</Button>
                      )}
                      <Separator />
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>Impact Reports</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>Co-Branded Impact Reports</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>Expo & Logistics</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>White Labelled Reports</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>Multi-User Access</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>White Labelled Dashboard</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>Event & Team Analytics</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>Dedicated Support</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>In-Country Measurements</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing Contact</CardTitle>
                <CardDescription>Manage billing information and payment details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
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
