"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitLead } from "@/lib/leadApi";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

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

const interestedInOptions = [
  "Investment Opportunity",
  "Book Site Visit",
  "Project Details",
];

const plotOrientationOptions = [
  "East Facing",
  "West Facing",
  "North Facing",
  "South Facing",
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function InvestorsHeroSection() {
  const [form, setForm] = useState<InvestorsFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [dialCode, setDialCode] = useState("91");
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

  const updateField = <K extends keyof InvestorsFormState>(
    key: K,
    value: InvestorsFormState[K],
  ) => {
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
          formName: "Vilasam Investors Page Form",
        },
      });

      setForm(initialFormState);
      router.push("/vilasam/thank-you");
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
    <section className="relative h-[100vh]">
      <div className="relative  overflow-hidden rounded-[2px] bg-[#ecedf0]">
        <Image
          src="/vilasamImages/heroSectionImages/vilasam.webp"
          alt="Vilasam entrance"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute h-[100vh] inset-0 bg-black/5" />

        <div className="absolute left-6 top-6 z-20 md:left-10 md:top-10">
          <Image
            src="/images/logos/vilasamDarkLogo.svg"
            alt="Vilasam"
            width={220}
            height={52}
            className="h-auto w-[150px] md:w-[220px]"
          />
        </div>

        <div className="absolute right-6 top-7 z-20 md:right-10 md:top-10">
          <Image
            src="/images/logos/vituTmLogo.svg"
            alt="Vitu Realty"
            width={170}
            height={42}
            className="h-auto w-[120px] md:w-[170px]"
          />
        </div>

        <div className="relative z-20 flex h-[100vh] items-center justify-end py-4 pt-24 md:py-10 mx-auto max-w-7xl xl:max-w-[90vw]">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[450px] rounded-2xl bg-white p-6 shadow-2xl md:p-8"
          >
            <div className="mb-6 border-b border-[#f0f0f0] pb-5 text-center">
              <h1 className="font-ttCommons font-medium text-[36px] leading-none text-[#2A2A2A]">
                Vilasam
              </h1>
              <p className="mt-3 font-medium text-[15px] sm:text-[16px] text-[#333]">
                Starting Price: ₹33.5L Onwards*
              </p>
            </div>

            <h2 className="mb-5 text-center font-bold text-[16px] text-[#222]">
              Book your Site Visit
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                value={form.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
                placeholder="Name"
                className="h-11 w-full rounded-md border border-[#eaeaea] bg-white px-3 text-[13px] text-[#303030] outline-none placeholder:text-[#9d9d9d] focus:border-[#8ea7a5]"
              />

              <div className="flex flex-col" data-lenis-prevent>
                <PhoneInput
                  defaultCountry="in"
                  value={form.phone}
                  onChange={(phone, data: any) => {
                    updateField("phone", phone);
                    if (data?.country?.dialCode) {
                      setDialCode(data.country.dialCode);
                    }
                  }}
                  disableDialCodeAndPrefix={true}
                  className="flex h-11 w-full items-center rounded-md border border-[#eaeaea] bg-white transition-colors focus-within:border-[#8ea7a5]"
                  inputClassName="w-full bg-transparent px-3 text-[13px] text-[#303030] outline-none placeholder:text-[#9d9d9d]"
                  inputStyle={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    height: "100%",
                  }}
                  countrySelectorStyleProps={{
                    buttonStyle: {
                      background: "transparent",
                      border: "none",
                      borderRight: "1px solid #eaeaea",
                      height: "100%",
                      padding: "0 12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      // @ts-ignore
                      "--dial-code": `"${dialCode}"`,
                    } as React.CSSProperties,
                    buttonClassName: "country-selector-button [&_img]:hidden",
                    dropdownStyleProps: {
                      style: {
                        maxHeight: "220px",
                        overflowY: "scroll",
                        overflowX: "hidden",
                        border: "1px solid #eaeaea",
                        borderRadius: "8px",
                        background: "white",
                        zIndex: 9999,
                        overscrollBehavior: "contain",
                      } as React.CSSProperties,
                      listItemFlagClassName: "hidden",
                      listItemCountryNameClassName: "hidden",
                      listItemDialCodeClassName: "text-[#555] text-[13px]",
                      className: "country-dropdown-list",
                    },
                  }}
                />
                <style jsx global>{`
                  .country-selector-button {
                    gap: 6px;
                  }
                  .country-selector-button::before {
                    content: "+" var(--dial-code);
                    color: #555;
                    font-size: 13px;
                    font-weight: 400;
                  }
                  .country-dropdown-list {
                    overflow-y: scroll !important;
                    overflow-x: hidden !important;
                  }
                  .country-dropdown-list::-webkit-scrollbar {
                    width: 4px;
                  }
                  .country-dropdown-list::-webkit-scrollbar-track {
                    background: #f1f1f1;
                  }
                  .country-dropdown-list::-webkit-scrollbar-thumb {
                    background: #eaeaea;
                    border-radius: 4px;
                  }
                `}</style>
              </div>

              <input
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="Email"
                className="h-11 w-full rounded-md border border-[#eaeaea] bg-white px-3 text-[13px] text-[#303030] outline-none placeholder:text-[#9d9d9d] focus:border-[#8ea7a5]"
              />

              <select
                value={form.interestedIn}
                onChange={(event) => updateField("interestedIn", event.target.value)}
                className="h-11 w-full appearance-none rounded-md border border-[#eaeaea] bg-white px-3 text-[13px] text-[#7b7b7b] outline-none focus:border-[#8ea7a5]"
              >
                <option value="">Interested In</option>
                {interestedInOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select
                value={form.preferredPlotOrientation}
                onChange={(event) =>
                  updateField("preferredPlotOrientation", event.target.value)
                }
                className="h-11 w-full appearance-none rounded-md border border-[#eaeaea] bg-white px-3 text-[13px] text-[#7b7b7b] outline-none focus:border-[#8ea7a5]"
              >
                <option value="">Preferred Plot Orientation</option>
                {plotOrientationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <label className="mt-4 flex items-start gap-2 text-[10px] text-[#8f8f8f]">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(event) => updateField("consent", event.target.checked)}
                className="mt-[2px] h-3.5 w-3.5 accent-[#0d5f5a] rounded-full"
              />
              <span>Consent to contact me via Call, SMS, Email, or WhatsApp</span>
            </label>

            {error ? (
              <p className="mt-3 text-center text-xs text-[#b32727]">{error}</p>
            ) : null}

            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-11 min-w-[110px] rounded-md bg-[#0a5a56] px-7 font-ttCommons text-sm font-semibold text-white transition hover:bg-[#084943] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
