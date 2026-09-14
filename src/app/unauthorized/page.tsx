import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Abstract Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 p-10 rounded-3xl glass-card bg-white/5 dark:bg-black/10 backdrop-blur-xl border border-red-500/20 shadow-2xl flex flex-col items-center text-center max-w-md w-full">
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
          <ShieldAlert className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">Access Denied</h1>
        <p className="text-foreground/70 mb-8">
          You do not have the required role to access this portal. If you believe this is a mistake, contact your administrator.
        </p>
        
        <div className="flex flex-col space-y-3 w-full">
          <Link 
            href="/ai"
            className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-md"
          >
            Return to Safe Zone (/ai)
          </Link>
          <div className="w-full">
            <SignOutButton>
              <button className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 text-foreground hover:bg-black/10 dark:hover:bg-white/10 transition-colors border border-border/50">
                Sign Out & Switch Account
              </button>
            </SignOutButton>
          </div>
        </div>
      </div>
    </div>
  );
}
