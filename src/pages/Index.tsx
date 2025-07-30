import { TreePine, Cloud, BarChart3 } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { CarbonChart } from "@/components/dashboard/CarbonChart";
import { EmissionsPieChart } from "@/components/dashboard/EmissionsPieChart";

const Index = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto p-8">
          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <MetricCard
              icon={<TreePine className="w-8 h-8 text-white" />}
              title="Growing"
              value="9,661"
              unit="Trees"
              buttonText="VIEW PROJECTS"
            />
            
            <MetricCard
              icon={<Cloud className="w-8 h-8 text-white" />}
              title=""
              value="885"
              unit="tn Compensated"
              buttonText="VIEW ACTIVITY"
            />
            
            <MetricCard
              icon={<BarChart3 className="w-8 h-8 text-white" />}
              title=""
              value="1"
              unit="Item"
              buttonText="RUN REPORTS"
            />
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CarbonChart />
            <EmissionsPieChart />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;