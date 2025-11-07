import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone } = body;

    console.log(name, phone, "phone");

    // --- ⬇️ YOUR PDF DETAILS ARE ADDED HERE ⬇️ ---

    // 1. Your Firebase Storage URL
    const DOCUMENT_URL =
      "https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/brochures%2FDigital%20Brochure%20-%20Vaikuntam%20City%20Elite.pdf?alt=media&token=6a043629-c350-49bd-89bf-23a43a8c9ccb";
    
    // 2. The filename the user will see
    const DOCUMENT_FILENAME = "Digital Brochure - Vaikuntam City Elite.pdf";

    // 3. The template name (must match your approved doc template)
    const TEMPLATE_NAME = "vitu_elite_intro_final";

    // --- ⬆️ END OF PDF DETAILS ⬆️ ---


    // The correct URL for API Campaigns
    const response = await fetch(
      "https://backend.aisensy.com/campaign/t1/api/v2",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: process.env.AISENSY_API_KEY,
          campaignName: TEMPLATE_NAME, // Using the doc template name
          destination: `91${phone}`,
          userName: name || "User",
          source: "vitu_elite_intro_final", 
          // templateParams: [name || "User"], // For the text body variable

          // 4. The 'media' object pointing to your PDF
          media: {
            type: "document",
            url: DOCUMENT_URL,
            filename: DOCUMENT_FILENAME,
          },
        }),
      }
    );

    const raw = await response.text();
    console.log("⚙️ AiSensy raw response:", raw);

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      data = { rawResponse: raw };
    }

    if (data.status === "error") {
      console.error("AiSensy API Error:", data.message);
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
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}