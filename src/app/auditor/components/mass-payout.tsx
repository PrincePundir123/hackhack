"use client";

import { useState } from "react";
import { useAccount, useConnect, useWriteContract } from "wagmi";
import { parseUnits } from "viem";
import { ShieldCheck, Wallet, Loader2, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { USDC_ADDRESS_BASE, BATCH_PAYOUT_CONTRACT, usdcAbi, batchPayoutAbi } from "@/lib/web3/contracts";

export interface PayoutTarget {
  address: `0x${string}`;
  amountUSDC: string;
}

export function MassPayoutPanel({ targets }: { targets: PayoutTarget[] }) {
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const mockConnector = connectors[0]; // Assuming mock connector is the first one

  const totalUSDC = targets.reduce((acc, t) => acc + parseFloat(t.amountUSDC), 0).toFixed(2);

  const [step, setStep] = useState<"idle" | "approving" | "dispersing" | "success">("idle");
  const [txHash, setTxHash] = useState<string | null>(null);

  const { writeContractAsync: writeApprove } = useWriteContract();
  const { writeContractAsync: writeDisperse } = useWriteContract();

  const handlePayout = async () => {
    try {
      setStep("approving");
      const totalAmountParsed = parseUnits(totalUSDC, 6);
      
      await writeApprove({
        address: USDC_ADDRESS_BASE as `0x${string}`,
        abi: usdcAbi,
        functionName: "approve",
        args: [BATCH_PAYOUT_CONTRACT as `0x${string}`, totalAmountParsed],
      });
      
      setStep("dispersing");

      const addresses = targets.map(t => t.address);
      const values = targets.map(t => parseUnits(t.amountUSDC, 6));

      const disperseHash = await writeDisperse({
        address: BATCH_PAYOUT_CONTRACT as `0x${string}`,
        abi: batchPayoutAbi,
        functionName: "disperseToken",
        args: [USDC_ADDRESS_BASE as `0x${string}`, addresses, values],
      });

      setTxHash(disperseHash);
      setStep("success");
    } catch (error) {
      console.error(error);
      setStep("idle");
    }
  };

  if (!isConnected) {
    return (
      <Card className="glass-panel overflow-hidden relative border-blue-500/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <CardContent className="p-8 md:p-10 flex flex-col items-center justify-center relative z-10 space-y-4">
          <Wallet className="w-10 h-10 text-blue-500 mb-2" />
          <h2 className="text-xl font-bold text-foreground">Connect Wallet for Payouts</h2>
          <p className="text-foreground/50 text-sm">You must connect a Web3 wallet to execute mass payouts.</p>
          <Button 
            onClick={() => connect({ connector: mockConnector })}
            className="mt-4 h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-[0_4px_20px_rgba(37,99,235,0.25)] border-none"
          >
            Connect Wallet
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-panel overflow-hidden relative border-blue-500/20">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <CardContent className="p-8 md:p-10 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
         <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
           <span className="text-sm font-semibold text-blue-500 tracking-wider uppercase mb-2">Pending L2 Payouts</span>
           <div className="flex items-baseline space-x-2">
             <span className="text-5xl font-bold text-foreground">{totalUSDC}</span>
             <span className="text-xl text-foreground/50 font-medium">USDC</span>
           </div>
           <p className="text-sm text-foreground/50 mt-2">{targets.length} rural collectors awaiting distribution</p>
         </div>
         
         <div className="w-full md:w-auto flex flex-col items-center md:items-end">
           {step === "success" ? (
             <div className="flex flex-col items-center md:items-end space-y-2">
               <div className="flex items-center text-emerald-500 font-medium bg-emerald-500/10 px-4 py-2 rounded-lg">
                 <CheckCircle2 className="w-5 h-5 mr-2" />
                 Payout Successful
               </div>
               {txHash && (
                 <a href={`https://basescan.org/tx/${txHash}`} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline">
                   View on Explorer: {txHash.slice(0,6)}...{txHash.slice(-4)}
                 </a>
               )}
             </div>
           ) : (
             <Button 
                onClick={handlePayout}
                disabled={step !== "idle"}
                className="w-full md:w-auto h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-[0_8px_30px_rgba(37,99,235,0.3)] rounded-xl transition-all hover:scale-[1.02] border-none disabled:opacity-50 disabled:hover:scale-100"
              >
                {step === "idle" ? <ShieldCheck className="w-5 h-5 mr-2" /> : <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
                {step === "idle" ? "Execute Mass Payout" : step === "approving" ? "Approving USDC..." : "Dispersing..."}
              </Button>
           )}
         </div>
      </CardContent>
    </Card>
  );
}
