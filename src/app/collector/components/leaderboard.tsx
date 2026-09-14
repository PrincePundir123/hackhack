"use client";

import { Users, Trophy, Medal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "../context/LanguageContext";

const leaderboardData = [
  { rank: 1, name: "Mahila Samiti (Sector 4)", amount: 1250, badge: "Gold" },
  { rank: 2, name: "Green Earth SHG", amount: 980, badge: "Silver" },
  { rank: 3, name: "Kisan Union", amount: 845, badge: "Bronze" },
  { rank: 4, name: "Pooja & Co. Group", amount: 620, badge: null },
];

export function Leaderboard() {
  const { lang } = useLanguage();

  const getBadgeIcon = (badge: string | null) => {
    switch (badge) {
      case "Gold":
        return <Trophy className="w-4 h-4 text-yellow-500 drop-shadow-sm" />;
      case "Silver":
        return <Medal className="w-4 h-4 text-slate-300 drop-shadow-sm" />;
      case "Bronze":
        return <Medal className="w-4 h-4 text-orange-400 drop-shadow-sm" />;
      default:
        return null;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30";
      case 2:
        return "bg-slate-300/30 text-slate-700 dark:text-slate-300 border border-slate-400/30";
      case 3:
        return "bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/30";
      default:
        return "bg-black/5 dark:bg-white/5 text-foreground/50 border border-transparent";
    }
  };

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both">
      <div className="flex items-center justify-between mb-4 pl-1">
        <h2 className="text-foreground/60 text-sm font-medium uppercase tracking-wider flex items-center">
          <Users className="w-4 h-4 mr-2" />
          {lang === "EN" ? "Community Leaderboard" : "सामुदायिक लीडरबोर्ड"}
        </h2>
      </div>
      
      <Card className="glass-card overflow-hidden border-white/20 dark:border-white/10 shadow-lg">
        <div className="divide-y divide-border/30">
          {leaderboardData.map((group, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-default">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${getRankStyle(group.rank)}`}>
                  {group.rank}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm flex items-center">
                    {group.name}
                    <span className="ml-2">{getBadgeIcon(group.badge)}</span>
                  </p>
                  <p className="text-xs text-foreground/60 mt-0.5">
                    {group.amount.toLocaleString("en-IN")} kg {lang === "EN" ? "this month" : "इस महीने"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
