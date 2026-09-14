"use client";

import { motion } from "framer-motion";
import { Leaf, IndianRupee } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "../context/LanguageContext";

interface SummaryCardProps {
  todayBiomass: number;
  todayEarnings: number;
}

export function SummaryCard({ todayBiomass, todayEarnings }: SummaryCardProps) {
  const { lang } = useLanguage();

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="text-foreground/60 text-sm font-medium mb-3 uppercase tracking-wider pl-1">
        {lang === "EN" ? "Today's Summary" : "आज का सारांश"}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Biomass Card */}
        <Card className="glass-card bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg border-emerald-500/20 dark:border-emerald-500/10">
          <CardContent className="p-5 flex flex-col h-full justify-between relative overflow-hidden">
            <div className="absolute -top-4 -right-4 p-2 opacity-[0.03] dark:opacity-5">
              <Leaf className="w-24 h-24 text-emerald-500" />
            </div>
            <span className="text-foreground/70 text-xs font-semibold mb-2 relative z-10 uppercase tracking-wide">
              {lang === "EN" ? "Biomass" : "बायोमास"}
            </span>
            <div className="relative z-10">
              <span className="text-4xl font-bold text-emerald-500 tracking-tighter drop-shadow-sm">{todayBiomass}</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 ml-1 font-medium">kg</span>
            </div>
          </CardContent>
        </Card>

        {/* Earnings Card */}
        <Card className="glass-card bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg border-blue-500/20 dark:border-blue-500/10">
          <CardContent className="p-5 flex flex-col h-full justify-between relative overflow-hidden">
            <div className="absolute -top-4 -right-4 p-2 opacity-[0.03] dark:opacity-5">
              <IndianRupee className="w-24 h-24 text-blue-500" />
            </div>
            <span className="text-foreground/70 text-xs font-semibold mb-2 relative z-10 uppercase tracking-wide">
              {lang === "EN" ? "Earnings" : "कमाई"}
            </span>
            <div className="flex items-start relative z-10">
              <span className="text-lg text-blue-500 mt-1 mr-1 drop-shadow-sm font-medium">₹</span>
              <motion.span 
                className="text-4xl font-bold text-blue-500 tracking-tighter drop-shadow-sm"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {todayEarnings.toLocaleString("en-IN")}
              </motion.span>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
}
