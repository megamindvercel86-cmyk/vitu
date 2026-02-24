export type VilasamLandingField = "fullName" | "email" | "phone" | "interstedIn";

export interface VilasamLandingFormData {
  fullName: string;
  email: string;
  phone: string;
  interstedIn: string;
  whatsapp: boolean;
}

export type VilasamLandingFormErrors = Record<VilasamLandingField, string>;
export type VilasamLandingFormTouched = Record<VilasamLandingField, boolean>;

export interface LandingUtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  device: string;
  campaign_id: string;
  ad_id: string;
  ad_group_id: string;
}

interface SearchParamsLike {
  get: (key: string) => string | null;
}

const EMPTY_ERRORS: VilasamLandingFormErrors = {
  fullName: "",
  email: "",
  phone: "",
  interstedIn: "",
};

const EMPTY_TOUCHED: VilasamLandingFormTouched = {
  fullName: false,
  email: false,
  phone: false,
  interstedIn: false,
};

const ALL_TOUCHED: VilasamLandingFormTouched = {
  fullName: true,
  email: true,
  phone: true,
  interstedIn: true,
};

export const getInitialVilasamLandingFormData = (): VilasamLandingFormData => ({
  fullName: "",
  email: "",
  phone: "",
  interstedIn: "",
  whatsapp: true,
});

export const getInitialVilasamLandingFormErrors = (): VilasamLandingFormErrors => ({
  ...EMPTY_ERRORS,
});

export const getInitialVilasamLandingFormTouched = (): VilasamLandingFormTouched => ({
  ...EMPTY_TOUCHED,
});

export const getAllTouchedVilasamLandingForm = (): VilasamLandingFormTouched => ({
  ...ALL_TOUCHED,
});

export const resetVilasamLandingFormData = (): VilasamLandingFormData => ({
  ...getInitialVilasamLandingFormData(),
  whatsapp: false,
});

export const validateVilasamLandingField = (
  name: VilasamLandingField,
  value: string,
): string => {
  switch (name) {
    case "fullName":
      if (!value.trim()) return "Full name is required";
      if (value.length < 2) return "Full name must be at least 2 characters";
      if (!/^[a-zA-Z\s]+$/.test(value)) return "Full name can only contain letters and spaces";
      return "";
    case "email":
      if (!value.trim()) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
      return "";
    case "phone": {
      if (!value.trim()) return "Phone number is required";
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length < 10) return "Phone number must be at least 10 digits";
      return "";
    }
    case "interstedIn":
      if (!value.trim()) return "Please select an option";
      return "";
    default:
      return "";
  }
};

export const validateVilasamLandingForm = (
  formData: VilasamLandingFormData,
): { errors: VilasamLandingFormErrors; isValid: boolean } => {
  const errors: VilasamLandingFormErrors = {
    fullName: validateVilasamLandingField("fullName", formData.fullName),
    email: validateVilasamLandingField("email", formData.email),
    phone: validateVilasamLandingField("phone", formData.phone),
    interstedIn: validateVilasamLandingField("interstedIn", formData.interstedIn),
  };

  return {
    errors,
    isValid: !Object.values(errors).some((error) => error !== ""),
  };
};

export const getLandingUtmParams = (searchParams: SearchParamsLike): LandingUtmParams => ({
  utm_source: searchParams.get("utm_source") || "direct",
  utm_medium: searchParams.get("utm_medium") || "",
  utm_campaign: searchParams.get("utm_campaign") || "",
  utm_term: searchParams.get("utm_term") || "",
  utm_content: searchParams.get("utm_content") || "",
  device: searchParams.get("device") || "",
  campaign_id: searchParams.get("campaign_id") || "",
  ad_id: searchParams.get("ad_id") || "",
  ad_group_id: searchParams.get("ad_group_id") || "",
});
