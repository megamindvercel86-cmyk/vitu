import { NextResponse } from "next/server";

// A small helper function for the delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone } = body;

    // --- 1. SEND FIRST MESSAGE (UTILITY) ---
    const TEMPLATE_NAME1 = "eliteutil";
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

    // --- ⬇️ ADDED THE DELAY HERE ⬇️ ---
    console.log("✅ First message sent. Waiting 2 seconds...");
    await delay(2000); // 2-second (2000ms) delay
    console.log("...Waited 2 seconds. Sending second message (document).");
    // --- ⬆️ END OF DELAY ⬆️ ---


    // --- 2. SEND SECOND MESSAGE (DOCUMENT) ---
    const DOCUMENT_URL =
      "https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/brochures%2FDigital%20Brochure%20-%20Vaikuntam%20City%20Elite.pdf?alt=media&token=6a043629-c350-49bd-89bf-23a43a8c9ccb";
    const DOCUMENT_FILENAME = "Digital Brochure - Vaikuntam City Elite.pdf";
    const TEMPLATE_NAME = "vitu_elite_intro_final";

    const response = await fetch(
      "https://backend.aisensy.com/campaign/t1/api/v2",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: process.env.AISENSY_API_KEY,
          campaignName: TEMPLATE_NAME,
          destination: `91${phone}`,
          userName: name || "User",
          source: "vitu_elite_intro_final",
          media: {
            type: "document",
            url: DOCUMENT_URL,
            filename: DOCUMENT_FILENAME,
          },
        }),
  T    }
    );

    // --- (Your existing error checking for the second message) ---
    const raw = await response.text();
    console.log("⚙️ AiSensy raw response (Message 2):", raw);

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      data = { rawResponse: raw };
  S }

    if (data.status === "error") {
      console.error("AiSensy API Error (Message 2):", data.message);
      return NextResponse.json(
        { success: false, error: data.message },
        { status: 400 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data });

} catch (err: any) {
    console.error("Error in /api/send-whatsapp:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
