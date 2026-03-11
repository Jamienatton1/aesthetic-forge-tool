import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, Calendar, Activity } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart } from "recharts";

const signupMetrics = {
  last7Days: 12,
  last30Days: 47,
};

const signupData = [
  { month: "Oct", value: 5 },
  { month: "Nov", value: 7 },
  { month: "Dec", value: 4 },
  { month: "Jan", value: 8 },
  { month: "Feb", value: 9 },
  { month: "Mar", value: 12 },
];

const activeTrialsData = [
  { month: "Oct", value: 12 },
  { month: "Nov", value: 14 },
  { month: "Dec", value: 16 },
  { month: "Jan", value: 20 },
  { month: "Feb", value: 16 },
  { month: "Mar", value: 18 },
];

const trialMetrics = {
  activeTrials: 18,
  expiring3Days: 5,
  expiring7Days: 9,
};

const mrrData = [
  { month: "Oct", value: 2100 },
  { month: "Nov", value: 2650 },
  { month: "Dec", value: 3100 },
  { month: "Jan", value: 3480 },
  { month: "Feb", value: 4200 },
  { month: "Mar", value: 4830 },
];

const arrData = [
  { month: "Oct", value: 25200 },
  { month: "Nov", value: 31800 },
  { month: "Dec", value: 37200 },
  { month: "Jan", value: 41760 },
  { month: "Feb", value: 50400 },
  { month: "Mar", value: 57960 },
];

const payingOrgsData = [
  { month: "Oct", value: 14 },
  { month: "Nov", value: 18 },
  { month: "Dec", value: 22 },
  { month: "Jan", value: 26 },
  { month: "Feb", value: 30 },
  { month: "Mar", value: 34 },
];

const activationMetrics = {
  totalEvents: 1247,
  eventsLast7: 89,
  eventsLast30: 312,
  orgsWithEvents: 28,
  orgsWithoutEvents: 24,
};

const expiringTrials = [
  { name: "GreenFest Ltd", daysLeft: 1 },
  { name: "EcoSummit Co", daysLeft: 1 },
  { name: "Blue Horizon Events", daysLeft: 1 },
  { name: "Nordic Travel Group", daysLeft: 2 },
  { name: "Sustainable Stays", daysLeft: 3 },
];

export function OperationsDashboard() {
  return (
    <div className="space-y-6">
      {/* Signup & Trial Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TrendChart 
          title="Signups" 
          data={signupData} 
          currentValue={`${signupMetrics.last30Days} this month`} 
          color="hsl(220, 70%, 55%)"
          showTotal
        />
        <TrendChart 
          title="Active Trials" 
          data={activeTrialsData} 
          currentValue={`${trialMetrics.activeTrials} active now`} 
          color="hsl(30, 95%, 55%)"
        />
      </div>

      {/* Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RevenueChart title="MRR" data={mrrData} currentValue="£4,830" color="hsl(160, 60%, 45%)" prefix="£" />
        <RevenueChart title="ARR" data={arrData} currentValue="£57,960" color="hsl(200, 60%, 50%)" prefix="£" />
        <RevenueChart title="Paying Organisations" data={payingOrgsData} currentValue="34" color="hsl(280, 65%, 55%)" />
      </div>

      {/* Activation & Trials Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Activation */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Product Activation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total events (all time)</span>
              <span className="font-medium text-foreground">{activationMetrics.totalEvents.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Events (last 7 days)</span>
              <span className="font-medium text-foreground">{activationMetrics.eventsLast7}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Events (last 30 days)</span>
              <span className="font-medium text-foreground">{activationMetrics.eventsLast30}</span>
            </div>
            <div className="border-t pt-3 mt-3 flex justify-between text-sm">
              <span className="text-muted-foreground">Orgs with ≥1 event</span>
              <span className="font-medium text-primary">{activationMetrics.orgsWithEvents}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Orgs with no events</span>
              <span className="font-medium text-destructive">{activationMetrics.orgsWithoutEvents}</span>
            </div>
          </CardContent>
        </Card>

        {/* Expiring Trials */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Expiring Trials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {expiringTrials.map((trial) => (
              <div key={trial.name} className="flex items-center justify-between text-sm py-1.5 border-b last:border-0">
                <span className="text-muted-foreground font-medium">{trial.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {trial.daysLeft}d left
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TrendChart({ title, data, currentValue, color, showTotal }: {
  title: string;
  data: { month: string; value: number }[];
  currentValue: string;
  color: string;
  showTotal?: boolean;
}) {
  const total = showTotal ? data.reduce((sum, d) => sum + d.value, 0) : null;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <TrendingUp className="w-4 h-4 text-primary" />
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold text-foreground">{currentValue}</p>
          {total !== null && (
            <span className="text-sm text-muted-foreground">{total} total</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                <stop offset="100%" stopColor={color} stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: 12 }}
              cursor={{ fill: "hsl(var(--muted))" }}
            />
            <Bar dataKey="value" fill={`url(#gradient-${title})`} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function RevenueChart({ title, data, currentValue, color, prefix }: {
  title: string;
  data: { month: string; value: number }[];
  currentValue: string;
  color: string;
  prefix?: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <TrendingUp className="w-4 h-4 text-primary" />
        </div>
        <p className="text-2xl font-bold text-foreground">{currentValue}</p>
      </CardHeader>
      <CardContent className="pb-3">
        <ResponsiveContainer width="100%" height={120}>
          <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(120, 20%, 90%)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => prefix ? `${prefix}${(v / 1000).toFixed(0)}k` : `${v}`} />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "1px solid hsl(120, 20%, 90%)", fontSize: 12 }}
              formatter={(value: number) => [prefix ? `${prefix}${value.toLocaleString()}` : value, title]}
            />
            <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fill={`url(#gradient-${title})`} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
