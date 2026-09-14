"use client";

import { motion } from "framer-motion";
import { AIMode } from "@/lib/ai/mock-agent";

interface ModeToggleProps {
  mode: AIMode;
  setMode: (mode: AIMode) => void;
}

export function ModeToggle({ mode, setMode }: ModeToggleProps) {
  return (
    <div className="flex bg-card/40 backdrop-blur-md p-1 rounded-xl border border-border/50 shadow-sm relative">
      <button
        onClick={() => setMode("collector")}
        className={`relative z-10 px-4 py-2 rounded-lg text-sm font-medium transition-colors w-1/2 ${
          mode === "collector" ? "text-foreground" : "text-foreground/50 hover:text-foreground"
        }`}
      >
        Collector Copilot
      </button>
      <button
        onClick={() => setMode("admin")}
        className={`relative z-10 px-4 py-2 rounded-lg text-sm font-medium transition-colors w-1/2 ${
          mode === "admin" ? "text-foreground" : "text-foreground/50 hover:text-foreground"
        }`}
      >
        Logistics Admin
      </button>
      
      {/* Animated Background Pill */}
      <motion.div
        className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-background rounded-lg shadow-sm"
        animate={{
          left: mode === "collector" ? "4px" : "calc(50%)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  );
}
