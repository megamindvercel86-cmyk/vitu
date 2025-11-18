import { NextResponse } from "next/server";

// A small helper function for the delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone } = body;

    // --- 1. SEND FIRST MESSAGE (UTILITY) ---
    const TEMPLATE_NAME1 = "eliteutil1";
    const response1 = await fetch("https://backend.aisensy.com/campaign/t1/api/v2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: process.env.AISENSY_API_KEY,
        campaignName: TEMPLATE_NAME1,
        destination: `91${phone}`,
        userName: name || "User",
        source: TEMPLATE_NAME1,
        templateParams: [name || "User"],
        media: { type: "text" },
      }),
    });

    const raw1 = await response1.text();
    console.log("⚙️ AiSensy raw response (Message 1):", raw1);

    // --- ADDED ERROR CHECKING FOR FIRST MESSAGE ---
    if (!response1.ok) {
      let errorData;
      try {
        errorData = JSON.parse(raw1);
      } catch {
        errorData = { rawResponse: raw1 };
      }
      console.error("Error sending first message:", errorData);
      // Stop here if the first message failed
      return NextResponse.json(
        { success: false, error: "Failed to send first message", details: errorData },
        { status: response1.status }
      );
    }

   


} catch (err: any) {
    console.error("Error in /api/send-whatsapp:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
