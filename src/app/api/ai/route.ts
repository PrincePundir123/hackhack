import { GoogleGenAI } from '@google/genai';
import { NextRequest } from "next/server";

// Initialize the Gemini client
// Note: It automatically picks up GEMINI_API_KEY from the environment
const ai = new GoogleGenAI({});

export async function POST(req: NextRequest) {
  try {
    const { message, mode, contextData } = await req.json();

    let systemInstruction = "";
    if (mode === "collector") {
      systemInstruction = "You are Kisan Mitra, an operational assistant for rural biomass collection in India. Assist workers with nearby drop-off scale guidance, scale operation steps, and earnings estimation. Keep sentences brief, practical, and provide Hindi translation where helpful.";
    } else {
      systemInstruction = "You are the Biochar Logistics Optimization Engine. Analyze real-time biomass throughput, flag fire hazard corridors, suggest truck reroutes, and compute carbon offset conversions (1 ton dry biomass ~ 0.5 tons biochar ~ 1.5 tons CO2e sequestered).";
    }

    // Call the streaming API
    const responseStream = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction,
      }
    });

    // Create a ReadableStream to pipe the chunks to the client
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of responseStream) {
          if (chunk.text) {
            controller.enqueue(new TextEncoder().encode(chunk.text));
          }
        }
        controller.close();
      }
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate AI response." }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
