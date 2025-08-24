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
  DollarSign,
  BarChart3,
  Filter,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useState, useMemo } from "react";

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
      <div className="flex items-center gap-3">
        {/* Primary Actions */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 px-4 text-sm font-medium">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View event details</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 px-4 text-sm font-medium">
              <Edit className="h-4 w-4 mr-2" />
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
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>More actions</p>
            </TooltipContent>
          </Tooltip>
          
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="text-sm font-semibold">Data Actions</DropdownMenuLabel>
            <DropdownMenuItem className="text-sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync with Cvent
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm">
              <Copy className="mr-2 h-4 w-4" />
              Copy Event
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm">
              <CreditCard className="mr-2 h-4 w-4" />
              Create Invoice
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm">
              <CreditCard className="mr-2 h-4 w-4" />
              View Invoice
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-sm font-semibold">Event Control</DropdownMenuLabel>
            {!isCreated && (
              <DropdownMenuItem className="text-sm">
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve Event
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="text-sm">
              <FileText className="mr-2 h-4 w-4" />
              Final Emissions Report
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm">
              <BarChart3 className="mr-2 h-4 w-4" />
              Pre-event Emissions Report
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm">
              <QrCode className="mr-2 h-4 w-4" />
              Manage QR Codes
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-destructive text-sm font-semibold">Danger Zone</DropdownMenuLabel>
            <DropdownMenuItem className="text-sm">
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm">
              <Pause className="mr-2 h-4 w-4" />
              Pause
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive text-sm">
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
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [clientFilter, setClientFilter] = useState<string>("all");
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Get unique clients for filter options
  const uniqueClients = useMemo(() => {
    const clients = [...new Set(eventData.map(event => event.client))];
    return clients.sort();
  }, []);
  
  // Filter events based on selected filters
  const filteredEvents = useMemo(() => {
    return eventData.filter(event => {
      const matchesStatus = statusFilter === "all" || 
        (statusFilter === "created" && event.status === "Created") ||
        (statusFilter === "not-created" && event.status === "Not created");
      
      const matchesClient = clientFilter === "all" || event.client === clientFilter;
      
      const matchesInvoiceStatus = invoiceStatusFilter === "all" || 
        (invoiceStatusFilter === "created" && event.invoiceStatus === "Created") ||
        (invoiceStatusFilter === "not-created" && event.invoiceStatus === "Not created");
      
      const matchesSearch = searchQuery === "" || 
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.client.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesStatus && matchesClient && matchesInvoiceStatus && matchesSearch;
    });
  }, [statusFilter, clientFilter, invoiceStatusFilter, searchQuery]);
  
  const clearAllFilters = () => {
    setStatusFilter("all");
    setClientFilter("all");
    setInvoiceStatusFilter("all");
    setSearchQuery("");
  };
  
  return (
    <div className="bg-metric-card rounded-xl shadow-card border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 p-8 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">ZEERO EVENTS</h1>
            <p className="text-xl opacity-90 mb-2">
              Our events calculator and tool will reduce your emissions and environmental impact.
            </p>
            <p className="text-base opacity-80">
              We combine cutting edge technology with internationally acclaimed calculation methodologies.
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-8 border-b border-border">
        <div className="space-y-6">
          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="text-base font-semibold text-foreground">FILTERS:</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Status:</span>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="created">Created</SelectItem>
                  <SelectItem value="not-created">Not Created</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Client:</span>
              <Select value={clientFilter} onValueChange={setClientFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Clients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clients</SelectItem>
                  {uniqueClients.map(client => (
                    <SelectItem key={client} value={client}>{client}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Invoice:</span>
              <Select value={invoiceStatusFilter} onValueChange={setInvoiceStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="created">Created</SelectItem>
                  <SelectItem value="not-created">Not Created</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          </div>
          
          {/* Search and Archive Row */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-3 text-base font-medium">
                <input type="checkbox" className="rounded w-4 h-4" />
                SHOW ARCHIVED EVENTS
              </label>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-base font-semibold text-foreground">SEARCH EVENTS</span>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  className="pl-12 pr-4 py-3 w-80 text-base" 
                  placeholder="Search events..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Results count */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredEvents.length} of {eventData.length} events
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-6 font-semibold text-base text-foreground">NAME</th>
              <th className="text-left p-6 font-semibold text-base text-foreground">CLIENT</th>
              <th className="text-left p-6 font-semibold text-base text-foreground">START - END DATE</th>
              <th className="text-center p-6 font-semibold text-base text-foreground">TREES GIFTED</th>
              <th className="text-left p-6 font-semibold text-base text-foreground">STATUS</th>
              <th className="text-left p-6 font-semibold text-base text-foreground">INVOICE STATUS</th>
              <th className="text-center p-6 font-semibold text-base text-foreground">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event, index) => (
              <tr key={index} className="border-b border-border hover:bg-muted/25 transition-colors">
                <td className="p-6 font-semibold text-base text-foreground">{event.name}</td>
                <td className="p-6 text-base text-muted-foreground">{event.client}</td>
                <td className="p-6 text-base text-muted-foreground">{event.startDate} - {event.endDate}</td>
                <td className="p-6 text-center font-semibold text-base text-foreground">{event.treesGifted.toLocaleString()}</td>
                <td className="p-6">
                  <Badge 
                    variant={event.status === "Created" ? "default" : "secondary"}
                    className="text-sm font-medium px-3 py-1"
                  >
                    {event.status}
                  </Badge>
                </td>
                <td className="p-6">
                  <Badge 
                    variant={event.invoiceStatus === "Created" ? "default" : "secondary"}
                    className="text-sm font-medium px-3 py-1"
                  >
                    {event.invoiceStatus}
                  </Badge>
                </td>
                <td className="p-6">
                  <EventActions event={event} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Actions */}
      <div className="p-8 bg-muted/25 border-t border-border">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-base px-6 py-3 h-auto uppercase tracking-wide">
              <Download className="w-5 h-5 mr-2" />
              DOWNLOAD REPORT
            </Button>
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-base px-6 py-3 h-auto uppercase tracking-wide">
              <Upload className="w-5 h-5 mr-2" />
              IMPORT FROM CVENT
            </Button>
          </div>
          
          <Button 
            onClick={() => navigate("/events/new")}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-4 h-auto uppercase tracking-wide"
          >
            <Plus className="w-5 h-5 mr-2" />
            NEW EVENT
          </Button>
        </div>
      </div>
    </div>
  );
}