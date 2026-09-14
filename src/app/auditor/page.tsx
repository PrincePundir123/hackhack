"use client";

import { useState } from "react";
import { Wallet, Database, ShieldCheck, Search, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MassPayoutPanel, PayoutTarget } from "./components/mass-payout";

const mockTargets: PayoutTarget[] = [
  { address: "0x1111111111111111111111111111111111111111", amountUSDC: "150.25" },
  { address: "0x2222222222222222222222222222222222222222", amountUSDC: "85.00" },
  { address: "0x3333333333333333333333333333333333333333", amountUSDC: "107.25" },
];

const ledgerData = [
  { txHash: "0x8f9a...3b4c", geo: "30.3165° N, 78.0322° E", yield: 185.2, carbon: 0.52, time: "2026-09-08 14:22:00" },
  { txHash: "0x3b4c...7e2d", geo: "30.3201° N, 78.0211° E", yield: 210.5, carbon: 0.59, time: "2026-09-08 13:45:12" },
  { txHash: "0x7e2d...1a5f", geo: "30.3112° N, 78.0405° E", yield: 95.0, carbon: 0.27, time: "2026-09-08 11:10:45" },
  { txHash: "0x1a5f...9b8c", geo: "30.3344° N, 78.0123° E", yield: 340.8, carbon: 0.95, time: "2026-09-08 09:30:22" },
];

export default function AuditorLedger() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = ledgerData.filter(row => 
    row.txHash.toLowerCase().includes(searchTerm.toLowerCase()) || 
    row.geo.includes(searchTerm)
  );

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Web3 Audits</h1>
          <p className="text-foreground/60 mt-1">L2 Payouts & Immutable Carbon Records</p>
        </div>
      </header>

      {/* Wagmi Mass Payout Panel */}
      <MassPayoutPanel targets={mockTargets} />

      {/* Minimalist Public Ledger */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-xl font-semibold flex items-center text-foreground">
            <Database className="w-5 h-5 mr-2 text-foreground/50" />
            Public Ledger
          </h2>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input 
              type="text" 
              placeholder="Search by TxHash or Geo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-card/40 backdrop-blur-sm border border-border/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all"
            />
          </div>
        </div>

        <Card className="glass-card overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-foreground/50 uppercase bg-black/5 dark:bg-white/5 border-b border-border/30">
                <tr>
                  <th className="px-6 py-4 font-semibold">Transaction</th>
                  <th className="px-6 py-4 font-semibold">Geolocation</th>
                  <th className="px-6 py-4 font-semibold text-right">Yield (kg)</th>
                  <th className="px-6 py-4 font-semibold text-right">CO₂ (tons)</th>
                  <th className="px-6 py-4 font-semibold">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredData.map((row, i) => (
                  <tr key={i} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center text-blue-500 font-mono cursor-pointer group-hover:underline">
                        {row.txHash}
                        <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-foreground/70 font-mono text-xs">{row.geo}</td>
                    <td className="px-6 py-4 text-right text-emerald-500 font-mono font-medium">{row.yield.toFixed(1)}</td>
                    <td className="px-6 py-4 text-right text-foreground font-mono font-bold">{row.carbon.toFixed(2)}</td>
                    <td className="px-6 py-4 text-foreground/50 text-xs whitespace-nowrap">{row.time}</td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-foreground/50">No records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
