"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitLead } from "@/lib/leadApi";

interface InvestorsFormState {
  fullName: string;
  phone: string;
  email: string;
  interestedIn: string;
  preferredPlotOrientation: string;
  consent: boolean;
}

const initialFormState: InvestorsFormState = {
  fullName: "",
  phone: "",
  email: "",
  interestedIn: "",
  preferredPlotOrientation: "",
  consent: true,
};

const interestedInOptions = ["Investment Opportunity", "Book Site Visit", "Project Details"];

const plotOrientationOptions = ["East Facing", "West Facing", "North Facing", "South Facing"];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function InvestorsContactSection() {
  const [form, setForm] = useState<InvestorsFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const getUtmPayload = () => {
    if (typeof window === "undefined") {
      return {
        utm_source: "direct",
        utm_medium: "",
        utm_campaign: "",
        utm_term: "",
        utm_content: "",
        campaign_id: "",
        ad_id: "",
        ad_group_id: "",
        device: "",
      };
    }

    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get("utm_source") || "direct",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || "",
      campaign_id: params.get("campaign_id") || "",
      ad_id: params.get("ad_id") || "",
      ad_group_id: params.get("ad_group_id") || "",
      device: params.get("device") || "",
    };
  };

  const updateField = <K extends keyof InvestorsFormState>(key: K, value: InvestorsFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = (): string => {
    if (!form.fullName.trim()) return "Name is required.";

    const phone = form.phone.replace(/\D/g, "");
    if (phone.length < 10) return "Enter a valid phone number.";

    if (!emailRegex.test(form.email.trim())) return "Enter a valid email address.";
    if (!form.interestedIn) return "Please select what you are interested in.";
    if (!form.preferredPlotOrientation) return "Please select plot orientation.";
    if (!form.consent) return "Please provide consent to continue.";

    return "";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const normalizedPhone = form.phone.replace(/\D/g, "");
    const interstedIn = `${form.interestedIn} | ${form.preferredPlotOrientation}`;

    try {
      setIsSubmitting(true);

      await submitLead({
        intent: "vilasamLanding",
        payload: {
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: normalizedPhone,
          interstedIn,
          interestedIn: interstedIn,
          preferredPlotOrientation: form.preferredPlotOrientation,
          whatsapp: true,
        },
        utm: getUtmPayload(),
        meta: {
          formName: "Vilasam Investors Contact Form",
        },
      });

      setForm(initialFormState);
      router.push("/vilasam/investors/thank-you");
    } catch (submitError) {
      if (submitError instanceof Error) {
        setError(submitError.message);
        return;
      }
      setError("Unable to submit your details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-section" className="bg-[#FBFBFB] px-5 py-12 md:px-8 md:py-16 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl xl:max-w-[90vw]">
        {/* Mobile Title */}
        <h2 className="mb-8 text-center font-ttCommons text-[32px] font-semibold leading-tight text-[#2A2A2A] md:hidden">Book a Site Visit</h2>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 xl:gap-20">
          
          {/* Left Side: Google Maps Embed */}
          <div className="relative lg:col-span-5 h-[300px] w-full overflow-hidden rounded-[16px] md:h-[450px] lg:h-full lg:min-h-[500px]">
            <iframe
              src="https://maps.app.goo.gl/4LVFvgR3NdBHPhig8"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full object-cover"
            ></iframe>
          </div>

          {/* Right Side: Contact Form */}
          <div className="flex flex-col justify-center lg:col-span-7">
            {/* Desktop Title */}
            <h2 className="hidden mb-8 font-ttCommons text-[36px] font-semibold leading-tight text-[#2A2A2A] md:block md:text-[42px]">
              Book a Site Visit
            </h2>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
                {/* Full Width Name Row */}
                <div className="col-span-1 md:col-span-2">
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(event) => updateField("fullName", event.target.value)}
                    placeholder="Name"
                    className="h-12 w-full rounded-md border border-[#E2E2E2] bg-[#FBFBFB] px-4 text-[14px] text-[#333] outline-none placeholder:text-[#9d9d9d] transition-colors focus:border-[#8ea7a5]"
                  />
                </div>

                {/* Phone & Email Row */}
                <div className="flex h-12 items-center rounded-md border border-[#E2E2E2] bg-[#FBFBFB] transition-colors focus-within:border-[#8ea7a5]">
                  <div className="flex h-full items-center gap-1.5 border-r border-[#E2E2E2] px-3.5 text-[14px] text-[#555]">
                    +91
                    <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L4 4L7 1" stroke="#555" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    placeholder="Phone"
                    className="h-full w-full bg-transparent px-3 text-[14px] text-[#333] outline-none placeholder:text-[#9d9d9d]"
                  />
                </div>

                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="Email"
                  className="h-12 w-full rounded-md border border-[#E2E2E2] bg-[#FBFBFB] px-4 text-[14px] text-[#333] outline-none placeholder:text-[#9d9d9d] transition-colors focus:border-[#8ea7a5]"
                />

                {/* Dropdowns Row */}
                <div className="relative w-full">
                  <select
                    value={form.interestedIn}
                    onChange={(event) => updateField("interestedIn", event.target.value)}
                    className="h-12 w-full appearance-none rounded-md border border-[#E2E2E2] bg-[#FBFBFB] px-4 pr-10 text-[14px] text-[#7b7b7b] outline-none transition-colors focus:border-[#8ea7a5]"
                  >
                    <option value="">Interested In</option>
                    {interestedInOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#7b7b7b]">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                <div className="relative w-full">
                  <select
                    value={form.preferredPlotOrientation}
                    onChange={(event) => updateField("preferredPlotOrientation", event.target.value)}
                    className="h-12 w-full appearance-none rounded-md border border-[#E2E2E2] bg-[#FBFBFB] px-4 pr-10 text-[14px] text-[#7b7b7b] outline-none transition-colors focus:border-[#8ea7a5]"
                  >
                    <option value="">Preferred Plot Orientation</option>
                    {plotOrientationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#7b7b7b]">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-col items-start justify-between gap-6 md:mt-8 md:flex-row md:items-center">
                {/* Consent Row */}
                <label className="flex cursor-pointer items-center gap-2.5 text-[11px] text-[#7f7f7f] md:text-[12px]">
                  <div className="relative flex h-4 w-4 shrink-0 flex-col items-center justify-center">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(event) => updateField("consent", event.target.checked)}
                      className="peer h-full w-full cursor-pointer appearance-none rounded-full border border-[#E2E2E2] bg-[#FBFBFB] outline-none transition-colors checked:border-[#064747] checked:bg-[#064747]"
                    />
                    <svg
                      className="pointer-events-none absolute h-2.5 w-2.5 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="mt-[2px] leading-none">Consent to contact me via Call, SMS, Email, or WhatsApp</span>
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-12 w-full items-center justify-center rounded-[4px] bg-[#064747] px-8 font-ttCommons text-[16px] font-bold tracking-wide text-white transition hover:bg-[#084943] disabled:cursor-not-allowed disabled:opacity-70 md:w-auto md:h-10 md:px-10"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>

              {error ? <p className="mt-3 text-sm text-[#b32727]">{error}</p> : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}