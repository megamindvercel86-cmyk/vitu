"use client";
import React, { useState } from "react";
import Image from "next/image";
import ContactFormModal from "@/components/Common/FormModal/FormModal";

const UrbanAccessSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section>
      <div
        className="bg-[#1F4A46] hidden lg:block text-white bg-cover bg-center bg-no-repeat py-36 lg:py-60"
        style={{
          backgroundImage: "url('/images/vilasamPageImages/family/image.png')",
        }}
      >
        <div className="container mx-auto  flex flex-col md:flex-row items-center">
          {/* Text Block */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
            <h2 className="text-2xl lg:text-5xl lg2:text-6xl text-white max-w-4xl font-normal mb-6 font-theSeasons">
              Open Spaces. Urban Access. One Address.
            </h2>
            <p className="mb-6  lg:w-[300px] lg2:w-[500px] lg2:text-[24px]  md:text-lg text-sm text-white/60 max-w-lg  xl:max-w-2xl font-ttcommons">
              At Vilasam, you get the best of both worlds expansive plots to shape your dream home{" "}
              <span className="font-CandideCondensedNormal">&</span> seamless access to Mangaluru’s coastal living opportunities.
            </p>
         <button
  aria-label="Get the Best Quote"
  onClick={() => setIsModalOpen(true)}
  className="flex items-center justify-center bg-white text-[#2B847D] font-ttCommons font-bold rounded-full text-[22px] px-4 py-2 hover:bg-[#E6F3F1] transition text-center"
>
  Get the Best Quote
</button>
          </div>

          {/* Image Block */}
          <div className="md:w-1/2"></div>
        </div>
      </div>
      <div className=" lg:hidden   overflow-hidden bg-white">
        <div className="relative w-full h-72">
          <Image src="/images/vilasamPageImages/family/image2.png" alt="/images/articleImages/articleImage1.jpg" fill className="object-cover " />
        </div>
        <div className="py-14 px-10 bg-[#114848]">
          <h2 className="text-2xl font-semibold font-theSeasons leading-[1.5]  text-white mb-3">Open Spaces. Urban Access. One Address.</h2>
          <p className="text-white   leading-[1.6] text-base mb-8">
            At Vilasam, you get the best of both worlds — expansive plots to shape your dream home{" "}
            <span className="font-CandideCondensedNormal">&</span> seamless access to Mangaluru’s coastal living opportunities.
          </p>
          <button
            aria-label="Get the Best Quote"
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-white text-[#2B847D] font-semibold py-3 rounded-full"
          >
            Get the Best Quote
          </button>
        </div>
      </div>
      <ContactFormModal
        isOpen={isModalOpen}
        onClose={setIsModalOpen}
        collectionName="vilasam"
        thankYouRoute="/vilasam/thank-you"
        downloadFileLink="/downloadingFiles/VC brochure.pdf"
      />
    </section>
  );
};

export default UrbanAccessSection;
