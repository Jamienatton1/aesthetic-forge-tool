import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, TrendingDown, TrendingUp, TreePine } from "lucide-react";

interface BalanceEntry {
  id: string;
  date: string;
  description: string;
  amount: string;
  balance: string;
  type: "credit" | "debit";
}

interface MonthGroup {
  month: string;
  year: string;
  summary: string;
  entries: BalanceEntry[];
}

const balanceData: MonthGroup[] = [
  {
    month: "May",
    year: "2023",
    summary: "-390.9 kg",
    entries: [
      { id: "1", date: "May 2023", description: "Transferred Credits to national_grid_uk", amount: "220,878.6 kg", balance: "-390.9 kg", type: "debit" },
      { id: "2", date: "May 2023", description: "Purchased Trees I-347127616", amount: "1,639 (-268,959.9 kg)", balance: "-221,269.5 kg", type: "credit" },
    ]
  },
  {
    month: "April",
    year: "2023",
    summary: "47,690.4 kg",
    entries: [
      { id: "3", date: "Apr 2023", description: "Transferred Credits to national_grid_us", amount: "72,160.4 kg", balance: "47,690.4 kg", type: "credit" },
      { id: "4", date: "Apr 2023", description: "Transferred Credits to national_grid_uk", amount: "390,936.7 kg", balance: "-24,469.9 kg", type: "debit" },
    ]
  },
  {
    month: "September",
    year: "2022",
    summary: "-415,406.6 kg",
    entries: [
      { id: "5", date: "Sep 2022", description: "Transferred Credits to national_grid_us", amount: "485,589.2 kg", balance: "-415,406.6 kg", type: "debit" },
      { id: "6", date: "Sep 2022", description: "Transferred Credits to national_grid_uk", amount: "1,004,424.6 kg", balance: "-900,995.8 kg", type: "debit" },
    ]
  },
  {
    month: "August",
    year: "2022",
    summary: "-1,905,420.4 kg",
    entries: [
      { id: "7", date: "Aug 2022", description: "Transferred Credits to national_grid_us", amount: "265,784.6 kg", balance: "-1,905,420.4 kg", type: "debit" },
      { id: "8", date: "Aug 2022", description: "Transferred Credits to national_grid_uk", amount: "220,668.9 kg", balance: "-2,171,205.0 kg", type: "debit" },
    ]
  },
  {
    month: "July",
    year: "2022",
    summary: "-2,391,873.9 kg",
    entries: [
      { id: "9", date: "Jul 2022", description: "Transferred Credits to national_grid_us", amount: "317,577.0 kg", balance: "-2,391,873.9 kg", type: "debit" },
      { id: "10", date: "Jul 2022", description: "Transferred Credits to national_grid_uk", amount: "387,218.5 kg", balance: "-2,709,450.8 kg", type: "debit" },
      { id: "11", date: "Jul 2022", description: "Purchased Trees Invoice: I-347127411", amount: "13,627 (-2,236,190.7 kg)", balance: "-3,096,669.4 kg", type: "credit" },
      { id: "12", date: "Jul 2022", description: "Purchased Trees Invoice: I-347127409", amount: "7,374 (-1,210,073.4 kg)", balance: "-860,478.7 kg", type: "credit" },
    ]
  },
  {
    month: "June",
    year: "2022",
    summary: "349,594.7 kg",
    entries: [
      { id: "13", date: "Jun 2022", description: "Transferred Credits to national_grid_us", amount: "328,804.8 kg", balance: "349,594.7 kg", type: "credit" },
      { id: "14", date: "Jun 2022", description: "Transferred Credits to national_grid_uk", amount: "478,022.9 kg", balance: "20,790.0 kg", type: "credit" },
    ]
  },
];

const summaryStats = {
  currentBalance: "-390.9 kg",
  totalCredits: "2,456,789.4 kg",
  totalDebits: "4,892,345.2 kg",
  totalTrees: "22,640",
};

export default function Balance() {
  const isNegative = (value: string) => value.startsWith("-");

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          {/* Balance Log Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Tree & Trip CO₂ Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {balanceData.map((group) => (
                    <>
                      {/* Month Summary Row */}
                      <TableRow key={`summary-${group.month}-${group.year}`} className="bg-primary/10 hover:bg-primary/20">
                        <TableCell colSpan={3} className="font-semibold text-primary">
                          {group.month.toUpperCase()} {group.year} SUMMARY (in credit)
                        </TableCell>
                        <TableCell className={`text-right font-bold ${isNegative(group.summary) ? "text-red-600" : "text-green-600"}`}>
                          {group.summary}
                        </TableCell>
                      </TableRow>
                      {/* Individual Entries */}
                      {group.entries.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell className="text-muted-foreground">{entry.date}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {entry.description}
                              {entry.type === "credit" && (
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                  Credit
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{entry.amount}</TableCell>
                          <TableCell className={`text-right font-medium ${isNegative(entry.balance) ? "text-red-600" : "text-green-600"}`}>
                            {entry.balance}
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
