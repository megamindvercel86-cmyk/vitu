import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import type { LeadIntent, LeadMetaPayload, LeadUtmPayload } from "@/lib/leadApi";
import { sendFormEmail } from "@/lib/server/emailService";

const ACCELR_WEBHOOK_URL =
  process.env.ACCELR_WEBHOOK_URL || "https://www.accelr.app/api/webhook/unified?accountId=eMRdjeicbuLuXMFp3l5a&source=website";
const PABBLY_WEBHOOK_URL =
  process.env.PABBLY_WEBHOOK_URL || "https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjUwNTZiMDYzMDA0MzQ1MjZmNTUzNzUxMzMi_pc";
const AISENSY_URL = "https://backend.aisensy.com/campaign/t1/api/v2";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const VALID_INTENTS: ReadonlySet<LeadIntent> = new Set([
  "generalEnquire",
  "projectEnquire",
  "careerApplication",
  "vaikuntamCityElite",
  "vilasamLanding",
  "projectModal",
  "vaikuntamCityExplore",
  "newsletterSignup",
  "vilasamHomeBuyersLanding",
  "vilasamInvestors",
]);

export class LeadValidationError extends Error {}
export class LeadRateLimitError extends Error {}

interface NormalizedLeadRequest {
  intent: LeadIntent;
  payload: Record<string, unknown>;
  utm: LeadUtmPayload;
  meta: LeadMetaPayload;
}

export interface LeadSubmitResult {
  collectionName: string;
  documentId: string;
}

const asString = (value: unknown): string => (typeof value === "string" ? value.trim() : typeof value === "number" ? String(value) : "");

const asBoolean = (value: unknown, fallback = false): boolean => (typeof value === "boolean" ? value : fallback);

const asStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
};

const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const normalizePhone = (value: unknown): string => {
  const digits = asString(value).replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }
  return digits;
};

const ensureObject = (value: unknown, message = "Invalid request body."): Record<string, unknown> => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new LeadValidationError(message);
  }
  return value as Record<string, unknown>;
};

const requireString = (value: unknown, fieldName: string): string => {
  const normalized = asString(value);
  if (!normalized) {
    throw new LeadValidationError(`${fieldName} is required.`);
  }
  return normalized;
};

const requireEmail = (value: unknown): string => {
  const email = requireString(value, "Email");
  if (!isValidEmail(email)) {
    throw new LeadValidationError("Please provide a valid email address.");
  }
  return email;
};

const requirePhone = (value: unknown): string => {
  const phone = normalizePhone(value);
  if (phone.length < 10) {
    throw new LeadValidationError("Please provide a valid phone number.");
  }
  return phone;
};

const cleanObject = (obj: Record<string, unknown>): Record<string, unknown> => {
  const filteredEntries = Object.entries(obj).filter(([, value]) => value !== undefined);
  return Object.fromEntries(filteredEntries);
};

const currentTime = (): number => Date.now();

const getClientIp = (headers: Headers): string => {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  const realIp = headers.get("x-real-ip");
  return realIp || "unknown";
};

const enforceRateLimit = (headers: Headers): void => {
  const ip = getClientIp(headers);
  const now = currentTime();
  const existingEntry = rateLimitStore.get(ip);

  if (!existingEntry || existingEntry.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return;
  }

  if (existingEntry.count >= RATE_LIMIT_MAX_REQUESTS) {
    throw new LeadRateLimitError("Too many requests. Please try again in a few minutes.");
  }

  existingEntry.count += 1;
  rateLimitStore.set(ip, existingEntry);
};

const normalizeUtm = (value: unknown): LeadUtmPayload => {
  const source = ensureObject(value || {}, "Invalid UTM payload.");
  return {
    utm_source: asString(source.utm_source) || "direct",
    utm_medium: asString(source.utm_medium),
    utm_campaign: asString(source.utm_campaign),
    utm_term: asString(source.utm_term),
    utm_content: asString(source.utm_content),
    campaign_id: asString(source.campaign_id),
    ad_id: asString(source.ad_id),
    ad_group_id: asString(source.ad_group_id),
    device: asString(source.device),
  };
};

