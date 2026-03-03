"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { submitLead, type LeadIntent } from "@/lib/leadApi";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

// Custom Map Marker SVG
const CustomMarkerIcon = () => (
  <svg width="63" height="87" viewBox="0 0 63 87" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M31.2211 0C14.0057 0 0 14.0057 0 31.2209C0 52.5856 27.9398 83.9501 29.1294 85.2749C30.2467 86.5193 32.1975 86.5171 33.3128 85.2749C34.5024 83.9501 62.4422 52.5856 62.4422 31.2209C62.4419 14.0057 48.4363 0 31.2211 0ZM31.2211 46.929C22.5596 46.929 15.5131 39.8824 15.5131 31.2209C15.5131 22.5594 22.5598 15.513 31.2211 15.513C39.8824 15.513 46.9289 22.5596 46.9289 31.2211C46.9289 39.8826 39.8824 46.929 31.2211 46.929Z"
      fill="#004854"
    />
    <circle cx="31.3765" cy="32.0108" r="17.4317" fill="#F3EAE1" />
    <path
      d="M36.2947 31.0712C35.919 28.2457 33.0387 26.8682 31.0429 27.8074C28.2017 28.9032 27.8495 33.3801 31.8099 34.5698C34.4241 35.2351 36.5608 33.4192 36.2947 31.0712ZM31.2464 33.067C29.3601 32.8244 28.7261 30.4607 30.3854 29.1301C31.8256 27.9248 34.0249 28.3318 34.6119 29.7798C36.6704 34.0141 32.1934 35.6186 31.2542 33.0592L31.2464 33.067Z"
      fill="#004854"
    />
    <path
      d="M39.4567 22.313C39.1515 19.8945 39.6602 22.6339 38.9871 24.6297C38.2984 26.6334 36.7486 28.0187 36.6312 27.9013C36.5138 27.6665 39.8872 25.0758 38.5801 19.8554C38.5018 19.5345 38.541 19.644 38.541 20.1997C38.541 24.528 34.7998 26.5395 35.5277 25.8507C38.4627 23.0487 38.7054 19.0335 37.3435 17.0534C36.3495 15.2297 38.9871 19.2292 36.1851 22.9548C35.285 24.1758 34.1188 24.7158 34.4632 24.3636C36.2869 22.8922 37.2183 20.6146 37.1635 18.3604C36.3416 21.6399 32.89 22.1799 32.9605 24.9741C32.9605 25.3811 32.0995 24.1836 33.9388 22.1251C34.5571 21.3581 34.6667 21.2798 34.8154 20.8259C35.058 20.2702 34.9641 19.4875 34.6354 18.9788C35.152 20.6928 33.0544 21.5773 32.1308 23.714C32.0682 23.8001 31.9821 23.7375 32.0056 23.6592C33.2031 20.6693 33.07 21.0372 32.0682 22.8295C31.1055 24.5436 29.9158 27.9326 30.5576 25.248C30.7142 24.5984 30.902 23.9723 31.1681 23.3539C29.4306 26.0385 29.681 27.4787 29.4384 27.4787C29.1958 27.4787 29.4775 25.6002 29.7593 24.7549C29.1645 25.8194 28.687 27.69 28.7575 28.9032C30.855 25.7959 35.0972 26.1951 36.7095 29.8815C38.361 28.1361 39.7307 25.1932 39.4567 22.2973V22.313Z"
      fill="#004854"
    />
    <path
      d="M39.1045 29.4433C39.5819 28.191 39.0888 26.7118 40.6229 24.9272C39.5037 25.483 39.3863 26.837 38.9323 27.7371C38.3766 28.9502 37.0382 29.8973 36.7173 29.8973C37.9305 32.9341 35.5903 35.9161 32.0212 35.3056C28.7496 34.7186 27.239 31.3139 28.7653 28.9189C28.554 27.6901 28.6635 26.4222 29.1331 25.2012C28.1939 26.8761 27.7634 28.6059 28.0374 30.5078C28.0374 30.9304 27.5443 30.046 27.693 28.7233C27.8417 27.3536 28.2722 25.3499 27.6382 27.8545C27.2547 30.1243 27.3721 31.4 28.2096 33.9124C28.8435 35.7596 28.4522 35.5326 28.4522 35.4387C28.4131 35.1569 28.2957 34.9299 28.1704 34.6716C28.0374 34.382 27.9278 34.1472 27.7478 33.3959C26.5111 28.7859 27.5521 29.866 27.0982 27.1735C27.2625 28.9972 26.2998 28.9972 26.2998 31.8462C26.2998 34.1785 26.519 34.4134 26.519 34.789C26.519 35.4778 25.2902 32.0497 26.5972 28.4258C26.0807 29.3572 25.6893 30.5547 25.6032 31.6192C25.6032 31.7679 25.0475 31.6818 25.5798 29.0363C24.4292 30.5704 24.6249 32.2297 24.9458 33.9594C25.705 38.2798 23.9831 39.5243 24.2179 39.0234C25.5485 36.2292 23.7561 34.3507 24.0535 30.6408C23.7639 31.9714 23.7248 33.0906 23.8109 33.9203C24.3431 38.9138 21.7211 41.5201 22.1281 40.6905C22.4255 40.393 23.1613 38.8903 23.263 37.2388C22.676 38.7416 22.629 39.7434 20.5549 41.708C19.5218 42.6863 18.4965 42.6706 18.3634 42.5454L17.432 43.3594C18.5356 43.2185 21.9481 44.2986 23.6074 44.8856C20.5549 43.3594 19.6235 43.4612 19.6235 43.242C19.6235 42.6472 24.1083 44.6665 24.257 44.7213C27.1921 45.7779 21.2124 43.2107 21.2124 43.0776C21.2828 42.9289 21.6429 43.0933 21.862 43.0933C24.1005 43.5081 24.9614 44.8074 26.7851 45.05C27.3251 45.1439 26.8555 45.23 24.4057 43.8134C23.443 43.2577 21.8072 42.7959 21.682 42.7959C19.8427 42.608 23.0047 42.248 24.9145 42.9602C26.1903 43.422 27.4425 44.1264 29.3288 43.9542C30.5498 43.876 29.2975 43.9386 28.5305 43.7351C25.6972 42.7881 25.2354 41.9897 22.496 42.0523C22.4177 42.0523 22.4099 41.9584 22.4803 41.9271C25.6502 41.387 27.2234 43.1559 29.8219 43.0307C27.7243 42.608 27.153 42.2167 26.9808 42.2167C24.2414 41.2383 23.9126 41.3401 23.9126 41.2149C23.9126 41.0427 25.0084 40.9801 25.6189 41.074C27.1686 41.301 28.8279 42.9368 32.0291 42.2167C30.1193 42.4593 28.1626 41.9584 26.0963 40.3069C25.8928 39.8921 27.4504 40.9331 27.7243 40.9331L27.74 40.9487C29.4619 41.5827 30.902 41.9897 32.8196 41.4184C30.6515 41.3479 28.9453 40.0956 29.0783 39.9704C29.1958 39.7356 31.4029 41.7627 34.8467 40.5418C32.4439 41.1444 29.9158 39.8139 30.088 39.6417C30.1663 39.4069 31.8647 40.7374 34.6276 39.9078C35.3476 39.7043 34.5571 39.9547 33.751 40.0252C31.7395 40.1895 29.8845 39.219 29.9549 39.0703C30.0254 38.9294 30.6594 39.3756 32.4361 39.399C33.1953 39.399 31.9821 39.4851 30.6437 38.8277C30.5654 38.7729 30.5968 38.7025 30.6985 38.7025C33.477 39.6573 36.1147 38.6242 37.5939 36.9884C35.2224 39.0938 29.8845 37.5597 30.9411 37.5597C35.5355 38.4285 38.8071 35.9083 39.0575 32.8245C38.6427 33.9829 38.0401 35.0004 37.14 35.7987C34.9954 37.7476 32.6317 36.871 31.7316 36.7536C30.3698 36.6205 29.8375 37.1449 29.7436 36.9727C29.7045 36.8631 30.1115 36.7457 30.2289 36.7144C30.9803 36.464 31.7943 36.4718 32.5848 36.4718C35.3946 36.4718 35.7155 36.01 35.9425 35.9239C36.5764 35.603 36.0207 35.8535 35.8877 35.9004C35.8877 35.9004 35.8329 35.9161 35.8251 35.9239C35.1833 36.1509 33.9701 36.1979 33.9701 36.01C33.9701 35.8144 35.5042 36.0805 36.8191 34.4603C36.279 34.9612 35.645 35.2978 34.9485 35.5169C31.536 36.2761 39.9107 34.1394 39.9107 28.825C39.5115 30.8287 37.32 31.5409 37.2417 31.2905C37.1556 31.1183 38.5097 31.04 39.0967 29.4198L39.1045 29.4433Z"
      fill="#004854"
    />
    <path
      d="M10.4662 45.2849C10.4662 45.2849 11.1471 43.2108 14.3248 42.8507C16.4302 42.6159 19.4435 42.7098 20.5706 41.8724C21.6429 41.074 20.7428 42.4829 20.7428 42.4829C20.7428 42.4829 20.8602 43.1325 19.2479 43.3203C17.6355 43.5082 12.3916 43.2342 11.5541 45.1675C10.9671 46.5293 10.474 45.2927 10.474 45.2927L10.4662 45.2849Z"
      fill="#004854"
    />
    <path
      d="M32.0134 32.261C30.4011 32.7697 29.6654 30.2182 31.6455 29.4981C32.0056 29.3572 32.4047 29.3181 32.7961 29.3729C32.9213 29.3886 33.1796 29.4355 33.4457 29.5921C34.0092 29.9208 34.2127 30.4921 34.2754 30.6643C34.5258 31.3609 34.5728 32.5819 33.8136 33.0672C33.3361 33.3724 32.5222 33.3959 32.0134 32.2532V32.261Z"
      fill="#004854"
    />
  </svg>
);

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

