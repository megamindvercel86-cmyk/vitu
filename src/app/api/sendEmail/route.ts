import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const {
      fullName,
      email,
      phone,
      comments,
      whatsapp,
      interestedIn,
      postionApplyingfor,
      page,
      resumeUrl,
    } = await req.json();

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jamshadjamshu596@gmail.com", // Your email
        pass: "nztt vokk ngpx kbgo", // App password
      },
    });

    // Define the email subject based on the form type
    const subject = `You got a ${page}`;

    // Define the email message in a standardized format
    const message = `
    <p><strong>You got a:</strong> ${page}</p>
      <p><strong>Full Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      ${
        page === "General Enquire"
          ? `
        <p><strong>WhatsApp:</strong> ${whatsapp ? "Yes" : "No"}</p>
        <p><strong>Comments:</strong> ${comments}</p>
      `
          : page === "Project Enquire"
            ? `
        <p><strong>Interested In:</strong> ${interestedIn}</p>
      `
            : `
        <p><strong>Position Applying For:</strong> ${postionApplyingfor}</p>
        <p><strong>Resume:</strong> <a href="${resumeUrl}" target="_blank" style="color: #007bff;">View Resume</a></p>
      `
      }
    `;

    // Send email
    await transporter.sendMail({
      from: `${email}`,
      to: "developer.megamind@gmail.com", // Replace with the recipient's email
      subject,
      html: message,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