const normalizeMeta = (value: unknown): LeadMetaPayload => {
  const source = ensureObject(value || {}, "Invalid meta payload.");
  return {
    formName: asString(source.formName),
    collectionName: asString(source.collectionName),
  };
};

const normalizeLeadRequest = (body: unknown): NormalizedLeadRequest => {
  const requestBody = ensureObject(body);
  const intent = asString(requestBody.intent) as LeadIntent;

  if (!VALID_INTENTS.has(intent)) {
    throw new LeadValidationError("Invalid lead intent.");
  }

  return {
    intent,
    payload: ensureObject(requestBody.payload, "Invalid lead payload."),
    utm: normalizeUtm(requestBody.utm),
    meta: normalizeMeta(requestBody.meta),
  };
};

const persistLead = async (collectionName: string, data: Record<string, unknown>): Promise<LeadSubmitResult> => {
  const document = cleanObject({
    ...data,
    createdAt: serverTimestamp(),
  });
  const reference = await addDoc(collection(db, collectionName), document);
  return { collectionName, documentId: reference.id };
};

const safeIntegration = async (integrationName: string, task: () => Promise<void>): Promise<void> => {
  try {
    await task();
  } catch (error) {
    console.error(`[leadService] ${integrationName} failed:`, error);
  }
};

const sendAiSensyMessage = async (payload: Record<string, unknown>): Promise<void> => {
  const apiKey = process.env.AISENSY_API_KEY;
  if (!apiKey) return;

  const response = await fetch(AISENSY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey,
      ...payload,
    }),
  });

  if (!response.ok) {
    const raw = await response.text();
    throw new Error(`AiSensy request failed: ${response.status} ${raw}`);
  }
};

const sendWhatsAppElite = async (name: string, phone: string): Promise<void> => {
  await sendAiSensyMessage({
    campaignName: "eliteutil1",
    destination: `91${phone}`,
    userName: name || "User",
    source: "eliteutil1",
    templateParams: [name || "User"],
    media: { type: "text" },
  });
};

const sendWhatsAppVitu = async (name: string, phone: string): Promise<void> => {
  await sendAiSensyMessage({
    campaignName: "eliteutil",
    destination: `91${phone}`,
    userName: name || "User",
    source: "eliteutil",
    templateParams: [name || "User"],
    media: { type: "text" },
  });

  await sendAiSensyMessage({
    campaignName: "vitu_realty_main",
    destination: `91${phone}`,
    userName: name || "User",
    source: "vitu_realty_main",
    media: { type: "text" },
  });
};

const sendWhatsAppVaikuntamCity = async (name: string, phone: string): Promise<void> => {
  await sendAiSensyMessage({
    campaignName: "eliteutil",
    destination: `91${phone}`,
    userName: name || "User",
    source: "eliteutil",
    templateParams: [name || "User"],
    media: { type: "text" },
  });

  await sendAiSensyMessage({
    campaignName: "Vaikuntam CITY",
    destination: `91${phone}`,
    userName: name || "User",
    source: "Vaikuntam CITY",
    media: {
      type: "document",
      url: "https://www.viturealty.com/downloadingFiles/VC%20brochure.pdf",
      filename: "Digital Brochure - Vaikuntam City.pdf",
    },
  });
};

const postAccelr = async (payload: Record<string, unknown>): Promise<void> => {
  const enrichedPayload = {
    ...payload,
    premise: payload.premise || payload.project || payload.formName || "Website",
  };

  const response = await fetch(ACCELR_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(enrichedPayload),
  });

  if (!response.ok) {
    const raw = await response.text();
    throw new Error(`Accelr request failed: ${response.status} ${raw}`);
  }
};

