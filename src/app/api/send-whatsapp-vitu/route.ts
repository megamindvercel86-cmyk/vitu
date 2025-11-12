import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone } = body;
    const TEMPLATE_NAME1 = "eliteutil";
    // The correct URL for API Campaigns
    const response1 = await fetch("https://backend.aisensy.com/campaign/t1/api/v2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: process.env.AISENSY_API_KEY,
        campaignName: TEMPLATE_NAME1, // Using the doc template name
        destination: `91${phone}`,
        userName: name || "User",
        source: TEMPLATE_NAME1,
        templateParams: [name || "User"], // For the text body variable
        media: {
          type: "text",
        },
      }),
    });


   const raw1 = await response1.text();

   

    // --- ⬇️ YOUR PDF DETAILS ARE ADDED HERE ⬇️ ---

    // 3. The template name (must match your approved doc template)
    const TEMPLATE_NAME = "vitu_realty_main";

    // --- ⬆️ END OF PDF DETAILS ⬆️ ---

    // The correct URL for API Campaigns
    const response = await fetch("https://backend.aisensy.com/campaign/t1/api/v2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: process.env.AISENSY_API_KEY,
        campaignName: TEMPLATE_NAME, // Using the doc template name
        destination: `91${phone}`,
        userName: name || "User",
        source: TEMPLATE_NAME,
        // templateParams: [name || "User"], // For the text body variable

        // 4. The 'media' object pointing to your PDF
        media: {
          type: "text",
        },
      }),
    });

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
      return NextResponse.json({ success: false, error: data.message }, { status: 400 });
    }

    if (!response.ok) {
      return NextResponse.json({ success: false, error: data }, { status: response.status });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("Error in /api/send-whatsapp:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
