import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OperationsDashboard } from "@/components/operations/OperationsDashboard";
import { OperationsOrganisations } from "@/components/operations/OperationsOrganisations";
import { OperationsUsers } from "@/components/operations/OperationsUsers";
import { OperationsRevenue } from "@/components/operations/OperationsRevenue";
import { OperationsNotifications } from "@/components/operations/OperationsNotifications";

const Operations = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Operations Dashboard" subtitle="Internal admin panel — product usage, organisations & activity" />
        <main className="flex-1 overflow-auto p-8">

          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="organisations">Organisations</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <OperationsDashboard />
            </TabsContent>

            <TabsContent value="organisations">
              <OperationsOrganisations />
            </TabsContent>

            <TabsContent value="users">
              <OperationsUsers />
            </TabsContent>

            <TabsContent value="revenue">
              <OperationsRevenue />
            </TabsContent>

            <TabsContent value="notifications">
              <OperationsNotifications />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Operations;
