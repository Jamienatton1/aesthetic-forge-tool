import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, User, Building2, Calendar, LogIn } from "lucide-react";
import { format } from "date-fns";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  organisation: string;
  plan: string;
  role: "account_owner" | "billing_manager" | "user";
  lastActive: string;
  createdDate: string;
  recentLogins: string[];
  eventsCreated: number;
}

const mockUsers: UserRecord[] = [
  {
    id: "1", name: "Sarah Johnson", email: "sarah@greenfest.com", organisation: "GreenFest Ltd",
    plan: "Pro", role: "account_owner", lastActive: "2026-03-10", createdDate: "2025-06-15",
    recentLogins: ["2026-03-10", "2026-03-09", "2026-03-07", "2026-03-05", "2026-03-03"],
    eventsCreated: 22,
  },
  {
    id: "2", name: "Tom Baker", email: "tom@greenfest.com", organisation: "GreenFest Ltd",
    plan: "Pro", role: "user", lastActive: "2026-03-08", createdDate: "2025-08-20",
    recentLogins: ["2026-03-08", "2026-03-04", "2026-02-28"],
    eventsCreated: 12,
  },
  {
    id: "3", name: "Lisa Chen", email: "lisa@ecosummit.co", organisation: "EcoSummit Co",
    plan: "Core", role: "account_owner", lastActive: "2026-03-09", createdDate: "2025-11-20",
    recentLogins: ["2026-03-09", "2026-03-05", "2026-03-01"],
    eventsCreated: 2,
  },
  {
    id: "4", name: "James Wright", email: "james@bluehorizon.events", organisation: "Blue Horizon Events",
    plan: "Enterprise", role: "account_owner", lastActive: "2026-03-11", createdDate: "2024-09-01",
    recentLogins: ["2026-03-11", "2026-03-10", "2026-03-09", "2026-03-08", "2026-03-07"],
    eventsCreated: 58,
  },
  {
    id: "5", name: "Amy Park", email: "amy@bluehorizon.events", organisation: "Blue Horizon Events",
    plan: "Enterprise", role: "billing_manager", lastActive: "2026-03-11", createdDate: "2024-10-15",
    recentLogins: ["2026-03-11", "2026-03-09", "2026-03-06"],
    eventsCreated: 34,
  },
  {
    id: "6", name: "Dan Ellis", email: "dan@bluehorizon.events", organisation: "Blue Horizon Events",
    plan: "Enterprise", role: "user", lastActive: "2026-03-10", createdDate: "2025-01-10",
    recentLogins: ["2026-03-10", "2026-03-07"],
    eventsCreated: 20,
  },
  {
    id: "7", name: "Erik Svensson", email: "erik@nordictravel.com", organisation: "Nordic Travel Group",
    plan: "Core", role: "account_owner", lastActive: "2026-03-06", createdDate: "2026-02-28",
    recentLogins: ["2026-03-06", "2026-03-02"],
    eventsCreated: 0,
  },
  {
    id: "8", name: "Maria Garcia", email: "maria@sustainablestays.com", organisation: "Sustainable Stays",
    plan: "Pro", role: "account_owner", lastActive: "2026-03-10", createdDate: "2026-02-14",
    recentLogins: ["2026-03-10", "2026-03-08", "2026-03-05", "2026-03-01"],
    eventsCreated: 4,
  },
  {
    id: "9", name: "Carlos Ruiz", email: "carlos@sustainablestays.com", organisation: "Sustainable Stays",
    plan: "Pro", role: "user", lastActive: "2026-03-09", createdDate: "2026-02-20",
    recentLogins: ["2026-03-09", "2026-03-06"],
    eventsCreated: 1,
  },
  {
    id: "10", name: "Alex Kim", email: "alex@carbonzero.io", organisation: "CarbonZero Inc",
    plan: "Core", role: "account_owner", lastActive: "2026-01-15", createdDate: "2025-03-10",
    recentLogins: ["2026-01-15", "2026-01-10"],
    eventsCreated: 8,
  },
];

const getRoleBadge = (role: UserRecord["role"]) => {
  switch (role) {
    case "account_owner":
      return <Badge className="bg-primary/15 text-primary border-primary/30">Account Owner</Badge>;
    case "billing_manager":
      return <Badge className="bg-chart-tertiary/15 text-chart-tertiary border-chart-tertiary/30">Billing Manager</Badge>;
    case "user":
      return <Badge variant="secondary">User</Badge>;
  }
};

export function OperationsUsers() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [orgFilter, setOrgFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);

  const organisations = [...new Set(mockUsers.map((u) => u.organisation))];

  const filtered = mockUsers.filter((user) => {
    if (search && !user.name.toLowerCase().includes(search.toLowerCase()) && !user.email.toLowerCase().includes(search.toLowerCase())) return false;
    if (roleFilter !== "all" && user.role !== roleFilter) return false;
    if (orgFilter !== "all" && user.organisation !== orgFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={orgFilter} onValueChange={setOrgFilter}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Organisation" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Organisations</SelectItem>
            {organisations.map((org) => (
              <SelectItem key={org} value={org}>{org}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Role" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="account_owner">Account Owner</SelectItem>
            <SelectItem value="billing_manager">Billing Manager</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Organisation</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => (
                <TableRow key={user.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedUser(user)}>
                  <TableCell className="font-medium text-foreground">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{user.email}</TableCell>
                  <TableCell className="text-primary font-medium">{user.organisation}</TableCell>
                  <TableCell>{user.plan}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{format(new Date(user.lastActive), "dd MMM yyyy")}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{format(new Date(user.createdDate), "dd MMM yyyy")}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No users found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Detail Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <DialogContent className="max-w-lg">
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <User className="w-5 h-5 text-primary" />
                  {selectedUser.name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-5 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Email</p>
                    <p className="font-medium text-foreground text-sm">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Organisation</p>
                    <p className="font-medium text-primary text-sm">{selectedUser.organisation}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Plan</p>
                    <p className="font-medium text-foreground text-sm">{selectedUser.plan}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Role</p>
                    <div className="mt-0.5">{getRoleBadge(selectedUser.role)}</div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Events Created</p>
                    <p className="font-medium text-foreground text-sm">{selectedUser.eventsCreated}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Account Created</p>
                    <p className="font-medium text-foreground text-sm">{format(new Date(selectedUser.createdDate), "dd MMM yyyy")}</p>
                  </div>
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <LogIn className="w-4 h-4 text-primary" /> Recent Logins
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1.5">
                    {selectedUser.recentLogins.map((login, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm py-1 border-b last:border-0">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span className="text-foreground">{format(new Date(login), "dd MMM yyyy")}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}