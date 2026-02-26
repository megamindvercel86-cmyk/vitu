import type { LandingUtmParams, VilasamLandingFormData } from "@/lib/vilasamLandingForm";
import { submitLead } from "@/lib/leadApi";

export interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  whatsapp: boolean;
  option: string;
  userType: string;
  premise?: string;
}

// 🔹 Helper to capture UTM parameters from the URL
const getUTMParams = () => {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);

  return {
    utm_term: params.get("utm_term") || "",
    utm_source: params.get("utm_source") || "direct",
    utm_medium: params.get("utm_medium") || "",
    utm_matchtype: params.get("utm_matchtype") || "",
    utm_content: params.get("utm_content") || "",
    utm_campaign: params.get("utm_campaign") || "",
    campaign_id: params.get("campaign_id") || params.get("campaign_Id") || "",
    ad_id: params.get("ad_id") || params.get("ad_Id") || "",
    ad_group_id: params.get("ad_group_id") || params.get("ad_group_Id") || "",
    device: params.get("device") || "",
    site_source_name: params.get("site_source_name") || "",
  };
};

export const handleFormSubmitVCE = async (values: FormValues) => {
  const utmData = getUTMParams();

  try {
    await submitLead({
      intent: "vaikuntamCityElite",
      payload: {
        fullName: values.fullName,
        email: values.email,
        phone: String(values.phone),
        whatsapp: values.whatsapp,
        option: values.option,
        userType: values.userType || "",
        premise: values.premise || "",
      },
      utm: utmData,
      meta: {
        formName: "Vaikuntam City Elite Form",
      },
    });
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
};

interface HandleVilasamSubmitOptions {
  formName?: string;
}

export const handleFormSubmitVilasam = async (
  values: VilasamLandingFormData,
  utmParams: LandingUtmParams,
  options: HandleVilasamSubmitOptions = {},
) => {
  const formName = options.formName || "Vilasam Landing Page Form";

  try {
    await submitLead({
      intent: "vilasamLanding",
      payload: {
        ...values,
      },
      utm: utmParams,
      meta: {
        formName,
      },
    });
  } catch (error) {
    console.error("Error submitting Vilasam form:", error);
    throw error;
  }
};
