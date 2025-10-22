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
  CheckCircle
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
      attendees: 150,
      transportation: "Car",
      sustainability: 4
    }
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 234 567 8901",
    responseDate: "2025-01-15 11:45 AM",
    status: "Complete",
    answers: {
      attendees: 200,
      transportation: "Public Transport",
      sustainability: 5
    }
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "m.chen@example.com",
    phone: "+1 234 567 8902",
    responseDate: "2025-01-15 02:15 PM",
    status: "Complete",
    answers: {
      attendees: 75,
      transportation: "Walk/Bike",
      sustainability: 5
    }
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 234 567 8903",
    responseDate: "2025-01-16 09:20 AM",
    status: "Complete",
    answers: {
      attendees: 300,
      transportation: "Car",
      sustainability: 3
    }
  },
  {
    id: 5,
    name: "David Wilson",
    email: "d.wilson@example.com",
    phone: "+1 234 567 8904",
    responseDate: "2025-01-16 03:45 PM",
    status: "Partial",
    answers: {
      attendees: 120,
      transportation: "Public Transport",
      sustainability: 4
    }
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    phone: "+1 234 567 8905",
    responseDate: "2025-01-17 08:10 AM",
    status: "Complete",
    answers: {
      attendees: 180,
      transportation: "Walk/Bike",
      sustainability: 5
    }
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "rob.taylor@example.com",
    phone: "+1 234 567 8906",
    responseDate: "2025-01-17 01:30 PM",
    status: "Complete",
    answers: {
      attendees: 250,
      transportation: "Car",
      sustainability: 3
    }
  },
  {
    id: 8,
    name: "Jennifer Martinez",
    email: "j.martinez@example.com",
    phone: "+1 234 567 8907",
    responseDate: "2025-01-18 10:00 AM",
    status: "Complete",
    answers: {
      attendees: 90,
      transportation: "Public Transport",
      sustainability: 4
    }
  }
];

const QuestionnaireResponses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Calculate statistics
  const totalResponses = mockResponses.length;
  const totalAttendees = 100; // Mock total expected attendees
  const responseRate = Math.round((totalResponses / totalAttendees) * 100);
  const completeResponses = mockResponses.filter(r => r.status === "Complete").length;

  // Transportation data for chart
  const transportationData = useMemo(() => {
    const counts: Record<string, number> = {};
    mockResponses.forEach(response => {
      const transport = response.answers.transportation;
      counts[transport] = (counts[transport] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, []);

  // Sustainability rating data
  const sustainabilityData = useMemo(() => {
    const counts: Record<number, number> = {};
    mockResponses.forEach(response => {
      const rating = response.answers.sustainability;
      counts[rating] = (counts[rating] || 0) + 1;
    });
    return Object.entries(counts).map(([rating, count]) => ({ 
      rating: `${rating} Stars`, 
      count 
    }));
  }, []);

  // Average attendees
  const avgAttendees = Math.round(
    mockResponses.reduce((sum, r) => sum + r.answers.attendees, 0) / mockResponses.length
  );

  // Average sustainability rating
  const avgSustainability = (
    mockResponses.reduce((sum, r) => sum + r.answers.sustainability, 0) / mockResponses.length
  ).toFixed(1);

  // Filtered responses
  const filteredResponses = useMemo(() => {
    return mockResponses.filter(response => {
      const matchesSearch = searchQuery === "" || 
        response.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        response.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || 
        response.status.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Attendees</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgAttendees}</div>
                <p className="text-xs text-muted-foreground">
                  per response
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgSustainability}/5</div>
                <p className="text-xs text-muted-foreground">
                  sustainability rating
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
              {/* Question 1: Number of Attendees */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>How many people attended your event?</CardTitle>
                      <CardDescription className="mt-1">
                        Question Type: Number | {totalResponses} responses
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold">{avgAttendees}</div>
                        <div className="text-sm text-muted-foreground">Average</div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold">{Math.min(...mockResponses.map(r => r.answers.attendees))}</div>
                        <div className="text-sm text-muted-foreground">Minimum</div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold">{Math.max(...mockResponses.map(r => r.answers.attendees))}</div>
                        <div className="text-sm text-muted-foreground">Maximum</div>
                      </div>
                    </div>
                    
                    <div className="rounded-md border">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="text-left p-3 font-semibold">Respondent</th>
                            <th className="text-right p-3 font-semibold">Number of Attendees</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockResponses.map((response) => (
                            <tr key={response.id} className="border-t">
                              <td className="p-3">{response.name}</td>
                              <td className="p-3 text-right font-medium">{response.answers.attendees}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Question 2: Transportation Method */}
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

              {/* Question 3: Sustainability Rating */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>How would you rate the event's sustainability efforts?</CardTitle>
                      <CardDescription className="mt-1">
                        Question Type: Rating (1-5 stars) | {totalResponses} responses
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
                    <div className="text-center p-6 bg-muted/50 rounded-lg">
                      <div className="text-4xl font-bold">{avgSustainability}</div>
                      <div className="text-lg text-muted-foreground">Average Rating</div>
                    </div>

                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sustainabilityData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="rating" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="hsl(var(--primary))" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="rounded-md border">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="text-left p-3 font-semibold">Rating</th>
                            <th className="text-right p-3 font-semibold">Number of Responses</th>
                            <th className="text-right p-3 font-semibold">Percentage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sustainabilityData.map((item, index) => (
                            <tr key={index} className="border-t">
                              <td className="p-3">{item.rating}</td>
                              <td className="p-3 text-right font-medium">{item.count}</td>
                              <td className="p-3 text-right text-muted-foreground">
                                {((item.count / totalResponses) * 100).toFixed(1)}%
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
