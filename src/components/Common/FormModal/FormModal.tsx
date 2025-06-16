"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconX, IconChevronDown } from "@tabler/icons-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

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
  textColor?:string;
  buttonBg?:string;
  peerBg?:string;
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({textColor, peerBg,buttonBg,isOpen, onClose, className = "", maxWidth = "max-w-7xl" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
        if (!/^\+?\d{10,15}$/.test(value.replace(/\s/g, ""))) return "Invalid phone number (10-15 digits)";
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
      try {
        const collectionRef = collection(db, "projectEnquiries");
        const dataWithTimestamp = {
          ...formData,
          createdAt: serverTimestamp(),
        };
        await addDoc(collectionRef, dataWithTimestamp);
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
    } else {
      console.log("Form has errors:", errors);
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
            onClick={() => {
              setOpen(false);
              onClose(false);
            }}
          />
          {/* Modal Content */}
          <motion.div
            variants={cardVariants}
            ref={containerRef}
            className={`${maxWidth} mx-auto bg-white h-fit z-[60] my-auto pb-10 rounded-3xl font-sans relative shadow-2xl ${className}`}
          >
            {/* Close Button */}
            <motion.button
              variants={contentVariants}
              className="absolute top-6 right-0 me-8 h-12 w-12 cursor-pointer ml-auto bg-[#808080] rounded-full flex items-center justify-center"
              onClick={() => {
                setOpen(false);
                onClose(false);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconX className="h-8 w-8 text-white" />
            </motion.button>
            {/* Form Content */}
            <motion.div
              variants={contentVariants}
              className="flex flex-col lg:flex-row px-6 md:px-8 lg:px-32 xl:px-16 pt-16 lg:pt-24 xl:pt-24 gap-8 lg:gap-12"
            >
              {/* Left Side Content */}
              <div className="flex-1">
                <h1 className={`text-center font-geistSerif hidden lg:block !leading-[1.3] w-[80%] xl:w-[100%] lg:text-left ${textColor?textColor:"text-[#0C3E49]"} font-semibold text-4xl md:text-5xl`}>
                  Your dream <br /> home is closer <br /> than you think!
                </h1>
                <h1 className={`text-center mt-7 lg:hidden font-geistSerif !leading-[1.3] lg:text-left ${textColor?textColor:"text-[#0C3E49]"} font-semibold text-4xl md:text-5xl`}>
                  Your dream home is closer than you think!
                </h1>
                <p className={`text-center font-geistSerif lg:text-left ${textColor?textColor:"text-[#0C3E49]"} text-lg md:text-xl pt-3 md:pt-8 lg:pt-6 xl:pt-4`}>
                  Begin your journey to a new home—fill out the form & let's get started.{" "}
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
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-1 pb-2 ${textColor?textColor:"text-[#0C3E49]"} bg-transparent border-0 border-b border-black/[20%] focus:outline-none text-xl placeholder:${textColor?textColor:"text-[#0C3E49]"} font-medium ${
                        touched.fullName && errors.fullName ? "border-red-500" : ""
                      }`}
                      placeholder="Your Full Name"
                    />
                    {touched.fullName && errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>
                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-1 pb-2 ${textColor?textColor:"text-[#0C3E49]"} bg-transparent border-0 border-b border-black/[20%] focus:outline-none text-xl placeholder:${textColor?textColor:"text-[#0C3E49]"} font-medium ${
                        touched.email && errors.email ? "border-red-500" : ""
                      }`}
                      placeholder="Your Email"
                    />
                    {touched.email && errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  {/* Phone */}
                  <div>
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-1 pb-2 ${textColor?textColor:"text-[#0C3E49]"} bg-transparent border-0 border-b border-black/[20%] focus:outline-none text-xl placeholder:${textColor?textColor:"text-[#0C3E49]"} font-medium appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance]:textfield ${
                        touched.phone && errors.phone ? "border-red-500" : ""
                      }`}
                      placeholder="Your Phone Number"
                    />
                    {touched.phone && errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  {/* Interested In Dropdown */}
                  <div className="relative z-10">
                    <div
                      className={`${textColor?textColor:"text-[#0C3E49]"} text-xl font-medium py-3 rounded-md flex justify-between items-center cursor-pointer`}
                      onClick={() => setOpen(!open)}
                    >
                      <span>{formData.interstedIn || "Interested In"}</span>
                      <IconChevronDown className={`h-5 w-5 ${textColor?textColor:"text-[#0C3E49]"}`} />
                    </div>
                    <hr className="border-black border-opacity-20" />
                    {open && (
                      <div className="absolute w-full bg-white rounded-md">
                        {projectEnquiries.map((option) => (
                          <div
                            key={option.value}
                            className={`px-4 py-2 ${textColor?textColor:"text-[#0C3E49]"} text-xl font-medium  hover:${buttonBg?buttonBg:"bg-gray-200"} cursor-pointer`}
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
                    {touched.interstedIn && errors.interstedIn && <p className="text-red-500 text-sm mt-1">{errors.interstedIn}</p>}
                  </div>
                  {/* WhatsApp Checkbox and Submit Button */}
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-10 pb-12">
                    <button
                      type="button"
                      aria-label="Submit Form"
                      className={`lg:hidden block text-[26px] w-full py-2 ${buttonBg?buttonBg:"bg-[#0C3E49]"}  text-white  rounded-full font-medium ${
                        !isFormValid || isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#0A2F38]"
                      }`}
                      onClick={handleSubmit}
                      disabled={!isFormValid || isLoading}
                    >
                      Submit
                    </button>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="whatsapp"
                          name="whatsapp"
                          checked={formData.whatsapp}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className={`w-5 h-5 border border-[#0C3E49] rounded-full ${peerBg?peerBg:"peer-checked:bg-[#0C3E49]"}  transition-colors flex items-center justify-center`}>
                          {formData.whatsapp && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className={`text-base ${textColor?textColor:"text-[#0C3E49]"} font-medium`}>Receive Updates on WhatsApp</span>
                    </label>
                    <button
                      type="button"
                      aria-label="Submit Form"
                      className={`lg:block hidden text-[26px] w-full lg:w-[146px] py-2  ${buttonBg?buttonBg:"bg-[#0C3E49]"} text-white rounded-full font-medium ${
                        !isFormValid || isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#0A2F38]"
                      }`}
                      onClick={handleSubmit}
                      disabled={!isFormValid || isLoading}
                    >
                      Submit
                    </button>
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

export default ContactFormModal;