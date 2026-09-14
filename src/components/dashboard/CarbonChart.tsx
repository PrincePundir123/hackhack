"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

const data = [
  { name: "Sequestered", value: 18500 },
  { name: "Remaining Goal", value: 10300 },
];
const COLORS = ["#10b981", "#1e293b"];

export function CarbonChart() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="relative w-48 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px" }}
              itemStyle={{ color: "#f8fafc" }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-emerald-400 glow-text">18.5k</span>
          <span className="text-xs text-gray-400 uppercase tracking-wider">Credits</span>
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-sm text-gray-400">Progress toward regional goal: <strong className="text-gray-200">28,800</strong></p>
      </div>

      <Button className="w-full group">
        <Leaf className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
        Mint RWA Tokens to L2
      </Button>
    </div>
  );
}
