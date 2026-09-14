"use client";

import { useState } from "react";
import { QrCode, Leaf, Award, IndianRupee, Globe, Users, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const leaderboardData = [
  { rank: 1, name: "Mahila Samiti (Sector 4)", amount: 1250, badge: "Gold" },
  { rank: 2, name: "Green Earth SHG", amount: 980, badge: "Silver" },
  { rank: 3, name: "Valley Women's Co-op", amount: 845, badge: "Bronze" },
  { rank: 4, name: "Pooja & Co. Group", amount: 620, badge: null },
];

export default function CollectorPortal() {
  const [lang, setLang] = useState("EN");
  const [showQR, setShowQR] = useState(false);
  const baseRate = 2.50;
  const todayBiomass = 145; // kg
  const todayEarnings = todayBiomass * baseRate;

  return (
    <div className="min-h-full flex justify-center bg-background">
      <div className="w-full max-w-md bg-background min-h-screen relative flex flex-col border-x border-border/10">
        <header className="p-6 border-b border-border/30 flex justify-between items-center bg-card/60 backdrop-blur-xl sticky top-0 z-10 shadow-sm">
          <div className="flex items-center space-x-2">
            <Leaf className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl text-foreground tracking-wider">DePIN<span className="text-primary">App</span></span>
          </div>
          <button 
            onClick={() => setLang(lang === "EN" ? "HI" : "EN")}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-border/50 bg-background text-xs text-foreground/80 hover:text-foreground transition-colors"
          >
            <Globe className="w-3 h-3" />
            <span>{lang === "EN" ? "English" : "हिंदी"}</span>
          </button>
        </header>

        <main className="flex-1 p-6 space-y-8 pb-24">
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
            <h2 className="text-foreground/60 text-sm font-medium mb-3 uppercase tracking-wider">
              {lang === "EN" ? "Today's Summary" : "आज का सारांश"}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Card className="glass-card border-emerald-500/20 dark:border-emerald-500/10">
                <CardContent className="p-5 flex flex-col h-full justify-between relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 p-2 opacity-5"><Leaf className="w-20 h-20 text-emerald-500" /></div>
                  <span className="text-foreground/60 text-xs font-medium mb-2 relative z-10">{lang === "EN" ? "Biomass" : "बायोमास"}</span>
                  <div className="relative z-10">
                    <span className="text-4xl font-bold text-emerald-500 tracking-tighter">{todayBiomass}</span>
                    <span className="text-xs text-emerald-600 ml-1">kg</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-blue-500/20 dark:border-blue-500/10">
                <CardContent className="p-5 flex flex-col h-full justify-between relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 p-2 opacity-5"><IndianRupee className="w-20 h-20 text-blue-500" /></div>
                  <span className="text-foreground/60 text-xs font-medium mb-2 relative z-10">{lang === "EN" ? "Earnings" : "कमाई"}</span>
                  <div className="flex items-start relative z-10">
                    <span className="text-lg text-blue-500 mt-1 mr-1">₹</span>
                    <span className="text-4xl font-bold text-blue-500 tracking-tighter">{todayEarnings.toFixed(0)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6">
               <Button 
                 onClick={() => setShowQR(!showQR)}
                 className="w-full h-14 text-lg rounded-xl shadow-[0_4px_20px_rgba(16,185,129,0.25)] dark:shadow-[0_4px_20px_rgba(16,185,129,0.15)]"
               >
                 <QrCode className="w-5 h-5 mr-2" />
                 {showQR ? (lang === "EN" ? "Hide Deposit QR" : "QR छुपाएं") : (lang === "EN" ? "Show Deposit QR Code" : "डिपॉजिट QR कोड दिखाएं")}
               </Button>
            </div>
          </section>

          {showQR && (
            <section className="animate-in zoom-in-95 duration-300">
              <Card className="glass-panel overflow-hidden border-primary/20">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="p-4 bg-white rounded-3xl mb-4 soft-shadow">
                    <QrCode className="w-48 h-48 text-black" strokeWidth={1} />
                  </div>
                  <p className="text-sm text-foreground/70 font-medium">
                    {lang === "EN" ? "Scan at IoT scale to link deposit" : "जमा लिंक करने के लिए IoT स्केल पर स्कैन करें"}
                  </p>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Community Leaderboard */}
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both">
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-foreground/60 text-sm font-medium uppercase tracking-wider flex items-center">
                 <Users className="w-4 h-4 mr-2" />
                 {lang === "EN" ? "Community Leaderboard" : "सामुदायिक लीडरबोर्ड"}
               </h2>
             </div>
             
             <Card className="glass-card overflow-hidden">
                <div className="divide-y divide-border/30">
                  {leaderboardData.map((group, i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${group.rank === 1 ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' : group.rank === 2 ? 'bg-slate-300/50 text-slate-700 dark:text-slate-300' : group.rank === 3 ? 'bg-orange-500/20 text-orange-600 dark:text-orange-400' : 'bg-black/5 dark:bg-white/5 text-foreground/50'}`}>
                          {group.rank}
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm flex items-center">
                            {group.name}
                            {group.rank === 1 && <Trophy className="w-3 h-3 ml-2 text-yellow-500" />}
                          </p>
                          <p className="text-xs text-foreground/50">{group.amount} kg {lang === "EN" ? "this month" : "इस महीने"}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
             </Card>
          </section>
        </main>
      </div>
    </div>
  );
}
