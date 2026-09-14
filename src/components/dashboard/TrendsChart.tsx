"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const data = [
  { name: "Mon", biomass: 400, carbon: 240 },
  { name: "Tue", biomass: 300, carbon: 139 },
  { name: "Wed", biomass: 550, carbon: 380 },
  { name: "Thu", biomass: 450, carbon: 290 },
  { name: "Fri", biomass: 600, carbon: 480 },
  { name: "Sat", biomass: 750, carbon: 590 },
  { name: "Sun", biomass: 800, carbon: 650 },
];

export function TrendsChart() {
  return (
    <Card className="glass-card flex flex-col h-full border-primary/20">
      <CardHeader className="border-b border-border/30 bg-card/50 pb-4">
        <CardTitle className="text-lg flex items-center text-foreground">
          <TrendingUp className="w-4 h-4 mr-2 text-primary" />
          7-Day Collection Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-4 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorBiomass" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--foreground)/0.5)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--foreground)/0.5)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Area type="monotone" dataKey="biomass" stroke="#10b981" fillOpacity={1} fill="url(#colorBiomass)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
