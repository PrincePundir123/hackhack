export type AIMode = "collector" | "admin";

export async function getMockAgentResponse(query: string, mode: AIMode): Promise<string> {
  // Simulate network delay for streaming effect realism
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

  const lowerQuery = query.toLowerCase();

  if (mode === "collector") {
    if (lowerQuery.includes("drop-off") || lowerQuery.includes("nearest") || lowerQuery.includes("निकटतम") || lowerQuery.includes("कहाँ")) {
      return "The nearest active scale is Node #14 (Sector 3, 1.2 km away). Status: Online. Estimated wait time: 3 mins. \n\n(सबसे नज़दीकी सक्रिय स्केल नोड #14 (सेक्टर 3, 1.2 किमी दूर) है। स्थिति: ऑनलाइन। अनुमानित प्रतीक्षा समय: 3 मिनट।)";
    }
    if (lowerQuery.includes("rate") || lowerQuery.includes("payout") || lowerQuery.includes("दर")) {
      return "Today's standard biomass payout rate is ₹2.50 per kg. A bonus of ₹0.50/kg applies for moisture content below 15%. \n\n(आज की मानक बायोमास भुगतान दर ₹2.50 प्रति किलोग्राम है। 15% से कम नमी के लिए ₹0.50/किग्रा का बोनस लागू है।)";
    }
    return "I am here to assist you with drop-offs, payouts, and scale statuses. Could you clarify your question? \n\n(मैं ड्रॉप-ऑफ़, भुगतान और स्केल स्थिति में आपकी सहायता के लिए यहाँ हूँ। क्या आप अपना प्रश्न स्पष्ट कर सकते हैं?)";
  }

  // Admin Mode
  if (lowerQuery.includes("reroute") || lowerQuery.includes("fire") || lowerQuery.includes("truck")) {
    return "[REROUTE SUGGESTION]: Divert Fleet B around Sector 2 fire corridor via Route 7A to prevent delay and hazard exposure. ETA impact: +4 mins. Approval recommended.";
  }
  if (lowerQuery.includes("shg") || lowerQuery.includes("high-yield")) {
    return "[SHG SUMMARY]: Mahila Samiti (Sector 4) is leading this week with 1,250 kg. Total active groups: 14. MoM growth: +12%.";
  }
  if (lowerQuery.includes("carbon") || lowerQuery.includes("projection")) {
    return "[PROJECTION REPORT]: Based on current burn rates, projected carbon offset for Q3 is 14,200 tons CO₂. Target trajectory is slightly ahead of schedule (+4%).";
  }
  
  return "[SYSTEM LOG]: Unrecognized command. Please query routing, yield reports, or carbon projections for automated analysis.";
}
