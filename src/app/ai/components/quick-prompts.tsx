"use client";

import { AIMode } from "@/lib/ai/mock-agent";
import { Sparkles } from "lucide-react";

interface QuickPromptsProps {
  mode: AIMode;
  onSelect: (prompt: string) => void;
}

const collectorPrompts = [
  "निकटतम बायोमास केंद्र कहाँ है? (Nearest Drop-off Point)",
  "Check today's payout rate per kg",
  "Report full IoT scale at Sector 4"
];

const adminPrompts = [
  "Analyze fire risk rerouting for Truck 3",
  "Summarize high-yield SHGs this week",
  "Generate carbon offset projection report"
];

export function QuickPrompts({ mode, onSelect }: QuickPromptsProps) {
  const prompts = mode === "collector" ? collectorPrompts : adminPrompts;

  return (
    <div className="w-full overflow-x-auto hide-scrollbar py-2">
      <div className="flex space-x-2 px-1">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onSelect(prompt)}
            className="flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full glass-card bg-primary/10 border border-primary/20 text-xs font-medium text-foreground hover:bg-primary/20 hover:border-primary/40 transition-colors shadow-sm active:scale-95"
          >
            <Sparkles className="w-3 h-3 text-primary" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