const plotOrientationOptions = ["East", "West", "Corner"];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface InvestorsContactSectionProps {
  thankYouRoute?: string;
  intent?: LeadIntent;
  formName?: string;
}

export default function InvestorsContactSection({
  thankYouRoute = "/vilasam/investors/thank-you",
  intent = "vilasamInvestors",
  formName = "Vilasam Investors Contact Form",
}: InvestorsContactSectionProps = {}) {
  const [form, setForm] = useState<InvestorsFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [dialCode, setDialCode] = useState("91");
  const router = useRouter();

  const markerPosition = { lat: 13.008477274564603, lng: 74.80116411289582 };

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
    const link = document.createElement("a");
    link.href = "/downloadingFiles/VITU Realty - Vilasam.pdf";
    link.download = "VITU Realty - Vilasam.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const normalizedPhone = form.phone.replace(/\D/g, "");
    const interstedIn = `${form.interestedIn}`;
    router.push(`${thankYouRoute}?type=${formName}&audience=${interstedIn}`);

    try {
      setIsSubmitting(true);

      await submitLead({
        intent,
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

  return (
    <section id="contact-section" className="bg-[#FBFBFB] px-5 py-12 md:px-8 md:py-16 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl xl:max-w-[90vw]">
        {/* Mobile Title */}
        <h2 className=" text-center font-ttCommons text-[32px] font-semibold leading-tight text-[#2A2A2A] md:hidden">Book a Site Visit</h2>
     <p className="mb-8 block text-center md:hidden font-ttCommons text-[16px] font-semibold leading-tight text-[#2A2A2A] ">Fill the form to download e-brochure</p>
        {/* UPDATED: Added lg:items-stretch so both columns share the same height on desktop */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-16 xl:gap-20">
          {/* Left Side: Map Implementation */}
          {/* UPDATED: h-[350px] for mobile, md:h-[450px] for tablet, then lg:h-full to stretch to the content's height */}
          <div className="relative lg:col-span-5 h-[350px] w-full overflow-hidden rounded-[16px] md:h-[450px] lg:h-full">
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string}>
              <Map
                defaultZoom={18}
                defaultCenter={markerPosition}
                mapId="DEMO_MAP_ID"
                disableDefaultUI={true}
                style={{ width: "100%", height: "100%" }}
              >
                <AdvancedMarker position={markerPosition}>
                  <CustomMarkerIcon />
                </AdvancedMarker>
              </Map>
            </APIProvider>
          </div>

          {/* Right Side: Contact Form */}
          {/* UPDATED: Added py-4 md:py-12 lg:py-10 to add bulk to the content side */}
          <div className="flex flex-col justify-center py-4 md:py-12 lg:py-10 lg:col-span-7">
            {/* Desktop Title */}
            <h2 className="hidden font-ttCommons text-[36px] font-semibold leading-tight text-[#2A2A2A] md:block md:text-[42px]">
              Book a Site Visit
            </h2>
            <p className="mb-8 hidden md:block font-ttCommons text-[16px] font-semibold leading-tight text-[#2A2A2A] ">Fill the form to download e-brochure</p>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-y-6 lg:gap-x-5">
                {/* Full Width Name Row */}
                <div className="col-span-1 md:col-span-2">
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(event) => {
                      updateField("fullName", event.target.value);
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
                    }}
                    placeholder="Name"
                    className={`h-12 w-full rounded-md border bg-[#FBFBFB] px-4 text-[14px] text-[#333] outline-none placeholder:text-[#9d9d9d] transition-colors ${
                      errors.fullName ? "border-red-500 focus:border-red-500" : "border-[#E2E2E2] focus:border-[#8ea7a5]"
                    }`}
                  />
                  {errors.fullName && <p className="mt-1 text-[12px] text-red-500">{errors.fullName}</p>}
                </div>

                {/* Phone & Email Row */}
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
                    className={`flex h-12 w-full items-center rounded-md border bg-[#FBFBFB] transition-colors ${
                      errors.phone ? "border-red-500 focus-within:border-red-500" : "border-[#E2E2E2] focus-within:border-[#8ea7a5]"
                    }`}
                    inputClassName="w-full bg-transparent px-3 text-[14px] text-[#333] outline-none placeholder:text-[#9d9d9d]"
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
                        borderRight: "1px solid #E2E2E2",
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
                          border: "1px solid #E2E2E2",
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
                      font-size: 14px;
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
                  {errors.phone && <p className="mt-1 text-[12px] text-red-500">{errors.phone}</p>}
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
                    className={`h-12 w-full rounded-md border bg-[#FBFBFB] px-4 text-[14px] text-[#333] outline-none placeholder:text-[#9d9d9d] transition-colors ${
                      errors.email ? "border-red-500 focus:border-red-500" : "border-[#E2E2E2] focus:border-[#8ea7a5]"
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-[12px] text-red-500">{errors.email}</p>}
                </div>

                {/* Dropdowns Row */}
                <div className="w-full">
                  <div className="relative w-full">
                    <select
                      value={form.interestedIn}
                      onChange={(event) => {
                        updateField("interestedIn", event.target.value);
                        if (errors.interestedIn) setErrors((prev) => ({ ...prev, interestedIn: "" }));
                      }}
                      className={`h-12 w-full appearance-none rounded-md border bg-[#FBFBFB] px-4 pr-10 text-[14px] text-[#7b7b7b] outline-none transition-colors ${
                        errors.interestedIn ? "border-red-500 focus:border-red-500" : "border-[#E2E2E2] focus:border-[#8ea7a5]"
                      }`}
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
                  {errors.interestedIn && <p className="mt-1 text-[12px] text-red-500">{errors.interestedIn}</p>}
                </div>

                <div className="w-full">
                  <div className="relative w-full">
                    <select
                      value={form.preferredPlotOrientation}
                      onChange={(event) => {
                        updateField("preferredPlotOrientation", event.target.value);
                        if (errors.preferredPlotOrientation) setErrors((prev) => ({ ...prev, preferredPlotOrientation: "" }));
                      }}
                      className={`h-12 w-full appearance-none rounded-md border bg-[#FBFBFB] px-4 pr-10 text-[14px] text-[#7b7b7b] outline-none transition-colors ${
                        errors.preferredPlotOrientation ? "border-red-500 focus:border-red-500" : "border-[#E2E2E2] focus:border-[#8ea7a5]"
                      }`}
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
                  {errors.preferredPlotOrientation && <p className="mt-1 text-[12px] text-red-500">{errors.preferredPlotOrientation}</p>}
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
                  className="inline-flex py-3 w-full items-center justify-center rounded-[4px] bg-[#064747] px-8 font-ttCommons text-[16px] font-bold tracking-wide text-white transition hover:bg-[#084943] disabled:cursor-not-allowed disabled:opacity-70 md:w-auto md:h-10 md:px-10"
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
