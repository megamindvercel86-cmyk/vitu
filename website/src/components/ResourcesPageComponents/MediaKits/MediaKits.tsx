import React from "react";
import Image from "next/image";
import Typography from "@/components/Typography/Typography";
import { Download } from "@/components/Icons/Icons";

type DownloadCard = {
  title: string;
  description?: string;
  buttonText: string;
  variant: "white" | "light" | "dark";
  location: string;
  logo?: boolean;
  src?: string;
};

const MediaKits: React.FC = () => {
  const downloadCards: DownloadCard[] = [
    {
      title: "About Us",
      description:
        "Take the first step towards the home of your dreams. Fill in the form and begin your journey.",
      buttonText: "Download Bio",
      variant: "white",
      location: "/downloadingFiles/AboutUs.pdf",
    },
    {
      title: "VITU REALTY",
      logo: true,
      buttonText: "Download Logo",
      variant: "light",
      src: "/images/logos/logo.svg",
      location: "/downloadingFiles/Vitu Realty - Light BG Logos.zip",
    },
    {
      title: "VITU REALTY",
      logo: true,
      buttonText: "Download Logo",
      variant: "dark",
      src: "/images/logos/logolight.svg",
      location: "/downloadingFiles/Vitu Realty - Dark BG Logos.zip",
    },
  ];

  return (
    <div className="bg-[#EFEAE8] pt-[142px] pb-[133px] mx-auto flex justify-center">
      <div className="container max-w-[1359px] 2xl:max-w-[85%] md:mx-20 mx-7">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {downloadCards.map((card, index) => (
            <div
              key={index}
              className={`rounded-[20px] px-[32px] pt-[36px] ${
                card.variant === "white"
                  ? "bg-white"
                  : card.variant === "light"
                    ? "bg-white"
                    : "bg-[#1A1A1A]"
              }`}
            >
              {card.logo ? (
                <div className="flex flex-col items-center">
                  <div className="mx-auto mt-[22px] mb-[36px]">
                    {card.src && (
                      <Image
                        src={card.src}
                        width={300}
                        height={96}
                        alt="Vitu Logo"
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  <div className="flex justify-center">
                    <a
                      href={card.location}
                      download
                      className={`inline-flex text-[20px] items-center gap-2 px-6 py-2 rounded-full border mb-[50px] font-freightNeoMedium ${
                        card.variant === "dark"
                          ? "border-white text-white"
                          : "border-[#AE8566] text-[#AE8566]"
                      } transition-colors duration-200`}
                    >
                      <Download
                        color={card.variant === "dark" ? "white" : "#AE8566"}
                      />
                      <span className="pt-1">{card.buttonText}</span>
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <Typography
                    variant="custom"
                    className="text-[32px] font-freightNeoMedium text-customBrown"
                  >
                    {card.title}
                  </Typography>
                  {card.description && (
                    <Typography
                      variant="custom"
                      className="text-xl font-freightNeoMedium text-[#04070799] mb-[20px]"
                    >
                      {card.description}
                    </Typography>
                  )}
                  <a
                    href={card.location}
                    download
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
                  </a>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaKits;
