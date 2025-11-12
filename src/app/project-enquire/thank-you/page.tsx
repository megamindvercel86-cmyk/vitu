"use client";
import Layout from "@/components/Layout/Layout";
import AnimatedHeading from "@/components/VaikuntamCityElite/landing-page/AnimatedHeading";
import Image from "next/image";
import Script from "next/script";

export default function ThankYouPage() {
  const NAVBAR_CONFIG = {
  props: {
    showGetInTouch: false,
  },
};
  return (
    <>
      {/* ✅ Google Tag Manager Script */}
    
<Layout navbarProps={NAVBAR_CONFIG.props}>
      {/* ✅ Fullscreen Wrapper */}
      <section className="min-h-screen flex flex-col">
        {/* Logo Section */}
     

        {/* ✅ Centered Content Section */}
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center px-6 lg:px-12">
            <AnimatedHeading className="text-[#37121A] text-[26px] lg:text-[45px] lg2:text-[58px] font-FreightNeoProNormal leading-[100%]">
              Thank You for Showing Interest
              <br className="hidden lg:block" /> in VITU Realty
            </AnimatedHeading>

            <p className="text-[#37121A]/60 font-FreightNeoProNormal text-base lg:text-[24px] lg2:text-[28px] leading-snug max-w-2xl lg2:max-w-4xl mx-auto mt-8 lg:mt-12">
              Your details have been successfully received. <br />
              <br />
              Our team will get in touch with you shortly to share more
              information and assist you further.
            </p>
          </div>
        </div>
      </section>
      </Layout>
    </>
  );
}
