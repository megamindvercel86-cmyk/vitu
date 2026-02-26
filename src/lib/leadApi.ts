export type LeadIntent =
  | "generalEnquire"
  | "projectEnquire"
  | "careerApplication"
  | "vaikuntamCityElite"
  | "vilasamLanding"
  | "vilasamHomeBuyersLanding"
  | "projectModal"
  | "vaikuntamCityExplore"
  | "newsletterSignup"
  | "vilasamInvestors";
  

export interface LeadUtmPayload {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  campaign_id?: string;
  ad_id?: string;
  ad_group_id?: string;
  device?: string;
}

export interface LeadMetaPayload {
  formName?: string;
  collectionName?: string;
}

export interface LeadSubmitRequest {
  intent: LeadIntent;
  payload: Record<string, unknown>;
  utm?: LeadUtmPayload;
  meta?: LeadMetaPayload;
}

const parseErrorMessage = async (response: Response): Promise<string> => {
  try {
    const data = (await response.json()) as { error?: string };
    if (data.error) return data.error;
  } catch {
    // no-op
  }

  return "Failed to submit the form. Please try again.";
};

export const submitLead = async (request: LeadSubmitRequest): Promise<void> => {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message);
  }
};
