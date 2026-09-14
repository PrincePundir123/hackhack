"use client";

import { Leaf, Globe } from "lucide-react";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { UserButton, Show, SignInButton } from "@clerk/nextjs";

function CollectorHeader() {
  const { lang, toggleLang } = useLanguage();

  return (
    <header className="p-4 md:p-6 border-b border-border/30 flex justify-between items-center bg-card/60 backdrop-blur-xl sticky top-0 z-50 shadow-sm min-h-[72px]">
      <div className="flex items-center space-x-2">
        <Leaf className="w-6 h-6 text-primary" />
        <span className="font-bold text-xl text-foreground tracking-wider">DePIN<span className="text-primary">App</span></span>
      </div>
      <div className="flex items-center space-x-3">
        <button 
          onClick={toggleLang}
          className="flex items-center justify-center space-x-1 px-3 min-w-[44px] min-h-[44px] rounded-full border border-border/50 bg-background text-xs font-medium text-foreground/80 hover:text-foreground transition-colors active:scale-95"
          aria-label="Toggle Language"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{lang === "EN" ? "EN" : "HI"}</span>
        </button>
        <Show when="signed-in">
          <div className="flex items-center justify-center min-w-[44px] min-h-[44px]">
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </Show>
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="flex items-center justify-center px-3 min-h-[44px] rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors active:scale-95 text-xs font-medium">
              Sign In
            </button>
          </SignInButton>
        </Show>
      </div>
    </header>
  );
}

export default function CollectorLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <div className="min-h-full flex justify-center bg-background w-full">
        <div className="w-full max-w-md bg-background min-h-screen relative flex flex-col border-x border-border/10 shadow-2xl">
          <CollectorHeader />
          <div className="flex-1 overflow-y-auto hide-scrollbar relative z-0">
            {children}
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
}
