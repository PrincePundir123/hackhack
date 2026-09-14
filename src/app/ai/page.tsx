"use client";

import { useState } from "react";
import { BotMessageSquare, Send, User, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockChats = [
  { role: "agent", content: "नमस्ते! मैं DePIN AI असिस्टेंट हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?", type: "collector" },
  { role: "user", content: "मेरे पास 45 किलो बायोमास है। सबसे नज़दीकी ड्रॉप-ऑफ़ लोकेशन कहाँ है?", type: "collector" },
  { role: "agent", content: "आपके वर्तमान स्थान (सेक्टर 4) से सबसे नज़दीकी IoT स्केल 'Green Earth Center' पर है, जो 1.2 किमी दूर है। वहाँ जाने का रास्ता साफ़ है।", type: "collector" },
  
  { role: "agent", content: "Hello Admin. System analysis complete. How can I optimize operations today?", type: "admin" },
  { role: "user", content: "What is the optimal routing for Sector 2B given the recent fire alerts?", type: "admin" },
  { role: "agent", content: "Based on real-time heatmaps, I recommend diverting Truck #3 from Sector 2B to Sector 4A. This avoids the fire risk zone and increases collection efficiency by 18%. Shall I update the routing schedule?", type: "admin" }
];

export default function AIAssistant() {
  const [persona, setPersona] = useState<"admin" | "collector">("collector");
  const [messages, setMessages] = useState(mockChats.filter(m => m.type === "collector"));
  const [input, setInput] = useState("");

  const handlePersonaChange = (newPersona: "admin" | "collector") => {
    setPersona(newPersona);
    setMessages(mockChats.filter(m => m.type === newPersona));
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { role: "user", content: input, type: persona };
    setMessages([...messages, newMsg]);
    setInput("");
    
    // Simulate AI typing
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "agent", 
        content: persona === "admin" ? "I am analyzing the data to provide the best recommendation..." : "मैं सबसे अच्छी सिफारिश देने के लिए जानकारी निकाल रहा हूँ...", 
        type: persona 
      }]);
    }, 1000);
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-700 h-full min-h-[calc(100vh-6rem)] md:min-h-screen flex flex-col pb-24 md:pb-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center">
            <Sparkles className="w-8 h-8 mr-3 text-primary" />
            AI Operations Agent
          </h1>
          <p className="text-foreground/60 mt-1">Intelligent support & ecosystem optimization</p>
        </div>
        <div className="flex bg-card/40 backdrop-blur-md p-1 rounded-xl border border-border/50 shadow-sm">
          <button 
            onClick={() => handlePersonaChange("collector")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${persona === "collector" ? "bg-background shadow-sm text-foreground" : "text-foreground/50 hover:text-foreground"}`}
          >
            Collector Mode
          </button>
          <button 
            onClick={() => handlePersonaChange("admin")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${persona === "admin" ? "bg-background shadow-sm text-foreground" : "text-foreground/50 hover:text-foreground"}`}
          >
            Admin Mode
          </button>
        </div>
      </header>

      <Card className="glass-panel flex-1 flex flex-col overflow-hidden border-primary/20 shadow-2xl">
        {/* Chat Messages */}
        <CardContent className="flex-1 p-6 overflow-y-auto space-y-6 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}>
              <div className={`flex items-end space-x-2 max-w-[85%] md:max-w-[70%] ${msg.role === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === "user" ? "bg-blue-500/20 text-blue-500" : "bg-primary/20 text-primary"}`}>
                  {msg.role === "user" ? <User className="w-4 h-4" /> : <BotMessageSquare className="w-4 h-4" />}
                </div>
                <div className={`p-4 rounded-2xl ${msg.role === "user" ? "bg-blue-600 text-white rounded-br-sm shadow-md" : "bg-card/80 backdrop-blur-sm border border-border/50 text-foreground rounded-bl-sm soft-shadow"}`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>

        {/* Input Area */}
        <div className="p-4 bg-black/5 dark:bg-white/5 border-t border-border/30 backdrop-blur-md">
          <div className="flex items-center space-x-3 relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={persona === "admin" ? "Ask about routing, predictions, or optimization..." : "ड्रॉप-ऑफ़ या भुगतान के बारे में पूछें..."}
              className="flex-1 bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground shadow-inner transition-all"
            />
            <Button onClick={handleSend} className="rounded-xl h-12 w-12 p-0 flex flex-shrink-0 items-center justify-center shadow-lg transition-transform hover:scale-105">
              <Send className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