const postPabbly = async (payload: Record<string, unknown>): Promise<void> => {
  const response = await fetch(PABBLY_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const raw = await response.text();
    throw new Error(`Pabbly request failed: ${response.status} ${raw}`);
  }
};

const postGoogleScript = async (url: string, payload: Record<string, string>): Promise<void> => {
  if (!url) return;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(payload),
  });
};

const submitGeneralEnquire = async (request: NormalizedLeadRequest): Promise<LeadSubmitResult> => {
  const fullName = requireString(request.payload.fullName, "Full name");
  const email = requireEmail(request.payload.email);
  const phone = requirePhone(request.payload.phone);
  const comments = requireString(request.payload.comments, "Comments");
  const whatsapp = asBoolean(request.payload.whatsapp, true);

  const leadPayload = {
    fullName,
    email,
    phone,
    comments,
    whatsapp,
    premise: request.payload.premise,
    ...request.utm,
  };

  const result = await persistLead("generalEnquiries", leadPayload);

  await safeIntegration("send general enquire email", async () => {
    await sendFormEmail({
      page: "General Enquire",
      fullName,
      email,
      phone,
      comments,
    });
  });
  await safeIntegration("send general enquire whatsapp", async () => {
    await sendWhatsAppVitu(fullName, phone);
  });
  await safeIntegration("send general enquire accelr", async () => {
    await postAccelr({
      ...leadPayload,
      formName: request.meta.formName || "General Enquire",
      source: "website",
    });
  });

  return result;
};

const submitProjectEnquire = async (request: NormalizedLeadRequest): Promise<LeadSubmitResult> => {
  const fullName = requireString(request.payload.fullName, "Full name");
  const email = requireEmail(request.payload.email);
  const phone = requirePhone(request.payload.phone);
  const option = requireString(request.payload.option, "Interested in");
  const whatsapp = asBoolean(request.payload.whatsapp, true);
  const premise = asString(request.payload.premise);

  const leadPayload = {
    fullName,
    email,
    phone,
    project: asString(request.payload.project) || "Vaikuntam City Elite",
    whatsapp,
    interstedIn: option,
    interestedIn: option,
    premise,
    ...request.utm,
  };

  const result = await persistLead("projectEnquiries", leadPayload);

  await safeIntegration("send project enquire email", async () => {
    await sendFormEmail({
      page: "Project Enquire",
      fullName,
      email,
      phone,
      interstedIn: option,
      interestedIn: option,
    });
  });
  await safeIntegration("send project enquire whatsapp", async () => {
    await sendWhatsAppVitu(fullName, phone);
  });
  await safeIntegration("send project enquire accelr", async () => {
    await postAccelr({
      ...leadPayload,
      formName: request.meta.formName || "Project Enquire",
      source: "website",
    });
  });

  return result;
};

const submitCareerApplication = async (request: NormalizedLeadRequest): Promise<LeadSubmitResult> => {
  const fullName = requireString(request.payload.fullName, "Full name");
  const email = requireEmail(request.payload.email);
  const phone = requirePhone(request.payload.phone);
  const option = requireString(request.payload.option, "Role");
  const resumeUrl = asString(request.payload.resumeUrl);

  const leadPayload = {
    fullName,
    email,
    phone,
    postionAppliedFor: option,
    resumeUrl,
    ...request.utm,
  };

  const result = await persistLead("careerApplications", leadPayload);

  await safeIntegration("send career application email", async () => {
    await sendFormEmail({
      page: "Career Application",
      fullName,
      email,
      phone,
      postionAppliedFor: option,
      resumeUrl,
    });
  });
  await safeIntegration("send career application accelr", async () => {
    await postAccelr({
      ...leadPayload,
      formName: request.meta.formName || "Career Application",
      source: "website",
    });
  });

  return result;
};

