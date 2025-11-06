import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone } = body;

    // The correct URL for API Campaigns
    const response = await fetch(
      "https://backend.aisensy.com/campaign/t1/api/v2",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: process.env.AISENSY_API_KEY,
          
          campaignName: "vitu_intro", 
          
          destination: `91${phone}`,
          userName: name || "User",
          source: "vitu_intro",
          
          // 👇 ADD THIS BACK IN AND FILL IT OUT!
          // Assume your template has at least one variable for the name.
          templateParams: [name || "User"], 
          
          // If your template has more variables, you must include them here
          // in the correct order, e.g., templateParams: [name, "some_value_for_{{2}}", ...]
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

    // Check for AiSensy's specific error format
    if (data.status === "error") {
      console.error("AiSensy API Error:", data.message);
      return NextResponse.json(
        { success: false, error: data.message },
        { status: 400 } // Use 400 for a bad request
      );
    }
    
    // Handle non-OK HTTP responses
    if (!response.ok) {
      return NextResponse.json({ success: false, error: data }, { status: response.status });
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