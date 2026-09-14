"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { LayoutDashboard, Smartphone, ActivitySquare, Leaf, Sun, Moon, BotMessageSquare } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { UserButton, Show, SignInButton } from "@clerk/nextjs";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Collector", href: "/collector", icon: Smartphone },
  { name: "Auditor", href: "/auditor", icon: ActivitySquare },
  { name: "AI Agent", href: "/ai", icon: BotMessageSquare },
];

export function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 glass-panel flex-shrink-0 hidden md:flex flex-col rounded-none rounded-r-3xl my-2 ml-2 z-10 border border-white/20 dark:border-white/10 shadow-lg">
        <div className="h-20 flex items-center px-6 border-b border-border/50">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mr-3">
            <Leaf className="w-6 h-6 text-primary" />
          </div>
          <span className="font-bold text-xl text-foreground tracking-tight">DePIN</span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 group",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold shadow-[0_4px_20px_-2px_rgba(16,185,129,0.2)]"
                    : "text-foreground/70 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5 mr-4 transition-transform group-hover:scale-110", isActive ? "text-primary" : "text-foreground/50")} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-border/50 flex flex-col space-y-4">
          <div className="flex justify-between items-center w-full px-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-foreground/70"
              aria-label="Toggle Dark Mode"
            >
              <Sun className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute w-5 h-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </button>
            <div className="text-xs text-foreground/50 font-medium">v3.0 • L2</div>
          </div>
          
          {/* Clerk Profile */}
          <div className="flex items-center justify-between bg-black/5 dark:bg-white/5 p-2 rounded-xl border border-border/30">
            <Show when="signed-in">
              <div className="flex items-center space-x-2 w-full justify-between px-2">
                <span className="text-sm font-medium text-foreground/80">Account</span>
                <UserButton afterSignOutUrl="/sign-in" />
              </div>
            </Show>
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="w-full py-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </Show>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full glass-panel rounded-none rounded-t-2xl z-50 px-2 py-3 border-t border-white/20 dark:border-white/10 flex justify-around items-center pb-safe">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-2 transition-all duration-300",
                isActive ? "text-primary scale-110" : "text-foreground/60"
              )}
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex flex-col items-center justify-center p-2 text-foreground/60 transition-colors"
        >
          <Sun className="w-6 h-6 mb-1 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute w-6 h-6 top-[10px] left-1/2 -translate-x-1/2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="text-[10px] font-medium">Theme</span>
        </button>
        <div className="flex flex-col items-center justify-center p-2 text-foreground/60 transition-colors">
          <Show when="signed-in">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <UserButton afterSignOutUrl="/sign-in" />
            </div>
            <span className="text-[10px] font-medium">Profile</span>
          </Show>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="flex flex-col items-center justify-center">
                <div className="w-6 h-6 flex items-center justify-center mb-1 rounded-full bg-primary/20 text-primary">
                  <span className="text-xs">?</span>
                </div>
                <span className="text-[10px] font-medium text-primary">Sign In</span>
              </button>
            </SignInButton>
          </Show>
        </div>
      </nav>
    </>
  );
}
