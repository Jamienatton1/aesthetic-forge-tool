import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, AlertTriangle, Building2 } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format } from "date-fns";

const revenueOverview = {
  mrr: 4830,
  arr: 57960,
  payingOrgs: 34,
  trialOrgs: 18,
};

const mrrTrend = [
  { month: "Oct", value: 2100 },
  { month: "Nov", value: 2650 },
  { month: "Dec", value: 3100 },
  { month: "Jan", value: 3480 },
  { month: "Feb", value: 4200 },
  { month: "Mar", value: 4830 },
];

const revenueByPlan = [
  { plan: "Core", mrr: 1380, orgs: 20 },
  { plan: "Pro", mrr: 1600, orgs: 8 },
  { plan: "Enterprise", mrr: 1850, orgs: 6 },
];

const failedPayments = [
  { organisation: "TravelGreen Ltd", amount: 69, date: "2026-03-08" },
  { organisation: "EventCo Global", amount: 400, date: "2026-03-05" },
];

const pastDueInvoices = [
  { organisation: "Summit Events UK", amount: 69, daysOverdue: 12 },
  { organisation: "PlanetFirst Travel", amount: 400, daysOverdue: 5 },
  { organisation: "GreenPath Corp", amount: 69, daysOverdue: 2 },
];

export function OperationsRevenue() {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewCard label="MRR" value={`£${revenueOverview.mrr.toLocaleString()}`} />
        <OverviewCard label="ARR" value={`£${revenueOverview.arr.toLocaleString()}`} />
        <OverviewCard label="Paying Organisations" value={revenueOverview.payingOrgs} />
        <OverviewCard label="On Free Trial" value={revenueOverview.trialOrgs} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MRR Trend */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              MRR Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={mrrTrend} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(160, 60%, 45%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(160, 60%, 45%)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(120, 20%, 90%)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(v) => `£${(v / 1000).toFixed(1)}k`} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(120, 20%, 90%)", fontSize: 12 }} formatter={(value: number) => [`£${value.toLocaleString()}`, "MRR"]} />
                <Area type="monotone" dataKey="value" stroke="hsl(160, 60%, 45%)" strokeWidth={2} fill="url(#mrrGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue by Plan */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              Revenue by Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={revenueByPlan} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(120, 20%, 90%)" vertical={false} />
                <XAxis dataKey="plan" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(v) => `£${v}`} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(120, 20%, 90%)", fontSize: 12 }} formatter={(value: number) => [`£${value.toLocaleString()}`, "MRR"]} />
                <Bar dataKey="mrr" fill="hsl(160, 60%, 45%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-around mt-3 text-sm">
              {revenueByPlan.map((p) => (
                <div key={p.plan} className="text-center">
                  <p className="text-muted-foreground text-xs">{p.plan}</p>
                  <p className="font-medium text-foreground">{p.orgs} orgs</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Failed Payments */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              Failed Payments
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organisation</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {failedPayments.map((p, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium text-primary">{p.organisation}</TableCell>
                    <TableCell className="text-foreground">£{p.amount}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{format(new Date(p.date), "dd MMM yyyy")}</TableCell>
                  </TableRow>
                ))}
                {failedPayments.length === 0 && (
                  <TableRow><TableCell colSpan={3} className="text-center py-6 text-muted-foreground">No failed payments</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Past Due Invoices */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              Past-Due Invoices
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organisation</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Overdue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastDueInvoices.map((inv, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium text-primary">{inv.organisation}</TableCell>
                    <TableCell className="text-foreground">£{inv.amount}</TableCell>
                    <TableCell>
                      <Badge variant={inv.daysOverdue > 7 ? "destructive" : "secondary"} className="text-xs">
                        {inv.daysOverdue}d overdue
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {pastDueInvoices.length === 0 && (
                  <TableRow><TableCell colSpan={3} className="text-center py-6 text-muted-foreground">No past-due invoices</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function OverviewCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">{label}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </CardContent>
    </Card>
  );
}