const submitVaikuntamCityElite = async (request: NormalizedLeadRequest): Promise<LeadSubmitResult> => {
  const fullName = requireString(request.payload.fullName, "Full name");
  const email = requireEmail(request.payload.email);
  const phone = requirePhone(request.payload.phone);
  const option = requireString(request.payload.option, "Interested in");
  const userType = asString(request.payload.userType);
  const whatsapp = asBoolean(request.payload.whatsapp, true);

  const leadPayload = {
    fullName,
    email,
    phone,
    project: "Vaikuntam City Elite",
    whatsapp,
    interestedIn: option,
    userType,
    premise: request.payload.premise,
    ...request.utm,
  };

  const result = await persistLead("elite", leadPayload);

  const googleScriptUrl =
    userType === "Investor"
      ? process.env.GOOGLE_SCRIPT_URL_CALL_INVESTOR || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL_CALL_INVESTOR || ""
      : process.env.GOOGLE_SCRIPT_URL_CALL_HOME || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL_CALL_HOME || "";

  await safeIntegration("send elite google script", async () => {
    await postGoogleScript(googleScriptUrl, {
      fullName,
      email,
      phone,
      project: "Vaikuntam City Elite",
      whatsapp: whatsapp ? "Yes" : "No",
      interestedIn: option,
      userType,
      createdAt: new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      }),
    });
  });
  await safeIntegration("send elite email", async () => {
    await sendFormEmail({
      page: "Project Enquire",
      fullName,
      email,
      phone,
      interstedIn: option,
      interestedIn: option,
    });
  });
  await safeIntegration("send elite whatsapp", async () => {
    await sendWhatsAppElite(fullName, phone);
  });
  await safeIntegration("send elite pabbly", async () => {
    await postPabbly({
      ...request.utm,
      form_name: "Vaikuntam City Elite Form",
      form_id: userType,
      plots: option,
      phone,
      name: fullName,
      email,
      additional_parameters: "",
    });
  });
  await safeIntegration("send elite accelr", async () => {
    await postAccelr({
      ...leadPayload,
      formName: request.meta.formName || "Vaikuntam City Elite Form",
      source: "website",
    });
  });

  return result;
};

const submitVilasamLanding = async (request: NormalizedLeadRequest): Promise<LeadSubmitResult> => {
  const fullName = requireString(request.payload.fullName, "Full name");
  const email = requireEmail(request.payload.email);
  const phone = requirePhone(request.payload.phone);
  const interstedIn = asString(request.payload.interstedIn) || requireString(request.payload.interestedIn, "Interested in");
  const whatsapp = asBoolean(request.payload.whatsapp, true);
  const preferredPlotOrientation = asString(request.payload.preferredPlotOrientation);
  const formName = request.meta.formName || "Vilasam Landing Page Form";

  const leadPayload = {
    fullName,
    email,
    phone,
    interstedIn,
    interestedIn: interstedIn,
    whatsapp,
    preferredPlotOrientation,
    project: "Vilasam",
    premise: request.payload.premise,
    ...request.utm,
  };

  const collectionName = request.meta.collectionName || "projectEnquiries";
  const result = await persistLead(collectionName, leadPayload);

  await safeIntegration("send vilasam email", async () => {
    await sendFormEmail({
      page: "Project Enquire",
      fullName,
      email,
      phone,
      interstedIn,
      interestedIn: interstedIn,
    });
  });
  await safeIntegration("send vilasam whatsapp", async () => {
    await sendWhatsAppVaikuntamCity(fullName, phone);
  });
  await safeIntegration("send vilasam pabbly", async () => {
    await postPabbly({
      ...request.utm,
      form_name: formName,
      form_id: interstedIn,
      plots: interstedIn,
      preferred_plot_orientation: preferredPlotOrientation,
      phone,
      name: fullName,
      email,
    });
  });
  await safeIntegration("send vilasam accelr", async () => {
    await postAccelr({
      ...leadPayload,
      formName,
      source: "website",
    });
  });

  return result;
};

