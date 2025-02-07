export const JOB_OPTIONS = [
  { value: "", label: "Interested In", isDisabled: true },
  { value: "Frontend Developer", label: "Frontend Developer" },
  { value: "Backend Developer", label: "Backend Developer" },
  { value: "Full Stack Developer", label: "Full Stack Developer" },
  { value: "Other", label: "Other" },
] as const;

export const FORM_TYPES = {
  GENERAL: "General Enquire",
  PROJECT: "Project Enquire",
  CAREER: "Career Application",
} as const; 