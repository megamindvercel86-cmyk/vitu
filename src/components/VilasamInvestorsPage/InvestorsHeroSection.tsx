"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { submitLead, type LeadIntent } from "@/lib/leadApi";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

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

const plotOrientationOptions = ["East Facing Plots", "West Facing Plots", "Corner Plots"];

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
  // Separate states for Desktop and Modal forms to prevent validation crossover
  const [desktopForm, setDesktopForm] = useState<InvestorsFormState>(initialFormState);
  const [modalForm, setModalForm] = useState<InvestorsFormState>(initialFormState);

  const [desktopErrors, setDesktopErrors] = useState<{ [key: string]: string }>({});
  const [modalErrors, setModalErrors] = useState<{ [key: string]: string }>({});

  const [desktopDialCode, setDesktopDialCode] = useState("91");
  const [modalDialCode, setModalDialCode] = useState("91");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
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

  const updateField = <K extends keyof InvestorsFormState>(formType: "desktop" | "modal", key: K, value: InvestorsFormState[K]) => {
    if (formType === "desktop") {
      setDesktopForm((prev) => ({ ...prev, [key]: value }));
    } else {
      setModalForm((prev) => ({ ...prev, [key]: value }));
    }
  };

  const validate = (formType: "desktop" | "modal"): boolean => {
    const form = formType === "desktop" ? desktopForm : modalForm;
    const newErrors: { [key: string]: string } = {};

    if (!form.fullName.trim()) newErrors.fullName = "Name is required.";

    const phone = form.phone.replace(/\D/g, "");
    if (phone.length < 10) newErrors.phone = "Enter a valid phone number.";

    if (!emailRegex.test(form.email.trim())) newErrors.email = "Enter a valid email address.";
    if (!form.interestedIn) newErrors.interestedIn = "Please select what you are interested in.";
    if (!form.preferredPlotOrientation) newErrors.preferredPlotOrientation = "Please select plot orientation.";

    if (formType === "desktop") {
      setDesktopErrors(newErrors);
    } else {
      setModalErrors(newErrors);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, formType: "desktop" | "modal") => {
    event.preventDefault();
    setSubmitError("");

    const isValid = validate(formType);
    if (!isValid) return;

    const form = formType === "desktop" ? desktopForm : modalForm;
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
      router.push(`${thankYouRoute}?type=${formName}&audience=${intent}`);

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
          formName: `${formName} (${formType})`,
        },
      });

      if (formType === "desktop") {
        setDesktopForm(initialFormState);
      } else {
        setModalForm(initialFormState);
      }
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
        return;
      }
      setSubmitError("Unable to submit your details. Please try again.");
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
    <section className="relative h-[100dvh]  md:h-auto md:min-h-[100vh]">
      <div className="relative flex h-full min-h-[500px] md:min-h-screen flex-col overflow-hidden rounded-[2px] bg-[#ecedf0]">
        {/* Mobile Static Background */}
        <div className="absolute inset-0 z-0 md:hidden">
          <Image src="/vilasamImages/heroSectionImages/mobile.webp" alt="Vilasam luxury villa plots in Surathkal, Mangalore" fill priority sizes="100vw" className="object-cover object-center" />
        </div>

        {/* Desktop Swiper Background */}
        {/* Desktop Swiper Background */}
        <div className="absolute inset-0 z-0 hidden md:block">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            className="w-full h-full hero-swiper"
          >
            <SwiperSlide className="relative w-full h-full min-h-[500px] sm:min-h-screen">
              <Image src="/vilasamImages/heroSectionImages/1.webp" alt="Vilasam gated community entrance view" fill priority sizes="100vw" className="object-cover object-center" />
            </SwiperSlide>
            <SwiperSlide className="relative w-full h-full min-h-[500px] sm:min-h-screen">
              <Image src="/vilasamImages/heroSectionImages/2.webp" alt="Vilasam luxury villa plots aerial view" fill sizes="100vw" className="object-cover object-center" />
            </SwiperSlide>

            {/* Move the Black Gradient INSIDE the Swiper component */}
            <div className="absolute inset-x-0 bottom-0 h-[100px] bg-gradient-to-t from-black/80 to-transparent z-[5] pointer-events-none" />
          </Swiper>
        </div>
        <div className="absolute bottom-12 left-5 md:bottom-20 md:left-10 lg:left-[5vw] z-20 pointer-events-none hidden md:block">
          <h1 className="font-ttCommons text-[28px] md:text-[36px] lg:text-[42px] text-white leading-[1.25] font-medium tracking-wide drop-shadow-md">
            Limited Edition Luxury Villa Plots
            <br />
            starting ₹ 33.5 Lakhs
          </h1>
        </div>

        <style jsx global>{`
          .hero-swiper .swiper-wrapper {
            height: 100% !important;
          }

          .hero-swiper .swiper-pagination {
            position: absolute;
            text-align: left !important;
            bottom: 24px !important;
            left: 20px !important;
            width: auto !important;
            z-index: 30;
          }
          @media (min-width: 768px) {
            .hero-swiper .swiper-pagination {
              bottom: 40px !important;
              left: 40px !important;
            }
          }
          @media (min-width: 1024px) {
            .hero-swiper .swiper-pagination {
              left: 5vw !important;
            }
          }
          .hero-swiper .swiper-pagination-bullet {
            width: 66px !important;
            height: 2.3px !important;
            border-radius: 0 !important;
            background: rgba(255, 255, 255, 0.4) !important;
            opacity: 1 !important;
            margin: 0 4px !important;
            transition: all 0.3s ease !important;
            position: relative;
            top: -2px;
            cursor: pointer !important;
          }
          .hero-swiper .swiper-pagination-bullet-active {
            background: #ffffff !important;
            width: 66px !important; /* Width is now the exact same as inactive */
          }
          /* Added invisible padding box to make clicking the thin line easier */
          .hero-swiper .swiper-pagination-bullet::before {
            content: "";
            position: absolute;
            top: -10px;
            bottom: -10px;
            left: 0;
            right: 0;
          }
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

        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center md:bg-white px-5 py-6 md:px-10 md:py-7 ">
          {/* Desktop Logos */}
          <Image
            src="/vilasamLogos/darkLogo.svg"
            alt="Vilasam"
            width={220}
            height={52}
            className="h-auto w-[130px] hidden md:block md:w-[200px]"
          />
          <Image
            src="/images/logos/vituTmLogo.svg"
            alt="Vitu Realty"
            width={170}
            height={42}
            className="h-auto w-[100px] hidden md:block md:w-[150px]"
          />

          {/* Mobile Logos */}
          <Image
            src="/vilasamLogos/lightLogo.svg"
            alt="Vilasam"
            width={150} /* Adjust to your exact mobile SVG width */
            height={40} /* Adjust to your exact mobile SVG height */
            className="md:hidden h-auto"
          />
          <Image
            src="/images/logos/vituWhite.svg"
            alt="Vitu Realty"
            width={110} /* Adjust to your exact mobile SVG width */
            height={30} /* Adjust to your exact mobile SVG height */
            className="md:hidden h-auto"
          />

        </div>

        <div className="relative z-20 flex w-full flex-grow flex-col items-center justify-end md:flex-row md:items-center  md:justify-end pb-8 pt-28   md:pt-32 mx-auto max-w-7xl xl:max-w-[90vw] px-4 md:px-0">
          {/* Mobile Text Overlay */}
          <div className="md:hidden absolute inset-0 flex flex-col items-center justify-start mt-36 pointer-events-none ">
            <h1 className="font-ttCommons font-semibold text-center text-[30px]  text-white leading-[1.2]  tracking-tight">
              Limited Edition Luxury Villa <br /> Plots starting ₹ 33.5 Lakhs
            </h1>
            <div className="mt-4">
              <a
                href="https://www.google.com/maps/place/Vilasam+by+VITU+Realty/@13.0084459,74.7985919,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba353f36865457b:0x5b7c3104c03bd7f0!8m2!3d13.0084407!4d74.8011668!16s%2Fg%2F11xg5lg3zj?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                className="mb-4 text-center flex items-center gap-2 justify-center font-medium text-[14px] md:text-[15px] text-white/90"
              >
                <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.51304 20.2C8.51304 20.2 16.0261 13.5217 16.0261 8.51304C16.0261 4.3637 12.6624 1 8.51304 1C4.3637 1 1 4.3637 1 8.51304C1 13.5217 8.51304 20.2 8.51304 20.2Z"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path
                    d="M10.9134 8.20015C10.9134 9.52563 9.83883 10.6002 8.51335 10.6002C7.18787 10.6002 6.11335 9.52563 6.11335 8.20015C6.11335 6.87467 7.18787 5.80015 8.51335 5.80015C9.83883 5.80015 10.9134 6.87467 10.9134 8.20015Z"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
                Munchoor, Surathkal, Mangalore
              </a>
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
          <form
            onSubmit={(e) => handleSubmit(e, "desktop")}
            className="hidden md:block w-full max-w-[420px] rounded-xl bg-white p-7 shadow-2xl relative z-20"
          >
            <div className="mb-4 md:mb-5 border-b border-[#E2E2E2] pb-4 text-center">
              <h1 className="font-ttCommons font-medium text-[30px] md:text-[34px] leading-none text-[#2A2A2A]">
                Book your <br /> Site Visit at Vilasam
              </h1>
            </div>

            <a
              href="https://www.google.com/maps/place/Vilasam+by+VITU+Realty/@13.0084459,74.7985919,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba353f36865457b:0x5b7c3104c03bd7f0!8m2!3d13.0084407!4d74.8011668!16s%2Fg%2F11xg5lg3zj?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              className="mb-4 text-center flex items-center gap-2 justify-center font-medium text-[14px] md:text-[15px] text-[#666666]"
            >
              <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.51304 20.2C8.51304 20.2 16.0261 13.5217 16.0261 8.51304C16.0261 4.3637 12.6624 1 8.51304 1C4.3637 1 1 4.3637 1 8.51304C1 13.5217 8.51304 20.2 8.51304 20.2Z"
                  stroke="#064747"
                  strokeWidth="2"
                />
                <path
                  d="M10.9134 8.20015C10.9134 9.52563 9.83883 10.6002 8.51335 10.6002C7.18787 10.6002 6.11335 9.52563 6.11335 8.20015C6.11335 6.87467 7.18787 5.80015 8.51335 5.80015C9.83883 5.80015 10.9134 6.87467 10.9134 8.20015Z"
                  stroke="#064747"
                  strokeWidth="2"
                />
              </svg>
              Munchoor, Surathkal, Mangalore
            </a>

            <div className="space-y-2.5">
              <div>
                <label htmlFor="desktop-fullName" className="sr-only">Full Name</label>
                <input
                  id="desktop-fullName"
                  type="text"
                  value={desktopForm.fullName}
                  onChange={(event) => {
                    updateField("desktop", "fullName", event.target.value);
                    if (desktopErrors.fullName) setDesktopErrors((prev) => ({ ...prev, fullName: "" }));
                  }}
                  placeholder="Name"
                  autoComplete="name"
                  className={`h-10 w-full rounded-md border bg-white px-3 text-[13px] text-[#303030] outline-none placeholder:text-[#767676] transition-colors ${desktopErrors.fullName ? "border-red-500 focus:border-red-500" : "border-[#E2E2E2] focus:border-[#E2E2E2]"
                    }`}
                />
                {desktopErrors.fullName && <p className="mt-1 text-[11px] text-red-500" role="alert">{desktopErrors.fullName}</p>}
              </div>

              <div className="flex flex-col" data-lenis-prevent>
                <PhoneInput
                  defaultCountry="in"
                  value={desktopForm.phone}
                  onChange={(phone, data: any) => {
                    updateField("desktop", "phone", phone);
                    if (desktopErrors.phone) setDesktopErrors((prev) => ({ ...prev, phone: "" }));
                    if (data?.country?.dialCode) {
                      setDesktopDialCode(data.country.dialCode);
                    }
                  }}
                  disableDialCodeAndPrefix={true}
                  className={`flex h-10 w-full items-center rounded-md border bg-white transition-colors ${desktopErrors.phone ? "border-red-500 focus-within:border-red-500" : "border-[#E2E2E2] focus-within:border-[#E2E2E2]"
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
                      "--dial-code": `"${desktopDialCode}"`,
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

                {desktopErrors.phone && <p className="mt-1 text-[11px] text-red-500" role="alert">{desktopErrors.phone}</p>}
              </div>

              <div>
                <label htmlFor="desktop-email" className="sr-only">Email Address</label>
                <input
                  id="desktop-email"
                  type="email"
                  value={desktopForm.email}
                  onChange={(event) => {
                    updateField("desktop", "email", event.target.value);
                    if (desktopErrors.email) setDesktopErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  placeholder="Email"
                  autoComplete="email"
                  className={`h-10 w-full rounded-md border bg-white px-3 text-[13px] text-[#303030] outline-none placeholder:text-[#767676] transition-colors ${desktopErrors.email ? "border-red-500 focus:border-red-500" : "border-[#E2E2E2] focus:border-[#E2E2E2]"
                    }`}
                />
                {desktopErrors.email && <p className="mt-1 text-[11px] text-red-500" role="alert">{desktopErrors.email}</p>}
              </div>

              <div className="w-full">
                <label htmlFor="desktop-interestedIn" className="sr-only">Interested In</label>
                <div className="relative">
                  <select
                    id="desktop-interestedIn"
                    value={desktopForm.interestedIn}
                    onChange={(event) => {
                      updateField("desktop", "interestedIn", event.target.value);
                      if (desktopErrors.interestedIn) setDesktopErrors((prev) => ({ ...prev, interestedIn: "" }));
                    }}
                    className={`h-10 w-full appearance-none rounded-md border bg-white px-3 pr-8 text-[13px] text-[#666666] outline-none transition-colors ${desktopErrors.interestedIn ? "border-red-500 focus:border-red-500" : "border-[#E2E2E2] focus:border-[#E2E2E2]"
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
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {desktopErrors.interestedIn && <p className="mt-1 text-[11px] text-red-500" role="alert">{desktopErrors.interestedIn}</p>}
              </div>

              <div className="w-full">
                <label htmlFor="desktop-plotOrientation" className="sr-only">Preferred Plot Orientation</label>
                <div className="relative">
                  <select
                    id="desktop-plotOrientation"
                    value={desktopForm.preferredPlotOrientation}
                    onChange={(event) => {
                      updateField("desktop", "preferredPlotOrientation", event.target.value);
                      if (desktopErrors.preferredPlotOrientation) setDesktopErrors((prev) => ({ ...prev, preferredPlotOrientation: "" }));
                    }}
                    className={`h-10 w-full appearance-none rounded-md border bg-white px-3 pr-8 text-[13px] text-[#666666] outline-none transition-colors ${desktopErrors.preferredPlotOrientation ? "border-red-500 focus:border-red-500" : "border-[#E2E2E2] focus:border-[#E2E2E2]"
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
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {desktopErrors.preferredPlotOrientation && <p className="mt-1 text-[11px] text-red-500" role="alert">{desktopErrors.preferredPlotOrientation}</p>}
              </div>
            </div>

            <label className="mt-4 flex items-center gap-2 text-[10px] text-[#6b6b6b] cursor-pointer">
              <div className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                <input
                  type="checkbox"
                  checked={desktopForm.consent}
                  onChange={(event) => updateField("desktop", "consent", event.target.checked)}
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

            {submitError ? <p className="mt-3 text-center text-xs text-[#b32727]">{submitError}</p> : null}

            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-11 min-w-[140px] rounded-md bg-[#064747] px-8 font-ttCommons text-[15px] font-semibold tracking-wide text-white transition hover:bg-[#084943] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>

            <div className="mt-6 border-t border-[#E2E2E2] pt-4 text-center">
              <p className="font-ttCommons text-[14px] text-[#666666]">
                Prefer to talk to an expert? <br />Call us directly at <a href="tel:+918904688886" className="font-bold text-[#064747] hover:underline">+91 89046 88886</a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Modal for Mobile */}
      {isModalOpen && (
        <div data-lenis-prevent role="dialog" aria-modal="true" aria-labelledby="modal-heading" className="fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-sm bg-black/20 p-4">
          <form onSubmit={(e) => handleSubmit(e, "modal")} className="relative w-full max-w-[420px] rounded-[12px] bg-white p-6 shadow-2xl">
            {/* Close Button */}
            <button type="button" onClick={() => setIsModalOpen(false)} aria-label="Close form dialog" className="absolute right-4 top-4 text-gray-500 transition hover:text-black">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="mb-6 pt-4 text-center">
              <h2 id="modal-heading" className="font-ttCommons font-bold text-[24px] text-[#2A2A2A]">Book your Site Visit at Vilasam</h2>
            </div>

            <div className="space-y-3.5">
              <div>
                <label htmlFor="modal-fullName" className="sr-only">Full Name</label>
                <input
                  id="modal-fullName"
                  type="text"
                  value={modalForm.fullName}
                  onChange={(event) => {
                    updateField("modal", "fullName", event.target.value);
                    if (modalErrors.fullName) setModalErrors((prev) => ({ ...prev, fullName: "" }));
                  }}
                  placeholder="Name"
                  autoComplete="name"
                  className={`h-[42px] w-full rounded-md border bg-white px-3.5 text-[14px] text-[#303030] outline-none placeholder:text-[#767676] transition-colors ${modalErrors.fullName ? "border-red-500 focus:border-red-500" : "border-[#E2E2E2] focus:border-[#064747]"
                    }`}
                />
                {modalErrors.fullName && <p className="mt-1 text-[11px] text-red-500" role="alert">{modalErrors.fullName}</p>}
              </div>

              <div className="flex flex-col" data-lenis-prevent>
                <PhoneInput
                  defaultCountry="in"
                  value={modalForm.phone}
                  onChange={(phone, data: any) => {
                    updateField("modal", "phone", phone);
                    if (modalErrors.phone) setModalErrors((prev) => ({ ...prev, phone: "" }));
                    if (data?.country?.dialCode) {
                      setModalDialCode(data.country.dialCode);
                    }
                  }}
                  disableDialCodeAndPrefix={true}
                  className={`flex h-[42px] w-full items-center rounded-md border bg-white transition-colors ${modalErrors.phone ? "border-red-500 focus-within:border-red-500" : "border-[#E2E2E2] focus-within:border-[#064747]"
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
                      // @ts-ignore
                      "--dial-code": `"${modalDialCode}"`,
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
                {modalErrors.phone && <p className="mt-1 text-[11px] text-red-500" role="alert">{modalErrors.phone}</p>}
              </div>

              <div>
                <label htmlFor="modal-email" className="sr-only">Email Address</label>
                <input
                  id="modal-email"
                  type="email"
                  value={modalForm.email}
                  onChange={(event) => {
                    updateField("modal", "email", event.target.value);
                    if (modalErrors.email) setModalErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  placeholder="Email"
                  autoComplete="email"
                  className={`h-[42px] w-full rounded-md border bg-white px-3.5 text-[14px] text-[#303030] outline-none placeholder:text-[#767676] transition-colors ${modalErrors.email ? "border-red-500 focus:border-red-500" : "border-[#E2E2E2] focus:border-[#064747]"
                    }`}
                />
                {modalErrors.email && <p className="mt-1 text-[11px] text-red-500" role="alert">{modalErrors.email}</p>}
              </div>

              <div className="w-full">
                <label htmlFor="modal-interestedIn" className="sr-only">Interested In</label>
                <div className="relative">
                  <select
                    id="modal-interestedIn"
                    value={modalForm.interestedIn}
                    onChange={(event) => {
                      updateField("modal", "interestedIn", event.target.value);
                      if (modalErrors.interestedIn) setModalErrors((prev) => ({ ...prev, interestedIn: "" }));
                    }}
                    className={`h-[42px] w-full appearance-none rounded-md border bg-white px-3.5 pr-8 text-[14px] text-[#666666] outline-none transition-colors ${modalErrors.interestedIn ? "border-red-500 focus:border-red-500" : "border-[#E2E2E2] focus:border-[#064747]"
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
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {modalErrors.interestedIn && <p className="mt-1 text-[11px] text-red-500" role="alert">{modalErrors.interestedIn}</p>}
              </div>

              <div className="w-full">
                <label htmlFor="modal-plotOrientation" className="sr-only">Preferred Plot Orientation</label>
                <div className="relative">
                  <select
                    id="modal-plotOrientation"
                    value={modalForm.preferredPlotOrientation}
                    onChange={(event) => {
                      updateField("modal", "preferredPlotOrientation", event.target.value);
                      if (modalErrors.preferredPlotOrientation) setModalErrors((prev) => ({ ...prev, preferredPlotOrientation: "" }));
                    }}
                    className={`h-[42px] w-full appearance-none rounded-md border bg-white px-3.5 pr-8 text-[14px] text-[#666666] outline-none transition-colors ${modalErrors.preferredPlotOrientation ? "border-red-500 focus:border-red-500" : "border-[#E2E2E2] focus:border-[#064747]"
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
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {modalErrors.preferredPlotOrientation && <p className="mt-1 text-[11px] text-red-500" role="alert">{modalErrors.preferredPlotOrientation}</p>}
              </div>
            </div>

            <label className="mt-5 flex items-center gap-2.5 text-[10px] text-[#6b6b6b] cursor-pointer">
              <div className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                <input
                  type="checkbox"
                  checked={modalForm.consent}
                  onChange={(event) => updateField("modal", "consent", event.target.checked)}
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

            {submitError ? <p className="mt-3 text-center text-xs text-[#b32727]">{submitError}</p> : null}

            <div className="mt-10 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full rounded-md bg-[#064747] px-8 font-ttCommons text-[15px] font-semibold tracking-wide text-white transition hover:bg-[#084943] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>

            <div className="mt-5 border-t border-[#E2E2E2] pt-4 text-center">
              <p className="font-ttCommons text-[14px] text-[#666666]">
                Prefer to talk to an expert? <br />Call us directly at <a href="tel:+918904688886" className="font-bold text-[#064747] hover:underline">+91 89046 88886</a>
              </p>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
