// Update this in your constants file or wherever the JOB_OPTIONS is defined
export const JOB_OPTIONS = {
  CAREER: [
    { value: "marketing-specialist", label: "Marketing Specialist" },
    { value: "real-estate-agent", label: "Real Estate Agent" },
    { value: "property-manager", label: "Property Manager" },
  ],
  PROJECT: [
    { value: "resort", label: "Resort" },
    { value: "home", label: "Home" },
    { value: "land", label: "Land" },
  ],
};

export const FORM_TYPES = {
  GENERAL: "General Enquire",
  PROJECT: "Project Enquire",
  CAREER: "Career Application",
} as const; 