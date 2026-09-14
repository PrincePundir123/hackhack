import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Abstract Background Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 p-8 rounded-3xl glass-card bg-white/5 dark:bg-black/10 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col items-center">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Join DePIN</h1>
          <p className="text-foreground/60 mt-2">Create an account to join the network.</p>
        </div>
        <SignUp 
          appearance={{
            elements: {
              formButtonPrimary: "bg-primary hover:bg-primary/90 text-white shadow-md",
              card: "bg-transparent shadow-none",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "border-border/50 bg-background/50 text-foreground hover:bg-background/80",
              dividerLine: "bg-border/50",
              dividerText: "text-foreground/50",
              formFieldLabel: "text-foreground/80",
              formFieldInput: "bg-background/50 border-border/50 text-foreground focus:ring-primary/50",
              footerActionText: "text-foreground/70",
              footerActionLink: "text-primary hover:text-primary/80"
            }
          }}
        />
      </div>
    </div>
  );
}
