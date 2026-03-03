import { NextResponse } from "next/server";
import {
  sendFormEmail,
  type SupportedEmailPage,
} from "@/lib/server/emailService";

const VALID_PAGES: ReadonlySet<SupportedEmailPage> = new Set([
  "General Enquire",
  "Project Enquire",
  "Career Application",
]);

const asString = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const page = asString(body.page) as SupportedEmailPage;

    if (!VALID_PAGES.has(page)) {
      return NextResponse.json(
        { message: "Invalid form type" },
        { status: 400 },
      );
    }

    const fullName = asString(body.fullName);
    const email = asString(body.email);
    const phone = asString(body.phone);

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { message: "fullName, email and phone are required" },
        { status: 400 },
      );
    }

    await sendFormEmail({
      page,
      fullName,
      email,
      phone,
      comments: asString(body.comments),
      interstedIn: asString(body.interstedIn),
      interestedIn: asString(body.interestedIn),
      postionAppliedFor: asString(body.postionAppliedFor),
      resumeUrl: asString(body.resumeUrl),
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 },
    );
  }
}
