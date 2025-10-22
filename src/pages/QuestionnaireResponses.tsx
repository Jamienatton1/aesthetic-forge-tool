import { useState, useMemo } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { EventsHeader } from "@/components/events/EventsHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Download, 
  FileSpreadsheet, 
  Search, 
  Calendar,
  Users,
  TrendingUp,
  Trash2
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

// Mock data for responses
const mockResponses = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 234 567 8900",
    responseDate: "2025-01-15 10:30 AM",
    status: "Complete",
    answers: {
      transportation: "Car",
      meals: "Meat",
      accommodation: "Hotel"
    },
    emissions: 45.2
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 234 567 8901",
    responseDate: "2025-01-15 11:45 AM",
    status: "Complete",
    answers: {
      transportation: "Public Transport",
      meals: "Vegetarian",
      accommodation: "Apartment"
    },
    emissions: 12.8
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "m.chen@example.com",
    phone: "+1 234 567 8902",
    responseDate: "2025-01-15 02:15 PM",
    status: "Complete",
    answers: {
      transportation: "Walk/Bike",
      meals: "Vegan",
      accommodation: "Not Staying Over"
    },
    emissions: 3.5
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 234 567 8903",
    responseDate: "2025-01-16 09:20 AM",
    status: "Complete",
    answers: {
      transportation: "Car",
      meals: "Meat",
      accommodation: "Hotel"
    },
    emissions: 52.1
  },
  {
    id: 5,
    name: "David Wilson",
    email: "d.wilson@example.com",
    phone: "+1 234 567 8904",
    responseDate: "2025-01-16 03:45 PM",
    status: "Partial",
    answers: {
      transportation: "Public Transport",
      meals: "Vegetarian",
      accommodation: "Hotel"
    },
    emissions: 28.4
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    phone: "+1 234 567 8905",
    responseDate: "2025-01-17 08:10 AM",
    status: "Complete",
    answers: {
      transportation: "Walk/Bike",
      meals: "Vegetarian",
      accommodation: "Not Staying Over"
    },
    emissions: 5.2
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "rob.taylor@example.com",
    phone: "+1 234 567 8906",
    responseDate: "2025-01-17 01:30 PM",
    status: "Complete",
    answers: {
      transportation: "Car",
      meals: "Meat",
      accommodation: "Apartment"
    },
    emissions: 38.7
  },
  {
    id: 8,
    name: "Jennifer Martinez",
    email: "j.martinez@example.com",
    phone: "+1 234 567 8907",
    responseDate: "2025-01-18 10:00 AM",
    status: "Complete",
    answers: {
      transportation: "Public Transport",
      meals: "Vegetarian",
      accommodation: "Hotel"
    },
    emissions: 24.6
  }
];

