"use client";

import { MapPin, Navigation } from "lucide-react";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

export function RiskMap() {
  return (
    <div className="flex flex-col md:flex-row h-full min-h-[400px] w-full bg-background/50 relative">
      {/* Real Interactive Map using react-leaflet */}
      <div className="flex-1 relative overflow-hidden bg-white dark:bg-[#0f172a] transition-colors duration-500 z-0">
        <MapComponent />
      </div>

      {/* Modern Routing Sidebar */}
      <div className="w-full md:w-72 bg-card/40 backdrop-blur-lg border-l border-border/50 p-5 flex flex-col">
        <h3 className="font-semibold mb-5 text-foreground flex items-center text-sm tracking-wide">
          <Navigation className="w-4 h-4 mr-2 text-primary" />
          Optimal Routes
        </h3>
        <div className="space-y-3 flex-1">
          {[
            { route: "Sector 4A - North Ridge", risk: "High", time: "12m" },
            { route: "Sector 2B - East Valley", risk: "Medium", time: "18m" },
            { route: "Sector 7C - South Hill", risk: "Low", time: "25m" },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-xl bg-background/60 hover:bg-background/80 border border-border/30 transition-all cursor-pointer soft-shadow group">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-sm text-foreground/80 group-hover:text-primary transition-colors">{item.route}</span>
                <span className="text-xs font-mono text-foreground/50 bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md">{item.time}</span>
              </div>
              <div className="flex items-center text-xs space-x-2">
                <div className={`w-1.5 h-1.5 rounded-full ${item.risk === "High" ? "bg-red-500" : item.risk === "Medium" ? "bg-orange-500" : "bg-emerald-500"}`} />
                <span className="text-foreground/60">{item.risk} Risk</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
