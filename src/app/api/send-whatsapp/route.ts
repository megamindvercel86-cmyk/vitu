import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone } = body;

    const templateName = "eliteutil1";
    const response = await fetch("https://backend.aisensy.com/campaign/t1/api/v2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: process.env.AISENSY_API_KEY,
        campaignName: templateName,
        destination: `91${phone}`,
        userName: name || "User",
        source: templateName,
        templateParams: [name || "User"],
        media: { type: "text" },
      }),
    });

    const raw = await response.text();
    let data: unknown;

    try {
      data = JSON.parse(raw);
    } catch {
      data = { rawResponse: raw };
    }

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to send WhatsApp message", details: data },
        { status: response.status },
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err: any) {
    console.error("Error in /api/send-whatsapp:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
