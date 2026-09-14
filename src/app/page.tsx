import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RiskMap } from "@/components/dashboard/RiskMap";
import { LiveFeed } from "@/components/dashboard/LiveFeed";
import { TrendsChart } from "@/components/dashboard/TrendsChart";
import { Leaf, Flame, Scale } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Overview</h1>
          <p className="text-foreground/60 mt-1">Real-time DePIN biomass & biochar operations</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <div className="px-4 py-2 glass-card rounded-full text-sm font-medium text-primary flex items-center shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse mr-2" />
            System Optimal
          </div>
        </div>
      </header>

      {/* Hero Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-foreground/60 uppercase tracking-wider">Total Biomass</span>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                <Scale className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground">1,204<span className="text-xl text-foreground/50 ml-1">kg</span></div>
              <p className="text-xs text-primary mt-2 flex items-center">+12% from last week</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-foreground/60 uppercase tracking-wider">Carbon Credits</span>
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                <Leaf className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground">18.5k<span className="text-xl text-foreground/50 ml-1">/ 28.8k</span></div>
              <div className="w-full bg-border/50 h-2 rounded-full mt-3 overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '64%' }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-orange-500/20 dark:border-orange-500/10">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-foreground/60 uppercase tracking-wider">Fire Alerts</span>
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                <Flame className="w-5 h-5 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground">2<span className="text-xl text-foreground/50 ml-1">Active</span></div>
              <p className="text-xs text-orange-500 mt-2">Requires immediate routing</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Map */}
        <Card className="lg:col-span-2 glass-panel overflow-hidden p-0 border-none">
          <RiskMap />
        </Card>

        {/* Right Col: Live Feed */}
        <Card className="glass-card flex flex-col overflow-hidden h-[400px]">
          <CardHeader className="border-b border-border/30 bg-card/50 pb-4">
            <CardTitle className="text-lg flex items-center text-foreground">
              <Scale className="w-4 h-4 mr-2 text-primary" />
              Live IoT Deposits
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-hidden relative">
            <LiveFeed />
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <TrendsChart />
      </div>
    </div>
  );
}
