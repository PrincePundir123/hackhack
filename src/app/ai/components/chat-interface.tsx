"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User } from "lucide-react";
import { AIMode } from "@/lib/ai/mock-agent";

export interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  isTyping: boolean;
  mode: AIMode;
}

export function ChatInterface({ messages, isTyping, mode }: ChatInterfaceProps) {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const agentName = mode === "collector" ? "Kisan Mitra" : "Logistics Engine";

  return (
    <div className="flex-1 overflow-y-auto hide-scrollbar rounded-2xl glass-panel bg-white/5 dark:bg-black/10 border border-white/10 dark:border-white/5 p-4 space-y-6 shadow-inner relative">
      {messages.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-foreground/40 text-sm p-8 text-center flex-col space-y-4">
          <Bot className="w-12 h-12 opacity-50" />
          <p>
            {mode === "collector" 
              ? "Hello! I can help you find drop-off points and check payouts." 
              : "System online. Ready to analyze fleet routes and carbon projections."}
          </p>
        </div>
      )}

      <AnimatePresence initial={false}>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
          >
            {msg.role === "agent" && (
              <span className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-1 ml-2">
                {agentName}
              </span>
            )}
            
            <div 
              className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user" 
                  ? "bg-black/10 dark:bg-white/10 text-foreground rounded-br-sm shadow-sm backdrop-blur-sm border border-border/10" 
                  : "glass-card bg-primary/10 border-primary/20 text-foreground rounded-bl-sm shadow-md"
              }`}
            >
              {/* Highlight specific tags for Admin mode */}
              {msg.role === "agent" && msg.content.includes("[") ? (
                 <p className="whitespace-pre-wrap">
                   {msg.content.split(/(\[.*?\])/).map((part, i) => 
                     part.startsWith("[") && part.endsWith("]") ? (
                       <span key={i} className="font-bold text-primary">{part}</span>
                     ) : (
                       part
                     )
                   )}
                 </p>
              ) : (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              )}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-start"
          >
            <span className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-1 ml-2">
              {agentName}
            </span>
            <div className="glass-card bg-primary/5 border-primary/10 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center space-x-1.5 h-11 shadow-sm">
              <motion.div className="w-1.5 h-1.5 bg-primary/60 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
              <motion.div className="w-1.5 h-1.5 bg-primary/60 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
              <motion.div className="w-1.5 h-1.5 bg-primary/60 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={endOfMessagesRef} className="h-1" />
    </div>
  );
}
