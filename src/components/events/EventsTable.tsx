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
  Plus,
  MoreHorizontal,
  FileText,
  CreditCard,
  QrCode,
  Pause,
  Trash2,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

const eventData = [
  {
    name: "Event July 2025",
    client: "ABC Test",
    startDate: "15 Sep 25",
    endDate: "18 Sep 25",
    treesGifted: 2500,
    status: "Not created",
    invoiceStatus: "Not created"
  },
  {
    name: "test",
    client: "ABC Test",
    startDate: "07 Jul 25",
    endDate: "07 Jul 25",
    treesGifted: 25,
    status: "Created",
    invoiceStatus: "Created"
  },
  {
    name: "Cvent Accelerat...",
    client: "Cvent Accelerat...",
    startDate: "16 Jul 25", 
    endDate: "16 Jul 25",
    treesGifted: 1208,
    status: "Not created",
    invoiceStatus: "Not created"
  },
  {
    name: "Singapore",
    client: "Cvent Accelera...",
    startDate: "11 Jul 25",
    endDate: "11 Jul 25", 
    treesGifted: 1630,
    status: "Not created",
    invoiceStatus: "Not created"
  },
  {
    name: "Corporate Trave...",
    client: "FC Business Aus...",
    startDate: "22 May 25",
    endDate: "23 May 25",
    treesGifted: 20,
    status: "Created", 
    invoiceStatus: "Created"
  }
];

const EventActions = ({ event }: { event: typeof eventData[0] }) => {
  const isCreated = event.status === "Created";
  const hasInvoice = event.invoiceStatus === "Created";

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        {/* Primary Actions */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 px-3">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View event details</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 px-3">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit event information</p>
          </TooltipContent>
        </Tooltip>

        {/* More Actions Dropdown */}
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>More actions</p>
            </TooltipContent>
          </Tooltip>
          
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Data Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync with Cvent
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Copy Event
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              Emissions Report
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              {hasInvoice ? "View Invoice" : "Create Invoice"}
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Event Control</DropdownMenuLabel>
            {!isCreated && (
              <DropdownMenuItem>
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve Event
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <DollarSign className="mr-2 h-4 w-4" />
              Quote
            </DropdownMenuItem>
            <DropdownMenuItem>
              <QrCode className="mr-2 h-4 w-4" />
              Manage QR Codes
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-destructive">Danger Zone</DropdownMenuLabel>
            <DropdownMenuItem>
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pause className="mr-2 h-4 w-4" />
              Pause
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TooltipProvider>
  );
};

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
              <th className="text-left p-4 font-medium text-sm">CLIENT</th>
              <th className="text-left p-4 font-medium text-sm">START - END DATE</th>
              <th className="text-center p-4 font-medium text-sm">TREES GIFTED</th>
              <th className="text-left p-4 font-medium text-sm">STATUS</th>
              <th className="text-left p-4 font-medium text-sm">INVOICE STATUS</th>
              <th className="text-center p-4 font-medium text-sm">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {eventData.map((event, index) => (
              <tr key={index} className="border-b border-border hover:bg-muted/25">
                <td className="p-4 font-medium">{event.name}</td>
                <td className="p-4 text-muted-foreground">{event.client}</td>
                <td className="p-4 text-muted-foreground">{event.startDate} - {event.endDate}</td>
                <td className="p-4 text-center font-medium">{event.treesGifted.toLocaleString()}</td>
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
                  <EventActions event={event} />
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