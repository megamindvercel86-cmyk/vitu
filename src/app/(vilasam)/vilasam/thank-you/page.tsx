"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function ThankYouPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.play();
    videoRef.current.setAttribute("controls", "true");
    setIsPlaying(true);
  };

  return (
    <>
      <main className="bg-[#FBF6F0]">
        <div className="mx-auto flex min-h-[calc(100vh-1px)] w-full max-w-[1440px] flex-col items-center px-4 py-10 sm:px-6 sm:py-12 lg:px-12 lg:py-14">
          <div className="flex w-full justify-center">
            <Link href="https://vilasam.viturealty.com" className="inline-block">
              <Image
                src="/svgs/vilasamLogo.svg"
                alt="Vilasam"
                width={260}
                height={72}
                priority
                className="h-auto w-[10rem] object-contain sm:w-[12rem] lg:w-[16rem]"
              />
            </Link>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center py-10 sm:py-14 lg:py-20">
            <h1 className="max-w-4xl text-center font-theSeasons text-[30px] leading-[1.55] text-[#254C54] sm:text-[38px] lg:text-[52px]">
              Thank You for Showing Interest in
              <br />
              Vilasam by Vitu Realty
            </h1>

            <p className="mt-8 max-w-3xl text-center font-sans text-[15px] leading-[1.6] text-[#254C54] sm:text-[16px] lg:mt-10 lg:text-[22px]">
              Your details have been successfully received.
            </p>

            <p className="mt-6 max-w-3xl text-center font-sans text-[15px] leading-[1.6] text-[#254C54] sm:text-[16px] lg:text-[22px]">
              Our team will get in touch with you shortly to share more information
              <br className="hidden sm:block" />
              and assist you further.
            </p>
          </div>
        </div>

        <section className="bg-[#0B5A5D]">
          <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-20">
            <h2 className="text-center font-theSeasons text-[34px] leading-[1.05] text-white sm:text-[44px] lg:text-[56px]">
              Watch The Project Walkthrough
            </h2>

            <div className="mx-auto mt-8 w-full max-w-[980px] sm:mt-12">
              <div className="relative">
                <video
                  ref={videoRef}
                  poster="/images/vaikuntamCityEliteLandingPage/thankyou-video-placeholder.jpg"
                  className="w-full overflow-hidden rounded-lg bg-black"
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
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    aria-label="Play walkthrough video"
                  >
                    <img
                      src="/svgs/play-button.svg"
                      alt="play button"
                      width={134}
                      height={134}
                      className="h-12 w-12 opacity-90 sm:h-16 sm:w-16 lg:h-24 lg:w-24"
                    />
                  </button>
                )}
              </div>
            </div>

            <div className="mx-auto mt-10 w-full max-w-8xl text-center md:mt-14">
              <p className="font-sans text-[11px] tracking-[0.18em] text-[#98D1D099]">Brought to Life by</p>
              <Image
                src="/svgs/vituRealtyTmFtrLogo.svg"
                alt="Vitu Realty"
                width={220}
                height={70}
                className="mx-auto mt-4 h-auto w-[11rem] object-contain sm:w-[13rem] lg:w-[15rem]"
              />
            </div>

            <div className="mx-auto mt-12 w-full max-w-8xl">
              <div className="h-px w-full bg-[#FFFFFF]/50" />
              <p className="mt-6 text-center font-FreightNeoProNormal text-[12px] leading-[1.6] text-[#98D1D066] px-12  ">
                Visual representations of the property, layout plans, and other materials are for illustration purposes only. All information on this
                website is provided for general informational use and does not constitute an offer or any form of binding commitment. All materials on
                this website, including design elements, are the intellectual property of the Organization. Any copying, reproduction, distribution
                including reposting to other websites or online resources), or other use of these materials is prohibited without the prior written
                consent of the rights holder.
              </p>
              <p className="mt-6 text-center font-FreightNeoProNormal text-[12px] text-[#98D1D066]">
                © {new Date().getFullYear()} VITU Realty . All rights reserved
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