const submitProjectModal = async (request: NormalizedLeadRequest): Promise<LeadSubmitResult> => {
  const fullName = requireString(request.payload.fullName, "Full name");
  const email = requireEmail(request.payload.email);
  const phone = requirePhone(request.payload.phone);
  const interstedIn = asString(request.payload.interstedIn) || requireString(request.payload.interestedIn, "Interested in");
  const whatsapp = asBoolean(request.payload.whatsapp, true);

  const collectionName = request.meta.collectionName || "projectEnquiries";
  const leadPayload = {
    fullName,
    email,
    phone,
    interstedIn,
    interestedIn: interstedIn,
    whatsapp,
    premise: request.payload.premise,
    ...request.utm,
  };

  const result = await persistLead(collectionName, leadPayload);

  if (collectionName === "projectEnquiries") {
    await safeIntegration("send project modal email", async () => {
      await sendFormEmail({
        page: "Project Enquire",
        fullName,
        email,
        phone,
        interstedIn,
        interestedIn: interstedIn,
      });
    });
    await safeIntegration("send project modal whatsapp", async () => {
      await sendWhatsAppVaikuntamCity(fullName, phone);
    });
  }

  await safeIntegration("send project modal accelr", async () => {
    await postAccelr({
      ...leadPayload,
      formName: request.meta.formName || "Project Enquiry Modal",
      source: "website",
    });
  });

  return result;
};

const submitVaikuntamCityExplore = async (request: NormalizedLeadRequest): Promise<LeadSubmitResult> => {
  const fullName = requireString(request.payload.fullName, "Full name");
  const email = requireEmail(request.payload.email);
  const phone = requirePhone(request.payload.phone);
  const interestedIn = asStringArray(request.payload.interestedIn);

  if (interestedIn.length === 0) {
    throw new LeadValidationError("Please select at least one option.");
  }

  const leadPayload = {
    fullName,
    email,
    phone,
    interestedIn,
    project: "Vaikuntam City",
    premise: request.payload.premise,
    ...request.utm,
  };

  const result = await persistLead("vaikuntamCityEnquiries", leadPayload);

  await safeIntegration("send vaikuntam city explore accelr", async () => {
    await postAccelr({
      ...leadPayload,
      formName: request.meta.formName || "Vaikuntam City Let's Explore",
      source: "website",
    });
  });

  return result;
};

const submitNewsletterSignup = async (request: NormalizedLeadRequest): Promise<LeadSubmitResult> => {
  const email = requireEmail(request.payload.email);

  const leadPayload = {
    email,
    ...request.utm,
  };

  const result = await persistLead("newsLetter", leadPayload);

  await safeIntegration("send newsletter accelr", async () => {
    await postAccelr({
      ...leadPayload,
      formName: request.meta.formName || "Newsletter Signup",
      source: "website",
    });
  });

  return result;
};

export const submitLead = async (body: unknown, headers: Headers): Promise<LeadSubmitResult> => {
  enforceRateLimit(headers);
  const request = normalizeLeadRequest(body);

  switch (request.intent) {
    case "generalEnquire":
      return submitGeneralEnquire(request);
    case "projectEnquire":
      return submitProjectEnquire(request);
    case "careerApplication":
      return submitCareerApplication(request);
    case "vaikuntamCityElite":
      return submitVaikuntamCityElite(request);
    case "vilasamLanding":
    case "vilasamHomeBuyersLanding":
    case "vilasamInvestors":
      return submitVilasamLanding(request);
    case "projectModal":
      return submitProjectModal(request);
    case "vaikuntamCityExplore":
      return submitVaikuntamCityExplore(request);
    case "newsletterSignup":
      return submitNewsletterSignup(request);
    default:
      throw new LeadValidationError("Unsupported lead intent.");
  }
};
