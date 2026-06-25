import { NextResponse } from "next/server";

const ACCELR_WEBHOOK_URL =
  process.env.ACCELR_WEBHOOK_URL ||
  "https://v1.accelr.app/api/webhook/unified?accountId=eMRdjeicbuLuXMFp3l5a&source=website";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Forward to old webhook (flat format)
    let flatBody = body;
    if (body.data && typeof body.data === "object") {
      flatBody = {
        ...body.data,
        pageUrl: body.pageUrl,
      };
    }

    const oldResponsePromise = fetch(ACCELR_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(flatBody),
    }).then(async (res) => {
      if (!res.ok) {
        console.error(`[proxy] Old Accelr API responded with status: ${res.status}`);
      }
    }).catch((err) => {
      console.error("[proxy] Old Accelr webhook error:", err);
    });

    // 2. Forward to the new capture API
    const trackingKey = body.trackingKey || process.env.ACCELR_TRACKING_KEY || "cmqtdy55d000l2rou4mduua2i";

    let formattedBody = body;
    if (!body.trackingKey && !body.data) {
      const name = body.fullName || body.name || body.email || "Lead";
      const email = body.email || "";
      const phone = body.phone || "";

      formattedBody = {
        trackingKey,
        data: {
          name,
          email,
          phone,
          ...body,
        },
        pageUrl: body.pageUrl || req.headers.get("referer") || "https://viturealty.com",
      };
    } else if (body.data && !body.trackingKey) {
      formattedBody = {
        trackingKey,
        ...body,
      };
    }

    const newResponsePromise = fetch("https://app.accelr.app/api/leads/capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedBody),
    }).then(async (res) => {
      if (!res.ok) {
        const raw = await res.text().catch(() => "");
        throw new Error(`New Accelr capture API responded with status: ${res.status} ${raw}`);
      }
      return res.json().catch(() => ({}));
    });

    // Wait for both
    const [, newData] = await Promise.all([oldResponsePromise, newResponsePromise]);

    return NextResponse.json(newData || { success: true }, { status: 200 });
  } catch (error) {
    console.error("Error in Accelr webhook proxy:", error);
    return NextResponse.json({ error: "Failed to forward webhook" }, { status: 500 });
  }
}
