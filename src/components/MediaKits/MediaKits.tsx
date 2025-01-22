import React from "react";
import Typography from "../Typography/Typography";
import { Download } from "../Icons/Icons";
import Image from "next/image";

function MediaKits() {
  const downloadCards = [
    {
      title: "About Us",
      description:
        "Take the first step towards the home of your dreams. Fill in the form and begin your journey.",
      buttonText: "Download Bio",
      variant: "white",
    },
    {
      title: "VITU REALTY",
      logo: true,
      buttonText: "Download Logo",
      variant: "light",
      src: "/images/logos/logo.svg",
    },
    {
      title: "VITU REALTY",
      logo: true,
      buttonText: "Download Logo",
      variant: "dark",
      src: "/images/logos/logolight.svg",
    },
  ];

  return (
    <div className="bg-[#EFEAE8] pt-[142px] pb-[133px]">
      <div className="container mx-[282px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {downloadCards.map((card, index) => (
            <div
              key={index}
              className={`rounded-[20px] px-[32px] pt-[36px] xl:w-[429px] xl:h-[265px] ${
                card.variant === "white"
                  ? "bg-white"
                  : card.variant === "light"
                  ? "bg-white"
                  : "bg-[#1A1A1A]"
              }`}
            >
              {card.logo ? (
                <div className="flex flex-col items-center">
                  <div className="w-[300px] h-[96px] mx-auto mt-[22px] mb-[36px]">
                    <Image
                      src={card.src}
                      width={300}
                      height={96}
                      alt="Vitu Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      className={`inline-flex text-[20px] items-center gap-2 px-6 py-2 rounded-full border font-freightNeoMedium ${
                        card.variant === "dark"
                          ? "border-white text-white"
                          : "border-[#AE8566] text-[#AE8566]"
                      } transition-colors duration-200`}
                    >
                      <Download
                        color={card.variant === "dark" ? "white" : "#AE8566"}
                      />
                      <span className="pt-1">{card.buttonText}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Typography
                    variant="custom"
                    className="text-[32px] font-freightNeoMedium text-customBrown "
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="custom"
                    className="text-xl font-freightNeoMedium text-[#04070799] mb-[20px]"
                  >
                    {card.description}
                  </Typography>
                  <button
                    className={`inline-flex text-[20px] items-center gap-2 px-6 py-2 rounded-full border font-freightNeoMedium ${
                      card.variant === "dark"
                        ? "border-white text-white"
                        : "border-[#AE8566] text-[#AE8566]"
                    } transition-colors duration-200`}
                  >
                    <Download
                      color={card.variant === "dark" ? "white" : "#AE8566"}
                    />
                    <span className="pt-1">{card.buttonText}</span>
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MediaKits;
