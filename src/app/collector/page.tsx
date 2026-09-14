"use client";

import { SummaryCard } from "./components/summary-card";
import { QrGenerator } from "./components/qr-generator";
import { Leaderboard } from "./components/leaderboard";

export default function CollectorPortal() {
  const baseRate = 2.50;
  const todayBiomass = 145; // kg
  const todayEarnings = todayBiomass * baseRate;

  return (
    <main className="flex-1 p-4 md:p-6 space-y-8 pb-32 pt-4">
      <SummaryCard todayBiomass={todayBiomass} todayEarnings={todayEarnings} />
      <QrGenerator />
      <Leaderboard />
    </main>
  );
}
