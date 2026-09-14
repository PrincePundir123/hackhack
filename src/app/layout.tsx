import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Web3Provider } from "@/providers/web3-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DePIN Core Dashboard",
  description: "Decentralized Physical Infrastructure Network for Climate Tech",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen overflow-hidden bg-background text-foreground transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Web3Provider>
            <div className="flex flex-col md:flex-row w-full h-screen relative">
              <Navigation />
              <main className="flex-1 overflow-y-auto pb-16 md:pb-0 z-0">
                {children}
              </main>
            </div>
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
