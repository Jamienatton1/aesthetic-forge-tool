import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: 'Transportation', value: 65, color: 'hsl(var(--chart-secondary))' },
  { name: 'Energy', value: 20, color: 'hsl(var(--chart-primary))' },
  { name: 'Waste', value: 10, color: 'hsl(var(--chart-tertiary))' },
  { name: 'Other', value: 5, color: 'hsl(var(--muted))' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-metric-card border border-border rounded-lg p-3 shadow-card">
        <p className="text-sm font-medium text-foreground">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          {data.value}% ({(data.value * 0.17).toFixed(2)} tn)
        </p>
      </div>
    );
  }
  return null;
};

export function EmissionsPieChart() {
  return (
    <div className="bg-metric-card rounded-xl p-6 shadow-card border border-border">
      <h3 className="text-xl font-semibold text-foreground mb-6">
        Last Year Carbon Emissions by Type
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value, entry: any) => (
                <span style={{ color: entry.color }}>
                  {value}: {entry.payload.value}%
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}