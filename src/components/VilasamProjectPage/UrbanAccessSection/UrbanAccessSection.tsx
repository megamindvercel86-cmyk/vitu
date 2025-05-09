import React from "react";
import Image from "next/image";

const UrbanAccessSection: React.FC = () => {
  return (
    <section>
      <div
        className="bg-[#1F4A46] hidden lg:block text-white bg-cover bg-center bg-no-repeat py-32 lg:py-60"
        style={{
          backgroundImage: "url('/images/vilasamPageImages/family/image.png')",
        }}
      >
        <div className="container mx-auto  flex flex-col md:flex-row items-center">
          {/* Text Block */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
            <h2 className="md:text-6xl text-xl text-white max-w-4xl font-normal mb-6 font-geistSerif">Open Spaces. Urban Access. One Address.</h2>
            <p className="mb-6 text-lg text-[#BFD6D1] max-w-lg  xl:max-w-2xl font-geistSerif">
              At Vilasam, you get the best of both worlds — expansive plots to shape your dream home & seamless access to Mangaluru’s coastal living
              opportunities.
            </p>
            <button className="bg-white text-[#1F4A46]  rounded-full font-semibold px-4 py-2 hover:bg-[#E6F3F1] transition">Enquire Now</button>
          </div>

          {/* Image Block */}
          <div className="md:w-1/2"></div>
        </div>
      </div>
      <div className=" lg:hidden   h-[76vh]  overflow-hidden bg-white">
        <div className="relative w-full h-72">
          <Image src="/images/vilasamPageImages/family/image2.png" alt="/images/articleImages/articleImage1.jpg" fill className="object-cover " />
        </div>
        <div className="py-14 px-10 bg-[#114848]">
          <h2 className="text-2xl font-semibold font-geistSerif leading-[1.5]  text-white mb-3">Open Spaces. Urban Access. One Address.</h2>
          <p className="text-white   leading-[1.6] text-sm mb-8">
            At Vilasam, you get the best of both worlds — expansive plots to shape your dream home & seamless access to Mangaluru’s coastal living
            opportunities.
          </p>
          <button className="w-full bg-white text-[#2B847D] font-semibold py-3 rounded-full">Get the Best Quote</button>
        </div>
      </div>
    </section>
  );
};

export default UrbanAccessSection;
