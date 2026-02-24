"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedConicButton } from "@/components/ui/moving-border";
import { handleFormSubmitVCE } from "@/lib/functionHelpers";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function EliteForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    plotOrientation: "",
    whatsappUpdates: true,
  });
  const [isBrochure, setIsBrochure] = useState("");

  const [openDropdown, setOpenDropdown] = useState(false);

  const router = useRouter();

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Use `formData` instead of the undefined `values` object.

    // Map state properties (`plotOrientation`, `whatsappUpdates`) to the desired payload keys.

    let payload = {
      fullName: formData.fullName,

      email: formData.email,

      phone: formData.phone,

      whatsapp: formData.whatsappUpdates,

      option: formData.plotOrientation,

      userType: "", // This value can be passed as a prop or defined as needed.
    };


    try {
      router.push("/elite/thank-you");
      await handleFormSubmitVCE(payload);

      // Optionally, reset the form after successful submission

      setFormData({ fullName: "", email: "", phone: "", plotOrientation: "", whatsappUpdates: true });
    } catch (error) {
      console.error("Form submission failed:", error);

      alert("There was an error submitting the form. Please try again.");
    } finally {
    }
  };

  useEffect(() => {
    if (!formRef.current) return;

    // Animate all text/email/tel inputs
    const inputs = Array.from(formRef.current.querySelectorAll<HTMLInputElement>("input[type=text], input[type=email], input[type=tel]"));

    inputs.forEach((input) => {
      const border = input.nextElementSibling as HTMLElement; // line
      const spark = border?.nextElementSibling as HTMLElement; // spark
      if (!border || !spark) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: input,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Line animation
      tl.fromTo(border, { scaleX: 0 }, { scaleX: 1, duration: 1, transformOrigin: "left center" });

      // Spark animation (follows the leading edge of the line)
      tl.fromTo(
        spark,
        { x: 0, opacity: 1 },
        {
          x: () => {
            const lineWidth = border.offsetWidth;
            const sparkWidth = spark.offsetWidth;
            return lineWidth - sparkWidth / 2; // Adjust to keep spark centered at line's end
          },
          opacity: 0,
          duration: 1,
          ease: "none", // Linear easing to sync with line
          modifiers: {
            x: (x) => {
              // Ensure spark stays at the leading edge of the scaling line
              const scale = gsap.getProperty(border, "scaleX") as number;
              const lineWidth = border.offsetWidth;
              const sparkWidth = spark.offsetWidth;
              return `${lineWidth * scale - sparkWidth / 2}px`;
            },
          },
        },
        "<" // Start at the same time as the line animation
      );
    });

    // Animate dropdown borders
    const dropdowns = Array.from(formRef.current.querySelectorAll<HTMLElement>(".dropdown-wrapper"));

    dropdowns.forEach((dropdown) => {
      const border = dropdown.querySelector<HTMLSpanElement>(".dropdown-border");
      const spark = border?.nextElementSibling as HTMLElement;
      if (!border || !spark) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: dropdown,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(border, { scaleX: 0 }, { scaleX: 1, duration: 1, transformOrigin: "left center" }).fromTo(
        spark,
        { x: 0, opacity: 1 },
        {
          x: () => {
            const lineWidth = border.offsetWidth;
            const sparkWidth = spark.offsetWidth;
            return lineWidth - sparkWidth / 2; // Adjust to keep spark centered at line's end
          },
          opacity: 0,
          duration: 1,
          ease: "none", // Linear easing to sync with line
          modifiers: {
            x: (x) => {
              // Ensure spark stays at the leading edge of the scaling line
              const scale = gsap.getProperty(border, "scaleX") as number;
              const lineWidth = border.offsetWidth;
              const sparkWidth = spark.offsetWidth;
              return `${lineWidth * scale - sparkWidth / 2}px`;
            },
          },
        },
        "<"
      );
    });
  }, []);

  useEffect(() => {
    const updateTitle = () => {
      const storedTitle = sessionStorage.getItem("eliteFormTitle");
      if (storedTitle) setIsBrochure(storedTitle);
    };

    // Initial check
    updateTitle();

    // Listen for custom event
    window.addEventListener("storageChange", updateTitle);

    return () => {
      window.removeEventListener("storageChange", updateTitle);
    };
  }, []);

  return (
    <section id="elitForm" className="min-h-screen text-white flex items-center justify-center px-4 md:px-6 py-12">
      <div className="container w-full mx-auto border py-16 rounded-xl  gap-10">
        {/* Left Section */}

        {/* Right Section */}
        <div className="w-[90%]   mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-7xl font-normal text-[#E0D9C7] leading-snug md:leading-[1.1] font-FreightNeoProNormal">
            YOUR SIGNATURE ADDRESS FOR ELITE COASTAL LIVING
          </h2>
          {isBrochure && <p className="uppercase text-[#E0D9C7CC] mt-5">Please fill in the form to receive your e-brochure.</p>}
          <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2  w-full gap-x-8 gap-y-8 mt-12 md:mt-24">
            {/* Full Name */}
            <div className="relative w-full">
              <input
                type="text"
                name="fullName"
                required
                placeholder="FULL NAME"
                value={formData.fullName}
                onChange={handleChange}
                className="bg-transparent border-b border-white/0 focus:border-white md:placeholder:text-base placeholder:text-sm outline-none py-2 placeholder-white/70 w-full"
              />
              <span className="absolute left-0 bottom-0 h-[1px] w-full bg-[#F3EAE1CC] origin-left scale-x-0"></span>
              <span className="spark absolute left-0 bottom-0 h-[6px] w-[6px] rounded-full bg-[#F3EAE1] opacity-0"></span>
            </div>

            {/* Email */}
            <div className="relative w-full">
              <input
                type="email"
                required
                name="email"
                placeholder="EMAIL ADDRESS"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent border-b border-white/0 focus:border-white outline-none md:placeholder:text-base placeholder:text-sm py-2 placeholder-white/70 w-full"
              />
              <span className="absolute left-0 bottom-0 h-[1px] w-full bg-[#F3EAE1CC] origin-left scale-x-0"></span>
              <span className="spark absolute left-0 bottom-0 h-[6px] w-[6px] rounded-full bg-[#F3EAE1] opacity-0"></span>
            </div>

            {/* Phone – full width */}
            <div className="relative w-full ">
              <input
                type="tel"
                name="phone"
                required
                placeholder="PHONE NUMBER"
                value={formData.phone}
                onChange={handleChange}
                className="bg-transparent border-b border-white/0 focus:border-white md:placeholder:text-base placeholder:text-sm outline-none py-2 placeholder-white/70 w-full"
              />
              <span className="absolute left-0 bottom-0 h-[1px] w-full bg-[#F3EAE1CC] origin-left scale-x-0"></span>
              <span className="spark absolute left-0 bottom-0 h-[6px] w-[6px] rounded-full bg-[#F3EAE1] opacity-0"></span>
            </div>

            {/* Dropdown – full width */}
 <div className="relative dropdown-wrapper">

  <input
    type="text"
    required
    value={formData.plotOrientation || ""}
    placeholder="PREFERRED PLOT ORIENTATION"
    onClick={() => setOpenDropdown(prev => !prev)}
    
    // BLOCK TYPING but allow required validation
    onKeyDown={(e) => e.preventDefault()}
    
    className={`bg-transparent border-b border-white/0 outline-none placeholder-white/70 md:placeholder:text-base placeholder:text-sm py-2 cursor-pointer w-full 
      ${formData.plotOrientation ? "text-white" : "text-white/70"}`}
  />

  {/* underline animations */}
  <span className="absolute left-0 bottom-0 h-[1px] w-full bg-[#F3EAE1CC] origin-left scale-x-0 dropdown-border"></span>
  <span className="spark absolute left-0 bottom-0 h-[6px] w-[6px] rounded-full bg-[#F3EAE1] opacity-0"></span>

  {/* icon */}
  <svg
    className={`w-4 h-4 transform transition-transform absolute right-0 top-1/2 -translate-y-1/2 
      ${openDropdown ? "rotate-180" : "rotate-0"}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>

  {/* dropdown */}
  {openDropdown && (
    <div className="absolute left-0 mt-2 w-full bg-white text-black rounded-md shadow-lg z-10">
      {["Signature Plots", "Sunrise Plots", "Sunset Plots"].map(option => (
        <div
          key={option}
          onClick={() => {
            setFormData(prev => ({
              ...prev,
              plotOrientation: option.toLowerCase(),
            }));
            setOpenDropdown(false);
          }}
          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
        >
          {option}
        </div>
      ))}
    </div>
  )}
</div> 



            {/* Submit + Checkbox – full width row */}
            <div className="flex flex-col md:flex-row col-span-1 md:col-span-2 mt-12 md:mt-24 lg:items-center justify-between gap-6 ">
              <div className=" hidden md:block rounded-full border-[#F3EAE1]/30 border-[0.25px]">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex uppercase md:hidden  lg:justify-center text-lg items-center gap-2 border border-[#F3EAE1] text-[#F3EAE1] rounded-full px-6 py-2"
                >
                  Submit
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.10547 15.962L15.1478 8.26663L7.10547 0.570312" stroke="#F3EAE1" strokeWidth="1.5" strokeMiterlimit="10" />
                    <path d="M15.1432 8.26562H0.105469" stroke="#F3EAE1" strokeWidth="1.5" strokeMiterlimit="10" />
                  </svg>
                </motion.button>
                <AnimatedConicButton className="hidden  md:flex md:text-lg font-freightNeoMedium text-[#F3EAE1]">
                  <span className="flex items-center gap-2 ">
                    <span className="pt-1">SUBMIT</span>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.10547 15.962L15.1478 8.26663L7.10547 0.570312" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                      <path d="M15.1432 8.26562H0.105469" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                    </svg>
                  </span>
                </AnimatedConicButton>
              </div>
              <div className="md:hidden">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex uppercase md:hidden  lg:justify-center text-lg items-center gap-2 border border-[#F3EAE1] text-[#F3EAE1] rounded-full px-6 py-2"
                >
                  Submit
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.10547 15.962L15.1478 8.26663L7.10547 0.570312" stroke="#F3EAE1" strokeWidth="1.5" strokeMiterlimit="10" />
                    <path d="M15.1432 8.26562H0.105469" stroke="#F3EAE1" strokeWidth="1.5" strokeMiterlimit="10" />
                  </svg>
                </motion.button>
              </div>

              <label className="flex items-center  w-full lg:justify-end gap-2 text-base md:text-lg font-freightNeoMedium text-[#E0D9C799] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.whatsappUpdates}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      whatsappUpdates: e.target.checked,
                    })
                  }
                  className="hidden"
                />
                <span className="w-6 h-6 rounded-md flex items-center justify-center">
                  {formData.whatsappUpdates ? (
                    <svg width="20" height="20" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.6876 2.39844C19.9688 2.39844 25.0627 7.49236 25.0627 13.7736C25.0627 20.0548 19.9688 25.1487 13.6876 25.1487C7.40642 25.1487 2.3125 20.0548 2.3125 13.7736C2.3125 7.49236 7.40642 2.39844 13.6876 2.39844ZM11.3254 17.4683L8.54053 14.6811C8.06608 14.2063 8.06598 13.4322 8.54053 12.9575C9.01518 12.483 9.79278 12.486 10.264 12.9575L12.2273 14.9224L17.1115 10.0383C17.5861 9.56364 18.3603 9.56364 18.8349 10.0383C19.3095 10.5128 19.3089 11.2878 18.8349 11.7617L13.0876 17.509C12.6137 17.9829 11.8388 17.9836 11.3642 17.509C11.3509 17.4956 11.338 17.4821 11.3254 17.4683Z"
                        fill="#AE8566"
                      />
                    </svg>
                  ) : (
                    <div className="border lg:font-FreightNeoProNormal border-[#F3EAE1] rounded-full p-2"></div>
                  )}
                </span>
                Receive updates on WhatsApp
              </label>
            </div>
          </form>
        </div>
      </div>

      {/* Extra CSS for spark glow */}
      <style jsx>{`
        .spark {
          box-shadow:
            0 0 8px #f3eae1,
            0 0 15px #f3eae1;
        }
      `}</style>
    </section>
  );
}
