import { NextResponse } from "next/server";

const ACCELR_WEBHOOK_URL =
  process.env.ACCELR_WEBHOOK_URL ||
  "https://v1.accelr.app/api/webhook/unified?accountId=eMRdjeicbuLuXMFp3l5a&source=website";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(ACCELR_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Accelr API responded with status: ${response.status}`);
    }

    const data = await response.json().catch(() => ({})); // Handle cases where response might be empty
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in Accelr webhook proxy:", error);
    return NextResponse.json({ error: "Failed to forward webhook" }, { status: 500 });
  }
}
