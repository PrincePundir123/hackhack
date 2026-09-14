export const USDC_ADDRESS_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
export const BATCH_PAYOUT_CONTRACT = "0x1234567890123456789012345678901234567890";

export const usdcAbi = [
  {
    constant: false,
    inputs: [
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" }
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
] as const;

export const batchPayoutAbi = [
  {
    constant: false,
    inputs: [
      { name: "token", type: "address" },
      { name: "recipients", type: "address[]" },
      { name: "values", type: "uint256[]" }
    ],
    name: "disperseToken",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
] as const;
