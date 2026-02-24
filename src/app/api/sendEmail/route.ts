import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { fullName, email, phone, comments, whatsapp, interstedIn, postionAppliedFor, page, resumeUrl,interestedIn } = await req.json();
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      return NextResponse.json({ message: "Email service is not configured" }, { status: 500 });
    }

    // Define the path to the HTML template
    let templateFile = "";
    switch (page) {
      case "General Enquire":
        templateFile = "Form for General Enquiries - Template (1).html";
        break;
      case "Project Enquire":
        templateFile = "Form for Project Enquiries-Template.html";
        break;
      case "Career Application":
        templateFile = "Form for Career Application.html";
        break;
      default:
        throw new Error("Invalid form type");
    }

    // Define the path to the HTML template
    const templatePath = path.join(process.cwd(), "emailTemplates", templateFile);

    // Read the selected HTML template file
    let emailTemplate = await fs.readFile(templatePath, "utf-8");

    // Replace placeholders with actual form data
    emailTemplate = emailTemplate
      .replace("[Name from General EnquiriesForm]", fullName)
      .replace("[Email from General Enquiries Form]", email)
      .replace("[Phone from General Enquiries Form]", phone)
      .replace("[Comments if any from General Enquiries Form]", comments || "")
      .replace("[Name from Project Enquiry Form]", fullName)
      .replace("[Email from Project Enquiry Form]", email)
      .replace("[Phone from Project Enquiry Form]", phone)
      .replace("[Field selected from Project Enquiry Form]", interstedIn || "" || interestedIn)
      .replace("[Name from Career Application Form]", fullName)
      .replace("[Email from Career ApplicationForm]", email)
      .replace("[Phone from Career Application Form]", phone)
      .replace("[Role selected from Career Application Form]", postionAppliedFor)
      .replace("[resumeLink]", resumeUrl);

    // Add resume link for Career Application emails
    // if (page === "Career Application" && resumeUrl) {
    //   emailTemplate += `<p><strong>Resume:</strong> <a href="${resumeUrl}" target="_blank" style="color: #007bff;">View Resume</a></p>`;
    // }

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Define the email subject based on the form type
    const subject = `You got a ${page}`;

    // Send email
    if (page === "Career Application") {
      await transporter.sendMail({
        from: `${email}`,
        to: "hr@viturealty.com", // Replace with the recipient's email
        subject,
        html: emailTemplate,
      });
    }else{
      await transporter.sendMail({
        from: `${email}`,
        to: "info@viturealty.com", // Replace with the recipient's email
        subject,
        html: emailTemplate,
      });
    }

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ message: "Failed to send email", error }, { status: 500 });
  }
}
