import { NextRequest, NextResponse } from "next/server";
import {
  LeadRateLimitError,
  LeadValidationError,
  submitLead,
} from "@/lib/server/leadService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await submitLead(body, request.headers);
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    if (error instanceof LeadValidationError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 },
      );
    }

    if (error instanceof LeadRateLimitError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 429 },
      );
    }

    console.error("Error in /api/leads:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit lead" },
      { status: 500 },
    );
  }
}