const QuestionnaireResponses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [responses, setResponses] = useState(mockResponses);

  const handleRemoveResponse = (id: number) => {
    setResponses(responses.filter(r => r.id !== id));
  };

  // Calculate statistics
  const totalResponses = responses.length;
  const totalAttendees = 100; // Mock total expected attendees
  const responseRate = Math.round((totalResponses / totalAttendees) * 100);
  const completeResponses = responses.filter(r => r.status === "Complete").length;

  // Transportation data for chart
  const transportationData = useMemo(() => {
    const counts: Record<string, number> = {};
    responses.forEach(response => {
      const transport = response.answers.transportation;
      counts[transport] = (counts[transport] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [responses]);

  // Meals data for chart
  const mealsData = useMemo(() => {
    const counts: Record<string, number> = {};
    responses.forEach(response => {
      const meal = response.answers.meals;
      counts[meal] = (counts[meal] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [responses]);

  // Accommodation data for chart
  const accommodationData = useMemo(() => {
    const counts: Record<string, number> = {};
    responses.forEach(response => {
      const accommodation = response.answers.accommodation;
      counts[accommodation] = (counts[accommodation] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [responses]);

  // Total emissions
  const totalEmissions = responses.reduce((sum, r) => sum + r.emissions, 0).toFixed(1);
  const avgEmissions = (responses.reduce((sum, r) => sum + r.emissions, 0) / responses.length).toFixed(1);

  // Filtered responses
  const filteredResponses = useMemo(() => {
    return responses.filter(response => {
      const matchesSearch = searchQuery === "" || 
        response.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        response.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || 
        response.status.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter, responses]);

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <EventsHeader 
          title="Questionnaire Responses"
          subtitle="View and analyze questionnaire submissions"
        />
        
        <main className="flex-1 overflow-auto p-8">
          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalResponses}</div>
                <p className="text-xs text-muted-foreground">
                  of {totalAttendees} attendees
                </p>
                <Progress value={responseRate} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{responseRate}%</div>
                <p className="text-xs text-muted-foreground">
                  {completeResponses} complete responses
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="contacts" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="contacts">Contact Details</TabsTrigger>
              <TabsTrigger value="responses">Question Responses</TabsTrigger>
            </TabsList>

            {/* Contact Details Tab */}
            <TabsContent value="contacts" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Respondent Contact Information</CardTitle>
                      <CardDescription>
                        View and export contact details for all respondents
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        CSV
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        Excel
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Filters */}
                  <div className="flex gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="complete">Complete</SelectItem>
                        <SelectItem value="partial">Partial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Contact Table */}
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left p-4 font-semibold">Name</th>
                          <th className="text-left p-4 font-semibold">Email</th>
                          <th className="text-left p-4 font-semibold">Phone</th>
                          <th className="text-left p-4 font-semibold">Response Date</th>
                          <th className="text-left p-4 font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredResponses.map((response) => (
                          <tr key={response.id} className="border-t hover:bg-muted/25 transition-colors">
                            <td className="p-4 font-medium">{response.name}</td>
                            <td className="p-4 text-muted-foreground">{response.email}</td>
                            <td className="p-4 text-muted-foreground">{response.phone}</td>
                            <td className="p-4 text-muted-foreground">{response.responseDate}</td>
                            <td className="p-4">
                              <Badge variant={response.status === "Complete" ? "default" : "secondary"}>
                                {response.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 text-sm text-muted-foreground">
                    Showing {filteredResponses.length} of {totalResponses} responses
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Question Responses Tab */}
            <TabsContent value="responses" className="space-y-6">
              {/* Question 1: Transportation Method */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>What was your main mode of transportation?</CardTitle>
                      <CardDescription className="mt-1">
                        Question Type: Multiple Choice | {totalResponses} responses
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={transportationData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="hsl(var(--primary))"
                            dataKey="value"
                          >
                            {transportationData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-3">
                      {transportationData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <span className="text-muted-foreground">{item.value} responses</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Question 2: Meals */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>What meals did you eat?</CardTitle>
                      <CardDescription className="mt-1">
                        Question Type: Multiple Choice | {totalResponses} responses
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={mealsData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="hsl(var(--primary))"
                            dataKey="value"
                          >
                            {mealsData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-3">
                      {mealsData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <span className="text-muted-foreground">{item.value} responses</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Question 3: Accommodation */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Where did you stay?</CardTitle>
                      <CardDescription className="mt-1">
                        Question Type: Multiple Choice | {totalResponses} responses
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={accommodationData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="hsl(var(--primary))"
                            dataKey="value"
                          >
                            {accommodationData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-3">
                      {accommodationData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <span className="text-muted-foreground">{item.value} responses</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emissions Data */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Emissions from Questionnaire Responses</CardTitle>
                      <CardDescription className="mt-1">
                        Total emissions calculated from all responses
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-6 bg-muted/50 rounded-lg">
                        <div className="text-4xl font-bold">{totalEmissions}</div>
                        <div className="text-lg text-muted-foreground">Total CO₂e (kg)</div>
                      </div>
                      <div className="text-center p-6 bg-muted/50 rounded-lg">
                        <div className="text-4xl font-bold">{avgEmissions}</div>
                        <div className="text-lg text-muted-foreground">Average CO₂e (kg)</div>
                      </div>
                    </div>

                    <div className="rounded-md border">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="text-left p-3 font-semibold">Respondent</th>
                            <th className="text-left p-3 font-semibold">Transportation</th>
                            <th className="text-left p-3 font-semibold">Meals</th>
                            <th className="text-left p-3 font-semibold">Accommodation</th>
                            <th className="text-right p-3 font-semibold">Emissions (kg CO₂e)</th>
                            <th className="text-center p-3 font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {responses.map((response) => (
                            <tr key={response.id} className="border-t">
                              <td className="p-3">{response.name}</td>
                              <td className="p-3 text-muted-foreground">{response.answers.transportation}</td>
                              <td className="p-3 text-muted-foreground">{response.answers.meals}</td>
                              <td className="p-3 text-muted-foreground">{response.answers.accommodation}</td>
                              <td className="p-3 text-right font-medium">{response.emissions}</td>
                              <td className="p-3 text-center">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleRemoveResponse(response.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Bulk Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Bulk Export Options</CardTitle>
              <CardDescription>
                Download comprehensive reports and statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Download Complete Report
                </Button>
                <Button variant="outline">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export Summary Statistics
                </Button>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Filter by Date Range
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default QuestionnaireResponses;
