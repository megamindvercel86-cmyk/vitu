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
      description: "Take the first step towards the home of your dreams. Fill in the form and begin your journey.",
      buttonText: "Download Bio",
      variant: "white",
      location:
        "https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/pdfs%2FVITU%20Realty%20-%20About%20Us%20(2).pdf?alt=media&token=7ed3634d-27bc-406e-9a23-7a50dd85206f",
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
    <div className="bg-[#EFEAE8] pt-[100px] lg:pt-[142px] pb-[100px] mx-auto flex justify-center">
      <div className="container max-w-[1359px] 2xl:max-w-[85%] md:mx-20 mx-7">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
          {downloadCards.map((card, index) => (
            <div
              key={index}
              className={`rounded-[20px] px-[32px] pt-[36px] ${
                card.variant === "white" ? "bg-white" : card.variant === "light" ? "bg-white" : "bg-[#1A1A1A]"
              }`}
            >
              {card.logo ? (
                <div className="flex flex-col items-center">
                  <div className="mx-auto mt-[22px] mb-[36px]">
                    {card.src && <Image src={card.src} width={300} height={96} alt="Vitu Logo" className="w-full h-full object-contain" />}
                  </div>
                  <div className="flex justify-center">
                    <a
                      href={card.location}
                      download
                      className={`inline-flex text-[20px] items-center gap-2 px-3 py-2 rounded-full border mb-[35px] font-freightNeoMedium ${
                        card.variant === "dark" ? "border-white text-white" : "border-[#AE8566] text-[#AE8566]"
                      } transition-colors duration-200`}
                      aria-label={`Download ${card.buttonText}`}
                    >
                      <Download color={card.variant === "dark" ? "white" : "#AE8566"} />
                      <span className="pt-1">{card.buttonText}</span>
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <Typography variant="custom" className="text-[32px] text-center lg:text-start font-freightNeoMedium text-customBrown">
                    {card.title}
                  </Typography>
                  {card.description && (
                    <Typography variant="custom" className="text-xl text-center lg:text-start font-freightNeoMedium text-[#04070799] mb-[20px]">
                      {card.description}
                    </Typography>
                  )}
                  <div className="flex justify-center lg:justify-start">
                    <a
                      href={card.location}
                      download
                      className={`inline-flex text-[20px] items-center gap-2 mb-[35px] lg:mb-[20px] px-6 py-2 rounded-full border font-freightNeoMedium ${
                        card.variant === "dark" ? "border-white text-white" : "border-[#AE8566] text-[#AE8566]"
                      } transition-colors duration-200`}
                      aria-label={`Download ${card.buttonText}`}
                    >
                      <Download color={card.variant === "dark" ? "white" : "#AE8566"} />
                      <span className="pt-1">{card.buttonText}</span>
                    </a>
                  </div>
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
