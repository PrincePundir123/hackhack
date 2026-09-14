"use client";

import { useState } from "react";
import { Send, BotMessageSquare } from "lucide-react";
import { AIMode } from "@/lib/ai/mock-agent";
import { ModeToggle } from "./components/mode-toggle";
import { QuickPrompts } from "./components/quick-prompts";
import { ChatInterface, Message } from "./components/chat-interface";

export default function AIPortal() {
  const [mode, setMode] = useState<AIMode>("collector");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    const agentMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: agentMsgId, role: "agent", content: "" }]);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim(), mode })
      });

      if (!res.ok) throw new Error("Failed to fetch response");
      
      const reader = res.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      if (reader) {
        setIsTyping(false); // Stop typing indicator as stream starts
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          
          setMessages(prev => 
            prev.map(msg => 
              msg.id === agentMsgId 
                ? { ...msg, content: msg.content + chunk }
                : msg
            )
          );
        }
      }
    } catch (error) {
      console.error(error);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  // When mode switches, we could clear chat, but keeping it is fine. 
  // We'll just let the UI naturally adapt.

  return (
    <div className="flex justify-center bg-background min-h-[calc(100vh-64px)] md:min-h-screen">
      <div className="w-full max-w-2xl bg-background min-h-full flex flex-col border-x border-border/10 shadow-2xl relative">
        
        {/* Header & Mode Toggle */}
        <header className="p-4 md:p-6 pb-2 border-b border-border/30 bg-background/80 backdrop-blur-xl sticky top-0 z-10 flex flex-col space-y-4 shadow-sm">
          <div className="flex items-center space-x-2">
            <BotMessageSquare className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl text-foreground tracking-wider">AI <span className="text-primary">Ops</span></span>
          </div>
          <ModeToggle mode={mode} setMode={setMode} />
        </header>

        {/* Chat Area */}
        <main className="flex-1 p-4 md:p-6 flex flex-col overflow-hidden pb-[140px]">
          <ChatInterface messages={messages} isTyping={isTyping} mode={mode} />
        </main>

        {/* Bottom Floating Input Area */}
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-background via-background to-transparent pt-6 pb-4 md:pb-6 px-4 md:px-6 z-20">
          <div className="max-w-2xl mx-auto flex flex-col space-y-3">
            <QuickPrompts mode={mode} onSelect={handleSend} />
            
            <div className="flex items-center space-x-2 relative group">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={mode === "collector" ? "Ask about payouts, routes..." : "Query logistics, carbon yield..."}
                className="flex-1 h-14 bg-black/5 dark:bg-white/5 border border-border/50 rounded-2xl px-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all shadow-sm group-hover:border-primary/30"
              />
              <button
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center hover:bg-primary/90 transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:hover:bg-primary active:scale-95"
              >
                <Send className="w-5 h-5 ml-1" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
