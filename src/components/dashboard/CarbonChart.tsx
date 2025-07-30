import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: 'Jan', '2023': 15, '2024': 8, '2025': 12 },
  { month: 'Feb', '2023': 25, '2024': 18, '2025': 22 },
  { month: 'Mar', '2023': 35, '2024': 28, '2025': 31 },
  { month: 'Apr', '2023': 95, '2024': 85, '2025': 89 },
  { month: 'May', '2023': 45, '2024': 38, '2025': 42 },
  { month: 'Jun', '2023': 25, '2024': 22, '2025': 24 },
  { month: 'Jul', '2023': 15, '2024': 12, '2025': 14 },
  { month: 'Aug', '2023': 8, '2024': 6, '2025': 7 },
  { month: 'Sep', '2023': 12, '2024': 10, '2025': 11 },
  { month: 'Oct', '2023': 28, '2024': 25, '2025': 27 },
  { month: 'Nov', '2023': 95, '2024': 88, '2025': 92 },
  { month: 'Dec', '2023': 5, '2024': 4, '2025': 5 },
];

export function CarbonChart() {
  return (
    <div className="bg-metric-card rounded-xl p-6 shadow-card border border-border">
      <h3 className="text-xl font-semibold text-foreground mb-6">
        Yearly Carbon Emissions (tn)
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="2023" 
              stroke="hsl(var(--chart-primary))" 
              strokeWidth={3}
              dot={{ fill: "hsl(var(--chart-primary))", strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="2024" 
              stroke="hsl(var(--chart-secondary))" 
              strokeWidth={3}
              dot={{ fill: "hsl(var(--chart-secondary))", strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="2025" 
              stroke="hsl(var(--chart-tertiary))" 
              strokeWidth={3}
              dot={{ fill: "hsl(var(--chart-tertiary))", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}