export const JOB_OPTIONS = [
  { value: "Real Estate Agent", label: "Real Estate Agent" },
  { value: "Property Manager", label: "Property Manager" },
  { value: "Sales Executive", label: "Sales Executive" },
  { value: "Marketing Specialist", label: "Marketing Specialist" },
  { value: "Other", label: "Other" },
] as const;

export const PROJECT_ENQUIRIES = [
  { value: "Buying Property", label: "Buying Property" },
  { value: "Selling Property", label: "Selling Property" },
  { value: "Property Management", label: "Property Management" },
  { value: "Real Estate Investment", label: "Real Estate Investment" },
  { value: "Other", label: "Other" },
] as const;

export const FORM_TYPES = {
  GENERAL: "General Inquiry",
  PROJECT: "Real Estate Inquiry",
  CAREER: "Career Application",
} as const;
