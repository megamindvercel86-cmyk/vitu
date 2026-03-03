import nodemailer from "nodemailer";
import { promises as fs } from "fs";
import path from "path";

export type SupportedEmailPage =
  | "General Enquire"
  | "Project Enquire"
  | "Career Application";

export interface SendFormEmailInput {
  page: SupportedEmailPage;
  fullName: string;
  email: string;
  phone: string;
  comments?: string;
  interstedIn?: string;
  interestedIn?: string;
  postionAppliedFor?: string;
  resumeUrl?: string;
}

const TEMPLATE_BY_PAGE: Record<SupportedEmailPage, string> = {
  "General Enquire": "Form for General Enquiries - Template (1).html",
  "Project Enquire": "Form for Project Enquiries-Template.html",
  "Career Application": "Form for Career Application.html",
};

const sanitizeTemplateValue = (value: string | undefined): string => {
  if (!value) return "";
  return value.replace(/\r?\n/g, " ").trim();
};

const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const getTransporter = () => {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    throw new Error("Email service is not configured");
  }

  return {
    smtpUser,
    transporter: nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    }),
  };
};

export const sendFormEmail = async (input: SendFormEmailInput): Promise<void> => {
  const templateFile = TEMPLATE_BY_PAGE[input.page];
  const templatePath = path.join(process.cwd(), "emailTemplates", templateFile);
  const { smtpUser, transporter } = getTransporter();

  let emailTemplate = await fs.readFile(templatePath, "utf-8");

  emailTemplate = emailTemplate
    .replace(
      "[Name from General EnquiriesForm]",
      sanitizeTemplateValue(input.fullName),
    )
    .replace(
      "[Email from General Enquiries Form]",
      sanitizeTemplateValue(input.email),
    )
    .replace(
      "[Phone from General Enquiries Form]",
      sanitizeTemplateValue(input.phone),
    )
    .replace(
      "[Comments if any from General Enquiries Form]",
      sanitizeTemplateValue(input.comments),
    )
    .replace("[Name from Project Enquiry Form]", sanitizeTemplateValue(input.fullName))
    .replace("[Email from Project Enquiry Form]", sanitizeTemplateValue(input.email))
    .replace("[Phone from Project Enquiry Form]", sanitizeTemplateValue(input.phone))
    .replace(
      "[Field selected from Project Enquiry Form]",
      sanitizeTemplateValue(input.interestedIn || input.interstedIn),
    )
    .replace("[Name from Career Application Form]", sanitizeTemplateValue(input.fullName))
    .replace("[Email from Career ApplicationForm]", sanitizeTemplateValue(input.email))
    .replace("[Phone from Career Application Form]", sanitizeTemplateValue(input.phone))
    .replace(
      "[Role selected from Career Application Form]",
      sanitizeTemplateValue(input.postionAppliedFor),
    )
    .replace("[resumeLink]", sanitizeTemplateValue(input.resumeUrl));

  const to =
    input.page === "Career Application" ? "hr@viturealty.com" : "info@viturealty.com";

  await transporter.sendMail({
    from: smtpUser,
    replyTo: isValidEmail(input.email) ? input.email : undefined,
    to,
    subject: `You got a ${input.page}`,
    html: emailTemplate,
  });
};
