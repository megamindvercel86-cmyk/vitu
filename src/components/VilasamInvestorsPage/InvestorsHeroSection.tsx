"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { submitLead, type LeadIntent } from "@/lib/leadApi";
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

const interestedInOptions = ["Investment", "Building Your Dream Home", "Just Exploring"];

const plotOrientationOptions = ["East Facing", "West Facing", "North Facing", "South Facing"];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface InvestorsHeroSectionProps {
  thankYouRoute?: string;
  intent?: LeadIntent;
  formName?: string;
}

export default function InvestorsHeroSection({
  thankYouRoute = "/vilasam/investors/thank-you",
  intent = "vilasamInvestors",
  formName = "Vilasam Investors Page Form",
}: InvestorsHeroSectionProps = {}) {
  const [form, setForm] = useState<InvestorsFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [dialCode, setDialCode] = useState("91");
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!form.fullName.trim()) newErrors.fullName = "Name is required.";

    const phone = form.phone.replace(/\D/g, "");
    if (phone.length < 10) newErrors.phone = "Enter a valid phone number.";

    if (!emailRegex.test(form.email.trim())) newErrors.email = "Enter a valid email address.";
    if (!form.interestedIn) newErrors.interestedIn = "Please select what you are interested in.";
    if (!form.preferredPlotOrientation) newErrors.preferredPlotOrientation = "Please select plot orientation.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const isValid = validate();
    if (!isValid) return;

    const normalizedPhone = form.phone.replace(/\D/g, "");
    const interstedIn = `${form.interestedIn}`;
    const link = document.createElement("a");
    link.href = "/downloadingFiles/VITU Realty - Vilasam.pdf";
    link.download = "VITU Realty - Vilasam.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    try {
      setIsSubmitting(true);

      router.push(thankYouRoute);

      await submitLead({
        intent: intent as LeadIntent,
        payload: {
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: normalizedPhone,
          interstedIn,
          interestedIn: interstedIn,
          preferredPlotOrientation: form.preferredPlotOrientation,
          whatsapp: form.consent,
          premise: intent,
        },
        utm: getUtmPayload(),
        meta: {
          formName,
        },
      });

      setForm(initialFormState);

      // Trigger automatic file download
      
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

  useEffect(() => {
    const handleOpenModal = () => setIsModalOpen(true);
    window.addEventListener("open-investors-modal", handleOpenModal);
    return () => window.removeEventListener("open-investors-modal", handleOpenModal);
  }, []);

  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isModalOpen) setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  return (
    <section className="relative min-h-[500px] md:min-h-[100vh]">
      <div className="relative flex min-h-[500px]  sm:min-h-screen flex-col overflow-hidden rounded-[2px] bg-[#ecedf0]">
        <Image
          src="/vilasamImages/heroSectionImages/vilasam.webp"
          alt="Vilasam entrance"
          fill
          priority
          className="object-cover object-center hidden md:block"
        />
        <Image
          src="/vilasamImages/heroSectionImages/vilasamMobile.png"
          alt="Vilasam entrance"
          fill
          priority
          className="object-cover object-center md:hidden"
        />
        <div className="absolute inset-0 bg-black/5" />

        <div className="absolute left-5 top-8 z-20 md:left-10 md:top-10">
          <Image src="/images/logos/vilasamDarkLogo.svg" alt="Vilasam" width={220} height={52} className="h-auto w-[150px] md:w-[220px]" />
        </div>

        <div className="absolute right-5 top-8 z-20 md:right-10 md:top-10">
          <Image src="/images/logos/vituTmLogo.svg" alt="Vitu Realty" width={170} height={42} className="h-auto w-[100px] md:w-[170px]" />
        </div>

        <div className="relative z-20 flex w-full flex-grow flex-col items-center justify-end md:flex-row md:items-end md:justify-end pb-8 pt-28 md:pb-12 md:pt-32 mx-auto max-w-7xl xl:max-w-[90vw] px-4 md:px-0">
          {/* Mobile Text Overlay */}
          <div className="md:hidden absolute inset-0 flex flex-col items-center justify-center pointer-events-none -mt-40 sm:-mt-20">
            <h1 className="font-ttCommons font-semibold text-[40px] text-[#064747] leading-none tracking-tight">Vilasam</h1>
            <div className="mt-4 border border-[#064747]  px-4 py-2 sm:px-5 sm:py-2.5 ">
              <p className="font-semibold text-[14px] sm:text-[15px] text-[#064747]">Starting Price: ₹33.5L Onwards*</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="md:hidden w-full bg-white text-[#064747] font-bold py-3 rounded-[4px] text-[15px]  transition hover:bg-gray-50 active:scale-95 z-20"
          >
            Book a Site Visit Today
          </button>

          {/* Form Content - Desktop */}
          <form onSubmit={handleSubmit} className="hidden md:block w-full max-w-[420px] rounded-xl bg-white p-7 shadow-2xl relative z-20">
            <div className="mb-4 md:mb-5 border-b border-[#E2E2E2] pb-4 text-center">
              <h1 className="font-ttCommons font-medium text-[30px] md:text-[34px] leading-none text-[#2A2A2A]">Vilasam</h1>
              <p className="mt-2 font-medium text-[14px] sm:text-[15px] text-[#2A2A2A]">Starting Price: ₹33.5L Onwards*</p>
            </div>

            <h2 className="mb-4 text-center font-semibold text-[14px] md:text-[15px] text-[#2A2A2A]">Book your Site Visit</h2>

            <div className="space-y-2.5">
              <div>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(event) => {
                    updateField("fullName", event.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
                  }}
                  placeholder="Name"
                  className={`h-10 w-full rounded-md border bg-white px-3 text-[13px] text-[#303030] outline-none placeholder:text-[#9d9d9d] transition-colors ${
                    errors.fullName ? "border-red-500 focus:border-red-500" : "border-[#E2E2E2] focus:border-[#E2E2E2]"
                  }`}
                />
                {errors.fullName && <p className="mt-1 text-[11px] text-red-500">{errors.fullName}</p>}
              </div>

              <div className="flex flex-col" data-lenis-prevent>
                <PhoneInput
                  defaultCountry="in"
                  value={form.phone}
                  onChange={(phone, data: any) => {
                    updateField("phone", phone);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                    if (data?.country?.dialCode) {
                      setDialCode(data.country.dialCode);
                    }
                  }}
                  disableDialCodeAndPrefix={true}
                  className={`flex h-10 w-full items-center rounded-md border bg-white transition-colors ${
                    errors.phone ? "border-red-500 focus-within:border-red-500" : "border-[#E2E2E2] focus-within:border-[#E2E2E2]"
                  }`}
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
                      borderRight: "1px solid #848484",
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
                        border: "1px solid #848484",
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
                    background: #848484;
                    border-radius: 4px;
                  }
                `}</style>
                {errors.phone && <p className="mt-1 text-[11px] text-red-500">{errors.phone}</p>}
              </div>

              <div>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => {
                    updateField("email", event.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  placeholder="Email"
                  className={`h-10 w-full rounded-md border bg-white px-3 text-[13px] text-[#303030] outline-none placeholder:text-[#9d9d9d] transition-colors ${
                    errors.email ? "border-red-500 focus:border-red-500" : "border-[#E2E2E2] focus:border-[#E2E2E2]"
                  }`}
                />
                {errors.email && <p className="mt-1 text-[11px] text-red-500">{errors.email}</p>}
              </div>

              <div className="w-full">
                <div className="relative">
                  <select
                    value={form.interestedIn}
                    onChange={(event) => {
                      updateField("interestedIn", event.target.value);
                      if (errors.interestedIn) setErrors((prev) => ({ ...prev, interestedIn: "" }));
                    }}
                    className={`h-10 w-full appearance-none rounded-md border bg-white px-3 pr-8 text-[13px] text-[#848484] outline-none transition-colors ${
                      errors.interestedIn ? "border-red-500 focus:border-red-500" : "border-[#E2E2E2] focus:border-[#E2E2E2]"
                    }`}
                  >
                    <option value="">Interested In</option>
                    {interestedInOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#555]">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.interestedIn && <p className="mt-1 text-[11px] text-red-500">{errors.interestedIn}</p>}
              </div>

              <div className="w-full">
                <div className="relative">
                  <select
                    value={form.preferredPlotOrientation}
                    onChange={(event) => {
                      updateField("preferredPlotOrientation", event.target.value);
                      if (errors.preferredPlotOrientation) setErrors((prev) => ({ ...prev, preferredPlotOrientation: "" }));
                    }}
                    className={`h-10 w-full appearance-none rounded-md border bg-white px-3 pr-8 text-[13px] text-[#848484] outline-none transition-colors ${
                      errors.preferredPlotOrientation ? "border-red-500 focus:border-red-500" : "border-[#E2E2E2] focus:border-[#E2E2E2]"
                    }`}
                  >
                    <option value="">Preferred Plot Orientation</option>
                    {plotOrientationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#555]">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.preferredPlotOrientation && <p className="mt-1 text-[11px] text-red-500">{errors.preferredPlotOrientation}</p>}
              </div>
            </div>

            <label className="mt-4 flex items-center gap-2 text-[10px] text-[#8f8f8f] cursor-pointer">
              <div className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(event) => updateField("consent", event.target.checked)}
                  className="peer h-full w-full appearance-none rounded-full border border-[#d1d1d1] bg-white transition-all checked:border-[#064747] checked:bg-[#064747] outline-none"
                />
                <svg
                  className="absolute pointer-events-none h-2.5 w-2.5 text-white opacity-0 peer-checked:opacity-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="leading-none mt-[2px]">Consent to contact me via Call, SMS, Email, or WhatsApp</span>
            </label>

            {error ? <p className="mt-3 text-center text-xs text-[#b32727]">{error}</p> : null}

            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-11 min-w-[140px] rounded-md bg-[#064747] px-8 font-ttCommons text-[15px] font-semibold tracking-wide text-white transition hover:bg-[#084943] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal for both Mobile and Desktop */}
      {isModalOpen && (
        <div data-lenis-prevent className="fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-sm bg-black/20 p-4">
          <form onSubmit={handleSubmit} className="relative w-full max-w-[420px] rounded-[12px] bg-white p-6 shadow-2xl">
            {/* Close Button */}
            <button type="button" onClick={() => setIsModalOpen(false)} className="absolute right-4 top-4 text-gray-500 transition hover:text-black">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="mb-6 pt-4 text-center">
              <h2 className="font-ttCommons font-bold text-[24px] text-[#2A2A2A]">Book a Site Visit</h2>
            </div>

            <div className="space-y-3.5">
              <div>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(event) => {
                    updateField("fullName", event.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
                  }}
                  placeholder="Name"
                  className={`h-[42px] w-full rounded-md border bg-white px-3.5 text-[14px] text-[#303030] outline-none placeholder:text-[#9d9d9d] transition-colors ${
                    errors.fullName ? "border-red-500 focus:border-red-500" : "border-[#E2E2E2] focus:border-[#064747]"
                  }`}
                />
                {errors.fullName && <p className="mt-1 text-[11px] text-red-500">{errors.fullName}</p>}
              </div>

              <div className="flex flex-col" data-lenis-prevent>
                <PhoneInput
                  defaultCountry="in"
                  value={form.phone}
                  onChange={(phone, data: any) => {
                    updateField("phone", phone);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                    if (data?.country?.dialCode) {
                      setDialCode(data.country.dialCode);
                    }
                  }}
                  disableDialCodeAndPrefix={true}
                  className={`flex h-[42px] w-full items-center rounded-md border bg-white transition-colors ${
                    errors.phone ? "border-red-500 focus-within:border-red-500" : "border-[#E2E2E2] focus-within:border-[#064747]"
                  }`}
                  inputClassName="w-full bg-transparent px-3 text-[14px] text-[#303030] outline-none placeholder:text-[#9d9d9d]"
                  inputStyle={{ width: "100%", background: "transparent", border: "none", outline: "none", height: "100%" }}
                  countrySelectorStyleProps={{
                    buttonStyle: {
                      background: "transparent",
                      border: "none",
                      borderRight: "1px solid #E2E2E2",
                      height: "100%",
                      padding: "0 12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      "--dial-code": `"${dialCode}"`,
                    } as React.CSSProperties,
                    buttonClassName: "country-selector-button [&_img]:hidden",
                    dropdownStyleProps: {
                      style: {
                        maxHeight: "200px",
                        overflowY: "scroll",
                        overflowX: "hidden",
                        border: "1px solid #E2E2E2",
                        borderRadius: "8px",
                        background: "white",
                        zIndex: 99999,
                        overscrollBehavior: "contain",
                        position: "absolute",
                        top: "100%",
                      } as React.CSSProperties,
                      listItemFlagClassName: "hidden",
                      listItemCountryNameClassName: "hidden",
                      listItemDialCodeClassName: "text-[#555] text-[13px]",
                      className: "country-dropdown-list",
                    },
                  }}
                />
                {errors.phone && <p className="mt-1 text-[11px] text-red-500">{errors.phone}</p>}
              </div>

              <div>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => {
                    updateField("email", event.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  placeholder="Email"
                  className={`h-[42px] w-full rounded-md border bg-white px-3.5 text-[14px] text-[#303030] outline-none placeholder:text-[#9d9d9d] transition-colors ${
                    errors.email ? "border-red-500 focus:border-red-500" : "border-[#E2E2E2] focus:border-[#064747]"
                  }`}
                />
                {errors.email && <p className="mt-1 text-[11px] text-red-500">{errors.email}</p>}
              </div>

              <div className="w-full">
                <div className="relative">
                  <select
                    value={form.interestedIn}
                    onChange={(event) => {
                      updateField("interestedIn", event.target.value);
                      if (errors.interestedIn) setErrors((prev) => ({ ...prev, interestedIn: "" }));
                    }}
                    className={`h-[42px] w-full appearance-none rounded-md border bg-white px-3.5 pr-8 text-[14px] text-[#848484] outline-none transition-colors ${
                      errors.interestedIn ? "border-red-500 focus:border-red-500" : "border-[#E2E2E2] focus:border-[#064747]"
                    }`}
                  >
                    <option value="">Interested In</option>
                    {interestedInOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#555]">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.interestedIn && <p className="mt-1 text-[11px] text-red-500">{errors.interestedIn}</p>}
              </div>

              <div className="w-full">
                <div className="relative">
                  <select
                    value={form.preferredPlotOrientation}
                    onChange={(event) => {
                      updateField("preferredPlotOrientation", event.target.value);
                      if (errors.preferredPlotOrientation) setErrors((prev) => ({ ...prev, preferredPlotOrientation: "" }));
                    }}
                    className={`h-[42px] w-full appearance-none rounded-md border bg-white px-3.5 pr-8 text-[14px] text-[#848484] outline-none transition-colors ${
                      errors.preferredPlotOrientation ? "border-red-500 focus:border-red-500" : "border-[#E2E2E2] focus:border-[#064747]"
                    }`}
                  >
                    <option value="">Preferred Plot Orientation</option>
                    {plotOrientationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#555]">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.preferredPlotOrientation && <p className="mt-1 text-[11px] text-red-500">{errors.preferredPlotOrientation}</p>}
              </div>
            </div>

            <label className="mt-5 flex items-center gap-2.5 text-[10px] text-[#8f8f8f] cursor-pointer">
              <div className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(event) => updateField("consent", event.target.checked)}
                  className="peer h-full w-full appearance-none rounded-full border border-[#d1d1d1] bg-white transition-all checked:border-[#064747] checked:bg-[#064747] outline-none"
                />
                <svg
                  className="absolute pointer-events-none h-2.5 w-2.5 text-white opacity-0 peer-checked:opacity-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="leading-none mt-[1px]">Consent to contact me via Call, SMS, Email, or WhatsApp</span>
            </label>

            {error ? <p className="mt-3 text-center text-xs text-[#b32727]">{error}</p> : null}

            <div className="mt-10 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full rounded-md bg-[#064747] px-8 font-ttCommons text-[15px] font-semibold tracking-wide text-white transition hover:bg-[#084943] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
