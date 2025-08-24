import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge as StatusBadge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Gift, ShoppingBag, Shirt, Badge, Droplets, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";

interface PromotionItem {
  id: string;
  name: string;
  icon: React.ElementType;
  quantity: number;
  pricePerUnit: number;
  co2Factor: number; // kg CO2e per unit
}

interface EventPromotion {
  eventId: string;
  eventName: string;
  client: string;
  startDate: string;
  endDate: string;
  status: string;
  invoiceStatus: string;
  items: PromotionItem[];
}

export default function PromotionItems() {
  const navigate = useNavigate();
  
  const [eventPromotions, setEventPromotions] = useState<EventPromotion[]>([
    {
      eventId: '1',
      eventName: 'Software Expo - HMRC',
      client: 'HMRC',
      startDate: '15 Sep 25',
      endDate: '18 Sep 25',
      status: 'Created',
      invoiceStatus: 'Created',
      items: [
        { id: 'lanyards', name: 'Lanyards', icon: Badge, quantity: 100, pricePerUnit: 2.50, co2Factor: 0.05 },
        { id: 'bags', name: 'Bags', icon: ShoppingBag, quantity: 50, pricePerUnit: 8.00, co2Factor: 0.2 },
        { id: 'clothes', name: 'Clothes', icon: Shirt, quantity: 25, pricePerUnit: 15.00, co2Factor: 2.5 },
        { id: 'bottles', name: 'Water Bottles', icon: Droplets, quantity: 150, pricePerUnit: 5.00, co2Factor: 0.1 }
      ]
    },
    {
      eventId: '2',
      eventName: 'Tech Conference 2025',
      client: 'ABC Test',
      startDate: '07 Jul 25',
      endDate: '07 Jul 25',
      status: 'Not created',
      invoiceStatus: 'Not created',
      items: [
        { id: 'lanyards', name: 'Lanyards', icon: Badge, quantity: 200, pricePerUnit: 2.00, co2Factor: 0.05 },
        { id: 'bags', name: 'Bags', icon: ShoppingBag, quantity: 0, pricePerUnit: 0, co2Factor: 0.2 },
        { id: 'clothes', name: 'Clothes', icon: Shirt, quantity: 50, pricePerUnit: 12.00, co2Factor: 2.5 },
        { id: 'bottles', name: 'Water Bottles', icon: Droplets, quantity: 200, pricePerUnit: 4.50, co2Factor: 0.1 }
      ]
    },
    {
      eventId: '3',
      eventName: 'Corporate Travel Expo',
      client: 'FC Business Australia',
      startDate: '22 May 25',
      endDate: '23 May 25',
      status: 'Created',
      invoiceStatus: 'Pending',
      items: [
        { id: 'lanyards', name: 'Lanyards', icon: Badge, quantity: 75, pricePerUnit: 3.00, co2Factor: 0.05 },
        { id: 'bags', name: 'Bags', icon: ShoppingBag, quantity: 40, pricePerUnit: 10.00, co2Factor: 0.2 },
        { id: 'clothes', name: 'Clothes', icon: Shirt, quantity: 0, pricePerUnit: 0, co2Factor: 2.5 },
        { id: 'bottles', name: 'Water Bottles', icon: Droplets, quantity: 100, pricePerUnit: 6.00, co2Factor: 0.1 }
      ]
    }
  ]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [clientFilter, setClientFilter] = useState('all');
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState('all');

  // Filter events based on search and filters
  const filteredEvents = useMemo(() => {
    return eventPromotions.filter(event => {
      const matchesSearch = event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.client.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
      const matchesClient = clientFilter === 'all' || event.client === clientFilter;
      const matchesInvoiceStatus = invoiceStatusFilter === 'all' || event.invoiceStatus === invoiceStatusFilter;
      
      return matchesSearch && matchesStatus && matchesClient && matchesInvoiceStatus;
    });
  }, [eventPromotions, searchTerm, statusFilter, clientFilter, invoiceStatusFilter]);

  // Get unique values for filter dropdowns
  const uniqueClients = useMemo(() => {
    return [...new Set(eventPromotions.map(event => event.client))];
  }, [eventPromotions]);

  const updateItem = (eventId: string, itemId: string, field: 'quantity' | 'pricePerUnit', value: number) => {
    setEventPromotions(prev => prev.map(event => 
      event.eventId === eventId 
        ? {
            ...event,
            items: event.items.map(item => 
              item.id === itemId ? { ...item, [field]: value } : item
            )
          }
        : event
    ));
  };

  const getEventTotals = (items: PromotionItem[]) => {
    return items.reduce((acc, item) => ({
      totalItems: acc.totalItems + item.quantity,
      totalCost: acc.totalCost + (item.quantity * item.pricePerUnit),
      totalCO2e: acc.totalCO2e + (item.quantity * item.co2Factor)
    }), { totalItems: 0, totalCost: 0, totalCO2e: 0 });
  };

  const handleSubmit = () => {
    console.log("Promotion items data:", eventPromotions);
    navigate("/events/questionnaire");
  };

  return (
    <div className="min-h-screen bg-dashboard">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 p-8 text-primary-foreground">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Gift className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Promotion Items</h1>
                <p className="text-lg text-primary-foreground/90">
                  Enter details about promotional materials and giveaways
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Filters */}
              <Card className="border-2">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <div className="md:col-span-2 lg:col-span-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search events..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Created">Created</SelectItem>
                        <SelectItem value="Not created">Not Created</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={clientFilter} onValueChange={setClientFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Clients</SelectItem>
                        {uniqueClients.map(client => (
                          <SelectItem key={client} value={client}>{client}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={invoiceStatusFilter} onValueChange={setInvoiceStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Invoice Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Invoice Status</SelectItem>
                        <SelectItem value="Created">Created</SelectItem>
                        <SelectItem value="Not created">Not Created</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Events List */}
              {filteredEvents.map((event) => {
                const totals = getEventTotals(event.items);
                
                return (
                  <Card key={event.eventId} className="border-2">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-2xl">{event.eventName}</CardTitle>
                          <p className="text-lg text-muted-foreground">
                            {event.client} • {event.startDate} - {event.endDate}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <StatusBadge variant={event.status === "Created" ? "default" : "secondary"}>
                            {event.status}
                          </StatusBadge>
                          <StatusBadge variant={event.invoiceStatus === "Created" ? "default" : "secondary"}>
                            Invoice: {event.invoiceStatus}
                          </StatusBadge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-6">
                        {/* Promotion Items Table */}
                        <div>
                          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Gift className="w-6 h-6" />
                            Promotional Materials
                          </h3>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="font-semibold">Item Type</TableHead>
                                <TableHead className="font-semibold">Quantity</TableHead>
                                <TableHead className="font-semibold">Price Per Unit (£)</TableHead>
                                <TableHead className="font-semibold">Total (£)</TableHead>
                                <TableHead className="font-semibold">CO₂e (Kg)</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {event.items.map((item) => {
                                const Icon = item.icon;
                                const total = item.quantity * item.pricePerUnit;
                                const co2e = item.quantity * item.co2Factor;
                                
                                return (
                                  <TableRow key={item.id}>
                                    <TableCell className="font-medium">
                                      <div className="flex items-center gap-3">
                                        <Icon className="w-4 h-4 text-primary" />
                                        <span>{item.name}</span>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <Input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateItem(event.eventId, item.id, 'quantity', Number(e.target.value) || 0)}
                                        className="w-20 h-8"
                                        placeholder="0"
                                        min="0"
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Input
                                        type="number"
                                        step="0.01"
                                        value={item.pricePerUnit}
                                        onChange={(e) => updateItem(event.eventId, item.id, 'pricePerUnit', Number(e.target.value) || 0)}
                                        className="w-24 h-8"
                                        placeholder="0.00"
                                        min="0"
                                      />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                      £{total.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                      {co2e.toFixed(3)}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </div>

                        {/* Event Summary */}
                        <div className="bg-muted/50 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-2xl font-bold text-primary">
                                {totals.totalItems}
                              </div>
                              <div className="text-sm text-muted-foreground">Total Items</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-primary">
                                £{totals.totalCost.toFixed(2)}
                              </div>
                              <div className="text-sm text-muted-foreground">Total Cost</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-primary">
                                {totals.totalCO2e.toFixed(3)}
                              </div>
                              <div className="text-sm text-muted-foreground">Total CO₂e (Kg)</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {/* Navigation */}
              <div className="flex justify-between">
                <Button
                  onClick={() => navigate(-1)}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 h-auto"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  BACK
                </Button>
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="text-lg px-8 py-4 h-auto font-semibold"
                >
                  CONTINUE
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}