import { 
  Copy, 
  RefreshCw, 
  Edit, 
  CheckCircle, 
  Eye, 
  Archive,
  Search,
  Download,
  Upload,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const eventData = [
  {
    name: "Event July 2025",
    createdBy: "Trees4Travel",
    client: "ABC Test",
    created: "21 Jul 25",
    startDate: "15 Sep 25",
    endDate: "18 Sep 25",
    attendees: 1000,
    status: "Not created",
    invoiceStatus: "Not created"
  },
  {
    name: "test",
    createdBy: "Trees4Travel", 
    client: "ABC Test",
    created: "07 Jul 25",
    startDate: "07 Jul 25",
    endDate: "07 Jul 25",
    attendees: 10,
    status: "Created",
    invoiceStatus: "Created"
  },
  {
    name: "Cvent Accelerat...",
    createdBy: "Trees4Travel",
    client: "Cvent Accelerat...",
    created: "12 Jun 25",
    startDate: "16 Jul 25", 
    endDate: "16 Jul 25",
    attendees: 483,
    status: "Not created",
    invoiceStatus: "Not created"
  },
  {
    name: "Singapore",
    createdBy: "Trees4Travel",
    client: "Cvent Accelera...",
    created: "12 Jun 25",
    startDate: "11 Jul 25",
    endDate: "11 Jul 25", 
    attendees: 652,
    status: "Not created",
    invoiceStatus: "Not created"
  },
  {
    name: "Corporate Trave...",
    createdBy: "Trees4Travel",
    client: "FC Business Aus...",
    created: "21 May 25",
    startDate: "22 May 25",
    endDate: "23 May 25",
    attendees: 8,
    status: "Created", 
    invoiceStatus: "Created"
  }
];

const ActionIcon = ({ icon: Icon, tooltip }: { icon: any, tooltip: string }) => (
  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title={tooltip}>
    <Icon className="h-4 w-4" />
  </Button>
);

export function EventsTable() {
  const navigate = useNavigate();
  return (
    <div className="bg-metric-card rounded-xl shadow-card border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-hero p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">ZEERO EVENTS</h2>
        <p className="text-lg opacity-90">
          Our events calculator and tool will reduce your emissions and environmental impact.
        </p>
        <p className="text-base opacity-80">
          We combine cutting edge technology with internationally acclaimed calculation methodologies.
        </p>
      </div>

      {/* Controls */}
      <div className="p-6 border-b border-border">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" className="rounded" />
              SHOW ARCHIVED EVENTS
            </label>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">SEARCH EVENTS</span>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input className="pl-10 w-64" placeholder="Search events..." />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-4 font-medium text-sm">NAME</th>
              <th className="text-left p-4 font-medium text-sm">CREATED BY</th>
              <th className="text-left p-4 font-medium text-sm">CLIENT</th>
              <th className="text-left p-4 font-medium text-sm">CREATED</th>
              <th className="text-left p-4 font-medium text-sm">START - END DATE</th>
              <th className="text-center p-4 font-medium text-sm">👥</th>
              <th className="text-center p-4 font-medium text-sm">📋</th>
              <th className="text-center p-4 font-medium text-sm">📊</th>
              <th className="text-left p-4 font-medium text-sm">STATUS</th>
              <th className="text-left p-4 font-medium text-sm">INVOICE STATUS</th>
              <th className="text-center p-4 font-medium text-sm">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {eventData.map((event, index) => (
              <tr key={index} className="border-b border-border hover:bg-muted/25">
                <td className="p-4 font-medium">{event.name}</td>
                <td className="p-4 text-muted-foreground">{event.createdBy}</td>
                <td className="p-4 text-muted-foreground">{event.client}</td>
                <td className="p-4 text-muted-foreground">{event.created}</td>
                <td className="p-4 text-muted-foreground">{event.startDate} - {event.endDate}</td>
                <td className="p-4 text-center">{event.attendees}</td>
                <td className="p-4 text-center">0</td>
                <td className="p-4 text-center">0</td>
                <td className="p-4">
                  <Badge variant={event.status === "Created" ? "default" : "secondary"}>
                    {event.status}
                  </Badge>
                </td>
                <td className="p-4">
                  <Badge variant={event.invoiceStatus === "Created" ? "default" : "secondary"}>
                    {event.invoiceStatus}
                  </Badge>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <ActionIcon icon={Copy} tooltip="Copy event" />
                    <ActionIcon icon={RefreshCw} tooltip="Sync with third party" />
                    <ActionIcon icon={Edit} tooltip="Edit event" />
                    <ActionIcon icon={CheckCircle} tooltip="Approve quote" />
                    <ActionIcon icon={Eye} tooltip="View quote" />
                    <ActionIcon icon={Archive} tooltip="Archive" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Actions */}
      <div className="p-6 bg-muted/25 border-t border-border">
        <div className="flex gap-4">
          <Button variant="outline" className="bg-sidebar-dark text-white hover:bg-sidebar-item">
            <Edit className="w-4 h-4 mr-2" />
          </Button>
          <Button className="bg-sidebar-dark hover:bg-sidebar-item text-white">
            <Download className="w-4 h-4 mr-2" />
            DOWNLOAD REPORT
          </Button>
          <Button className="bg-sidebar-dark hover:bg-sidebar-item text-white">
            <Upload className="w-4 h-4 mr-2" />
            IMPORT FROM CVENT
          </Button>
          <Button 
            className="bg-primary hover:bg-primary/90 text-white"
            onClick={() => navigate("/events/new")}
          >
            <Plus className="w-4 h-4 mr-2" />
            NEW EVENT
          </Button>
        </div>
      </div>
    </div>
  );
}