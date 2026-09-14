"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { QrCode, RefreshCw } from "lucide-react";
import QRCode from "react-qr-code";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../context/LanguageContext";

export function QrGenerator() {
  const { lang } = useLanguage();
  const [showQR, setShowQR] = useState(false);
  const [sessionToken, setSessionToken] = useState("live-token-123");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const qrPayload = {
    collectorId: "SHG-042",
    sessionToken: sessionToken,
    timestamp: new Date().toISOString(),
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setSessionToken(`live-token-${Math.floor(Math.random() * 10000)}`);
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="mt-6 space-y-6">
      <Button 
        onClick={() => setShowQR(!showQR)}
        className="w-full min-h-[56px] text-lg rounded-2xl shadow-[0_4px_20px_rgba(16,185,129,0.25)] dark:shadow-[0_4px_20px_rgba(16,185,129,0.15)] active:scale-95 transition-all"
      >
        <QrCode className="w-5 h-5 mr-2" />
        {showQR ? (lang === "EN" ? "Hide Deposit QR" : "QR छुपाएं") : (lang === "EN" ? "Show Deposit QR Code" : "डिपॉजिट QR कोड दिखाएं")}
      </Button>

      {showQR && (
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="glass-panel overflow-hidden border-primary/30 shadow-2xl relative group">
            {/* Glowing Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-primary/20 opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <CardContent className="p-8 flex flex-col items-center text-center relative z-10">
              <div className="p-4 bg-white rounded-3xl mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)] relative">
                <QRCode 
                  value={JSON.stringify(qrPayload)} 
                  size={180} 
                  level="Q"
                  className="mx-auto"
                />
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <p className="text-sm text-foreground/80 font-medium px-4">
                  {lang === "EN" ? "Scan at IoT scale to securely link your deposit." : "अपनी जमा राशि को सुरक्षित रूप से लिंक करने के लिए IoT स्केल पर स्कैन करें।"}
                </p>
                
                <button 
                  onClick={handleRefresh}
                  className="flex items-center space-x-2 px-4 py-2 min-h-[44px] rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-xs font-medium text-foreground/70 active:scale-95"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                  <span>{lang === "EN" ? "Refresh Token" : "नया टोकन लें"}</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      )}
    </div>
  );
}
