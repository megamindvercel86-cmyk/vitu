export const JOB_OPTIONS = [
  { value: "HR Executive", label: "HR Executive" },
  { value: "Legal Executive", label: "Legal Executive" },
  { value: "Sales Executive", label: "Sales Executive" },
  { value: "Sales Manager", label: "Sales Manager" },
  { value: "Customer Relationship Manager", label: "Customer Relationship Manager" },
  { value: "Marketing Executive", label: "Marketing Executive" },
] as const;

export const PROJECT_ENQUIRIES = [
  { value: "Buying Property", label: "Buying Property" },
  { value: "Selling Property", label: "Selling Property" },
  { value: "Property Management", label: "Property Management" },
  { value: "Real Estate Investment", label: "Real Estate Investment" },

] as const;

export const FORM_TYPES = {
  GENERAL: "General Inquiry",
  PROJECT: "Real Estate Inquiry",
  CAREER: "Career Application",
} as const;
