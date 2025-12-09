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
import { Button } from "@/components/ui/button";
import { TreePine, FileDown, MapPin, Clock, CheckCircle2, Map, Copy } from "lucide-react";
import { TreesMap } from "@/components/trees/TreesMap";
import { useToast } from "@/hooks/use-toast";

interface TreeEntry {
  id: string;
  date: string;
  trees: number;
  location: string;
  status: "waiting" | "assigned" | "planted" | "mapped";
}

const treesData: TreeEntry[] = [
  { id: "1", date: "18 MAY 2023", trees: 1639, location: "Marereni & Kurawa, Kenya", status: "planted" },
  { id: "2", date: "16 JUL 2022", trees: 7374, location: "Haiti", status: "planted" },
  { id: "3", date: "16 JUL 2022", trees: 13627, location: "Haiti", status: "planted" },
  { id: "4", date: "19 APR 2022", trees: 10155, location: "Haiti", status: "planted" },
  { id: "5", date: "14 JAN 2022", trees: 2067, location: "Haiti", status: "planted" },
  { id: "6", date: "15 DEC 2021", trees: 7416, location: "Haiti", status: "planted" },
  { id: "7", date: "14 JUL 2021", trees: 1000, location: "Williams Lake Reforestation, British Columbia, Canada", status: "planted" },
];

const statusConfig = {
  waiting: { icon: Clock, label: "Waiting to be Assigned", className: "text-muted-foreground" },
  assigned: { icon: CheckCircle2, label: "Assigned", className: "text-blue-600" },
  planted: { icon: TreePine, label: "Sapling Planted", className: "text-primary" },
  mapped: { icon: Map, label: "Being Mapped", className: "text-amber-600" },
};

export default function Trees() {
  const { toast } = useToast();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + "/forest");
    toast({
      title: "Link copied",
      description: "Forest page link has been copied to clipboard.",
    });
  };

  const totalTrees = treesData.reduce((sum, entry) => sum + entry.trees, 0);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6 space-y-6">
          {/* Main Content - Table and Map side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Trees Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary hover:bg-primary">
                      <TableHead className="w-[100px] text-primary-foreground font-semibold">Date</TableHead>
                      <TableHead className="w-[80px] text-primary-foreground font-semibold">Trees</TableHead>
                      <TableHead className="text-primary-foreground font-semibold">Location</TableHead>
                      <TableHead className="w-[60px] text-center text-primary-foreground font-semibold"></TableHead>
                      <TableHead className="w-[60px] text-center text-primary-foreground font-semibold">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {treesData.map((entry) => {
                      const StatusIcon = statusConfig[entry.status].icon;
                      return (
                        <TableRow key={entry.id}>
                          <TableCell className="font-medium text-muted-foreground text-sm">{entry.date}</TableCell>
                          <TableCell className="font-semibold">{entry.trees.toLocaleString()}</TableCell>
                          <TableCell className="text-sm">{entry.location}</TableCell>
                          <TableCell className="text-center">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <FileDown className="h-4 w-4 text-muted-foreground hover:text-primary" />
                            </Button>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center">
                              <StatusIcon className={`h-5 w-5 ${statusConfig[entry.status].className}`} />
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Map Visualization */}
            <TreesMap />
          </div>

          {/* Status Key */}
          <Card>
            <CardContent className="py-4">
              <div className="flex flex-wrap items-center justify-center gap-6">
                <span className="text-sm font-semibold text-muted-foreground">STATUS KEY:</span>
                {Object.entries(statusConfig).map(([key, config]) => {
                  const Icon = config.icon;
                  return (
                    <div key={key} className="flex items-center gap-2">
                      <Icon className={`h-4 w-4 ${config.className}`} />
                      <span className="text-sm text-muted-foreground">{config.label}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button className="bg-primary hover:bg-primary/90">
              <Map className="mr-2 h-4 w-4" />
              Forest Page
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Click to view or copy link to share</span>
              <Button variant="outline" size="icon" onClick={handleCopyLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}