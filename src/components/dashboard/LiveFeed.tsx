"use client";

import { useEffect, useRef } from "react";
import { CheckCircle, Clock } from "lucide-react";

const mockData = [
  { id: "tx_8f9a2", name: "Ramesh Singh", weight: 452.5, moisture: 12.4 },
  { id: "tx_3b4c1", name: "Anita Devi", weight: 310.2, moisture: 14.1 },
  { id: "tx_7e2d9", name: "Vikram Kumar", weight: 589.0, moisture: 11.8 },
  { id: "tx_1a5f8", name: "Sunita Sharma", weight: 425.8, moisture: 15.2 },
  { id: "tx_9d8e7", name: "Pooja Patel", weight: 215.4, moisture: 10.9 },
  { id: "tx_2c3b4", name: "Amit Verma", weight: 630.1, moisture: 13.5 },
];

export function LiveFeed() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple auto-scroll simulation
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop += 1;
        if (scrollRef.current.scrollTop >= scrollRef.current.scrollHeight - scrollRef.current.clientHeight) {
          scrollRef.current.scrollTop = 0;
        }
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full overflow-hidden absolute inset-0 py-2">
      <div 
        ref={scrollRef}
        className="h-full overflow-y-auto hide-scrollbar px-4 space-y-2 pb-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {mockData.concat(mockData).map((row, i) => (
          <div key={`${row.id}-${i}`} className="flex items-center justify-between p-3 rounded-xl bg-background/40 hover:bg-background/80 border border-border/30 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs">
                {row.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground/80">{row.name}</p>
                <div className="flex items-center text-[10px] text-foreground/50 space-x-2 mt-0.5">
                  <span className="flex items-center"><CheckCircle className="w-3 h-3 mr-0.5 text-emerald-500" /> Verified</span>
                  <span>•</span>
                  <span>M: {row.moisture}%</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-mono font-bold text-foreground">{row.weight.toFixed(1)} <span className="text-[10px] text-foreground/50 font-sans">kg</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
