"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconX, IconChevronDown } from "@tabler/icons-react";
// Firebase imports removed from top-level to be lazy-loaded in handleSubmit
import Loader from "@/components/LoaderComponent/LoaderComponent";
import { useRouter, useSearchParams } from "next/navigation";
import { safeSpecialCharacters } from "@/lib/safeSpecialCharacters";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

// Animation variants
const backdropVariants = {
  hidden: { opacity: 0, backdropFilter: "blur(0px)" },
  visible: { opacity: 1, backdropFilter: "blur(8px)", transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.2, ease: "easeIn" } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 100, transition: { duration: 0.3, ease: "easeIn" } },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut", type: "spring", damping: 20, stiffness: 100 } },
  exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.25, ease: "easeIn" } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.1, ease: "easeOut" } },
};

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: (isModalOpen: boolean) => void;
  className?: string;
  maxWidth?: string;
  textColor?: string;
  buttonBg?: string;
  peerBg?: string;
  downloadFileLink?: string;
  collectionName?: string;
  thankYouRoute?: string;
}

const ContactFormContent: React.FC<ContactFormModalProps> = ({
  textColor,
  peerBg,
  buttonBg,
  isOpen,
  onClose,
  className = "",
  maxWidth = "max-w-8xl",
  collectionName = "projectEnquiries",
  thankYouRoute = "/vaikuntamcity/thank-you",
}) => {
  const isVilasam = thankYouRoute === "/vilasam/thank-you";
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dialCode, setDialCode] = useState("91");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    interstedIn: "",
    whatsapp: true,
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    interstedIn: "",
  });
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phone: false,
    interstedIn: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  // Validation logic
  const validateField = (name: string, value: string): string => {
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
      case "phone":
        if (!value.trim()) return "Phone number is required";
        // Phone length check (usually 10-15 digits globally)
        const digitsOnly = value.replace(/\D/g, "");
        if (digitsOnly.length < 10) return "Phone number must be at least 10 digits";
        return "";
      case "interstedIn":
        if (!value.trim()) return "Please select an option";
        return "";
      default:
        return "";
    }
  };

  // Memoize validateForm function
  const validateForm = useCallback((): boolean => {
    const newErrors = {
      fullName: validateField("fullName", formData.fullName),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      interstedIn: validateField("interstedIn", formData.interstedIn),
    };
    setErrors(newErrors);
    const isValid = !Object.values(newErrors).some((error) => error !== "");
    setIsFormValid(isValid);
    return isValid;
  }, [formData]);

  // Update form validity whenever formData changes
  useEffect(() => {
    validateForm();
  }, [validateForm]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (type !== "checkbox") {
      setTouched((prev) => ({ ...prev, [name]: true }));
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  // Handle blur to validate fields when the user leaves them
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true);

      router.push(thankYouRoute);
      try {
        // Performance optimization: Lazy load Firebase only when user submits form
        const { db } = await import("@/firebase/firebaseConfig");
        const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");

        const collectionRef = collection(db, collectionName);
        const dataWithTimestamp = {
          ...formData,
          createdAt: serverTimestamp(),
        };
        await addDoc(collectionRef, dataWithTimestamp);
        if (collectionName === "projectEnquiries") {
          await fetch("/api/sendEmail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...formData, page: "Project Enquire" }),
          });
          await fetch("/api/send-whatsapp-vaikuntamcity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.fullName,
              phone: formData.phone,
            }),
          });
        }

        // Accelr Webhook Integration
        const utmParams = {
          utm_source: searchParams.get("utm_source") || "direct",
          utm_medium: searchParams.get("utm_medium") || "",
          utm_campaign: searchParams.get("utm_campaign") || "",
          utm_term: searchParams.get("utm_term") || "",
          utm_content: searchParams.get("utm_content") || "",
        };

        try {
          await fetch("/api/accelr-webhook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...formData,
              formName: "Project Enquiry Modal",
              source: "website",
              ...utmParams,
            }),
          });
        } catch (webhookError) {
          console.error("Accelr Webhook Error:", webhookError);
        }

        setFormData({ fullName: "", email: "", phone: "", interstedIn: "", whatsapp: false });
        setTouched({ fullName: false, email: false, phone: false, interstedIn: false });
        setErrors({ fullName: "", email: "", phone: "", interstedIn: "" });
        setOpen(false);
        onClose(false);
      } catch (error) {
        console.error("Error adding document: ", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Close modal on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
        onClose(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open and handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setOpen(false);
        onClose(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Dropdown options
  const projectEnquiries = [
    { value: "Investing in Land", label: "Investing in Land" },

    { value: "Building your Dream Home", label: "Building your Dream Home" },
    { value: "Just Exploring", label: "Just Exploring" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 flex h-screen z-50 overflow-auto" initial="hidden" animate="visible" exit="exit" data-lenis-prevent>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            className="backdrop-blur-lg h-full w-full fixed inset-0"
            viewport={{ once: true }}
            onClick={() => {
              setOpen(false);
              onClose(false);
            }}
          />
          {/* Modal Content */}
          <motion.div
            variants={cardVariants}
            ref={containerRef}
            viewport={{ once: true }}
            className={`${maxWidth} mx-auto bg-white h-fit z-[60] my-auto pb-10 rounded-3xl ${isVilasam ? "font-theSeasons" : "font-sans"} relative shadow-2xl ${className}`}
          >
            {/* Close Button */}
            <motion.button
              variants={contentVariants}
              className="absolute top-6 right-0 me-8 h-10 w-10 lg:h-12 lg:w-12 cursor-pointer ml-auto bg-[#808080] rounded-full flex items-center justify-center"
              onClick={() => {
                setOpen(false);
                onClose(false);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconX className="lg:h-8 lg:w-8 h-6 w-6 text-white" />
            </motion.button>
            {/* Form Content */}
            <motion.div
              variants={contentVariants}
              className="flex flex-col lg:flex-row px-6 md:px-8 lg:px-32 xl:px-16 pt-16 lg:pt-24 xl:pt-24 gap-8 lg:gap-12"
            >
              {/* Left Side Content */}
              <div className="flex-1">
                <h1
                  className={`text-center ${isVilasam ? "font-theSeasons" : "font-freightNeoMedium"} hidden lg:block !leading-[1.3] w-[80%] xl:w-[100%] lg:text-left  ${textColor ? textColor : "text-[#0C3E49]"} font-bold text-4xl md:text-5xl`}
                >
                  Your dream <br /> home is closer <br /> than you think<span className="font-freightNeoMedium">!</span>
                </h1>
                <h1
                  className={`text-center mt-7 lg:hidden ${isVilasam ? "font-theSeasons" : "font-freightNeoMedium"} !leading-[1.3] lg:text-left ${textColor ? textColor : "text-[#0C3E49]"} font-semibold text-3xl md:text-5xl`}
                >
                  {safeSpecialCharacters("Your dream home is closer than you think !")}
                </h1>
                <p
                  className={`text-center ${isVilasam ? "font-ttCommons" : "font-freightNeoMedium"} lg:text-left ${textColor ? textColor : "text-[#0C3E49]"} text-[18px] md:text-xl pt-3 md:pt-8 lg:pt-6 xl:pt-4 max-w-lg`}
                >
                  Begin your journey to a new home.
                  Fill out the form to download e-Brochure
                </p>
                {/* <div className="hidden lg:block">
                  <hr className="w-full md:w-[392px] mt-12 lg:mt-8 border-black border-opacity-20" />
                  <p className="pt-6 text-[#040707] text-lg">Alternatively, for your queries contact</p>
                  <a aria-label="Call +91 89046 88886" href="tel:+91 89046 88886" className="text-[#040707] font-bold text-lg">
                    +91 89046 88886
                  </a>
                </div> */}
              </div>
              {/* Right Side Form */}
              <div className="flex-1">
                <div className="space-y-10">
                  {/* Full Name */}
                  <div>
                    <input
                      aria-label="fullName"
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-1 pb-2 ${textColor ? textColor : "text-[#0C3E49]"} font-ttCommons bg-transparent border-0 border-b border-black/[20%] focus:outline-none text-[18px] lg:text-xl placeholder:${textColor ? textColor : "text-[#0C3E49]"} font-medium ${touched.fullName && errors.fullName ? "border-red-500" : ""
                        }`}
                      placeholder="Your Full Name"
                    />
                    {touched.fullName && errors.fullName && <p className="text-red-500 text-[18px] mt-1">{errors.fullName}</p>}
                  </div>
                  {/* Email */}
                  <div>
                    <input
                      aria-label="email"
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-1 pb-2 ${textColor ? textColor : "text-[#0C3E49]"} font-ttCommons bg-transparent border-0 border-b border-black/[20%] focus:outline-none text-[18px] lg:text-xl placeholder:${textColor ? textColor : "text-[#0C3E49]"} font-medium ${touched.email && errors.email ? "border-red-500" : ""
                        }`}
                      placeholder="Your Email"
                    />
                    {touched.email && errors.email && <p className="text-red-500 text-[18px] mt-1">{errors.email}</p>}
                  </div>
                  {/* Phone */}
                  <div className="flex flex-col relative">
                    <div
                      className={`flex items-center w-full border-b ${touched.phone && errors.phone ? "border-red-500" : "border-black/[20%]"
                        }`}
                    >
                      <PhoneInput
                        defaultCountry="in"
                        value={formData.phone}
                        onChange={(phone, data: any) => {
                          setFormData((prev) => ({ ...prev, phone: phone }));
                          // Only validate if already touched, otherwise wait for blur or submit
                          if (touched.phone) {
                            setErrors((prev) => ({ ...prev, phone: validateField("phone", phone) }));
                          }
                          if (data?.country?.dialCode) {
                            setDialCode(data.country.dialCode);
                          }
                        }}
                        onBlur={() => {
                          setTouched((prev) => ({ ...prev, phone: true }));
                          setErrors((prev) => ({ ...prev, phone: validateField("phone", formData.phone) }));
                        }}
                        disableDialCodeAndPrefix={true}
                        className="w-full vilasam-phone-input-modal font-ttCommons"
                        inputClassName={`w-full !px-1 !pb-2 ${textColor ? textColor : "!text-[#0C3E49]"} !bg-transparent !border-0 focus:!outline-none !text-[18px] lg:!text-xl placeholder:${textColor ? textColor : "!text-[#0C3E49]"} !font-medium !h-auto !rounded-none`}
                        style={{
                          "--dial-code": `"${dialCode}"`,
                        } as React.CSSProperties}
                        countrySelectorStyleProps={{
                          buttonStyle: {
                            background: "transparent",
                            border: "0px",
                            borderRadius: "0px",
                            paddingBottom: "8px",
                            width: "fit-content",
                            minWidth: "60px",
                            gap: "2px",
                            color: textColor ? textColor : "#0C3E49",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            paddingLeft: "4px",
                          } as React.CSSProperties,
                          buttonClassName: "country-selector-button-modal [&_img]:hidden",
                          dropdownStyleProps: {
                            style: {
                              maxHeight: "220px",
                              overflowY: "auto",
                              border: "1px solid rgba(0,0,0,0.1)",
                              background: "white",
                              zIndex: 9999,
                              fontFamily: "ttCommons",
                              overscrollBehavior: "contain",
                            },
                            listItemFlagClassName: "hidden",
                            listItemCountryNameClassName: "hidden",
                            listItemDialCodeClassName: textColor ? textColor : "text-[#0C3E49]",
                          },
                        }}
                      />
                    </div>
                    <style jsx global>{`
                      .country-selector-button-modal::before {
                        content: "+" var(--dial-code);
                        color: ${textColor ? textColor : "#0C3E49"};
                        font-family: "ttCommons";
                        font-weight: 500;
                        font-size: 18px;
                      }
                      @media (min-width: 1024px) {
                        .country-selector-button-modal::before {
                          font-size: 20px;
                        }
                      }
                      .vilasam-phone-input-modal .react-international-phone-input-container .react-international-phone-input {
                        padding-left: 10px !important;
                        font-family: "ttCommons";
                      }
                    `}</style>
                    {touched.phone && errors.phone && <p className="text-red-500 text-[18px] mt-1">{errors.phone}</p>}
                  </div>
                  {/* Interested In Dropdown */}
                  <div className="relative z-10">
                    <div
                      className={`${textColor ? textColor : "text-[#0C3E49]"} font-ttCommons text-[18px] lg:text-xl font-medium py-3 rounded-md flex justify-between items-center cursor-pointer`}
                      onClick={() => setOpen(!open)}
                    >
                      <span>{formData.interstedIn || "Interested In"}</span>
                      <IconChevronDown className={`h-5 w-5 ${textColor ? textColor : "text-[#0C3E49]"}`} />
                    </div>
                    <hr className="border-black border-opacity-20" />
                    {open && (
                      <div className="absolute w-full bg-white rounded-md ">
                        {projectEnquiries.map((option) => (
                          <div
                            key={option.value}
                            className={`px-4 leading-[2] font-ttCommons lg:leading-none lg:py-4 text-start ${textColor ? textColor : "text-[#0C3E49]"} text-[18px] lg:text-xl font-medium  hover:${buttonBg ? buttonBg : "bg-gray-200"} cursor-pointer`}
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, interstedIn: option.label }));
                              setTouched((prev) => ({ ...prev, interstedIn: true }));
                              setErrors((prev) => ({ ...prev, interstedIn: validateField("interstedIn", option.label) }));
                              setOpen(false);
                            }}
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    )}
                    {touched.interstedIn && errors.interstedIn && <p className="text-red-500 text-[18px] mt-1">{errors.interstedIn}</p>}
                  </div>
                  {/* WhatsApp Checkbox and Submit Button */}
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-4 pb-12">
                    {isLoading ? (
                      <div className="lg:hidden block">
                        <Loader />
                      </div>
                    ) : (
                      <button
                        type="button"
                        aria-label="Submit Form"
                        className={`lg:hidden block text-2xl lg:text-[26px] w-full py-2 ${buttonBg ? buttonBg : "bg-[#0C3E49]"}  text-white  rounded-full font-medium ${!isFormValid || isLoading ? "opacity-50 cursor-not-allowed" : `${buttonBg ? `hover:${buttonBg}` : "hover:bg-[#0A2F38]"}`
                          }`}
                        onClick={handleSubmit}
                        disabled={!isFormValid || isLoading}
                      >
                        Submit
                      </button>
                    )}
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="relative">
                        <input
                          aria-label="WhatsApp Checkbox"
                          type="checkbox"
                          id="whatsapp"
                          name="whatsapp"
                          checked={formData.whatsapp}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div
                          className={`w-5 h-5 border border-[#0C3E49] rounded-full ${peerBg ? peerBg : "peer-checked:bg-[#0C3E49]"}  transition-colors flex items-center justify-center`}
                        >
                          {formData.whatsapp && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className={`text-base ${textColor ? textColor : "text-[#0C3E49]"} font-medium`}>Receive Updates on WhatsApp</span>
                    </label>
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <button
                        type="button"
                        aria-label="Submit Form"
                        className={`lg:block hidden text-[26px] w-full lg:w-[146px] py-2  ${buttonBg ? buttonBg : "bg-[#0C3E49]"} text-white rounded-full font-medium ${!isFormValid || isLoading ? "opacity-50 cursor-not-allowed" : `${buttonBg ? `hover:${buttonBg}` : "hover:bg-[#0A2F38]"}`
                          }`}
                        onClick={handleSubmit}
                        disabled={!isFormValid || isLoading}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
                {/* <div className="block lg:hidden text-center mt-2 mb-12">
                  <hr className="w-full border-black border-opacity-20" />
                  <p className="pt-6 text-[#04070799] text-lg font-medium">Alternatively, for your queries contact</p>
                  <span className="text-[#04070799] font-bold text-lg">+91 89046 88886</span>
                </div>  */}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function ContactFormModal(props: ContactFormModalProps) {
  return (
    <React.Suspense fallback={null}>
      <ContactFormContent {...props} />
    </React.Suspense>
  );
}
