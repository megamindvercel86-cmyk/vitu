"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

function ThankYouContent() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    // If the download parameter is present, trigger the PDF download
    if (searchParams.get("download") === "1") {
      const pdfUrl =
        "https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/pdfs%2FVITU%20Realty%20-%20Vilasam.pdf?alt=media&token=968d0932-d7af-443f-9781-3f5f7cb7e073";

      // Small delay to ensure the page has loaded and analytics can fire
      const timer = setTimeout(() => {
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "VITU Realty - Vilasam.pdf";
        link.target = "_blank"; // Helps avoid replacing the current page in some browsers
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.setAttribute("controls", "controls");
      setIsPlaying(true);
    }
  };

  return (
    <main className="relative flex  min-h-screen w-full flex-col items-center justify-center bg-white px-5 pb-16 pt-[120px] md:px-8 md:pt-[160px]">
      {/* Logos acting as Navbar */}
      <div className="absolute left-5 top-8 z-20 md:left-10 md:top-10">
        <Link href="/vilasam/investors">
          {" "}
          <Image
            src="/images/logos/vilasamDarkLogo.svg"
            alt="Vilasam"
            width={220}
            height={52}
            className="h-auto w-[150px] md:w-[220px]"
          />
        </Link>
      </div>

      <div className="absolute right-5 top-8 z-20 md:right-10 md:top-10">
        <Image
          src="/images/logos/vituTmLogo.svg"
          alt="Vitu Realty"
          width={170}
          height={42}
          className="h-auto w-[100px] md:w-[170px]"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center justify-center space-y-8 md:space-y-10">
        {/* Image / Video Wrapper */}
        <div className="relative aspect-video w-full overflow-hidden rounded-[16px]">
          <video
            ref={videoRef}
            poster="/images/vaikuntamCityEliteLandingPage/thankyou-video-placeholder.jpg"
            className="w-full h-full object-cover overflow-hidden rounded-[16px] bg-black"
          >
            <source
              src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/elitevideos%2FELITE%20Walkthrough%20video.mp4?alt=media&token=84a994cd-64ad-417f-9883-f31c4f2464cf"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {!isPlaying && (
            <button
              type="button"
              onClick={handlePlayVideo}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-105"
              aria-label="Play walkthrough video"
            >
              <Image
                src="/svgs/play-button.svg"
                alt="play button"
                width={134}
                height={134}
                className="h-12 w-12 opacity-90 sm:h-16 sm:w-16 lg:h-24 lg:w-24"
              />
            </button>
          )}
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center justify-center space-y-3 text-center md:space-y-4">
          <h1 className="font-ttCommons text-[32px] font-semibold leading-tight text-[#2A2A2A] md:text-[40px] lg:text-[48px]">
            Thank You for Showing Interest
          </h1>
          <p className="max-w-[800px] font-ttCommons text-[15px] font-medium text-[#7b7b7b] md:text-[17px]">
            Our team will connect with you soon with more details about Vilasam by VITU Realty.
          </p>
        </div>

        {/* Back to Home Button */}
      </div>
    </main>
  );
}

export default function VilasamInvestorsThankYouPage() {
  return (
    <Suspense fallback={null}>
      <ThankYouContent />
    </Suspense>
  );
}
