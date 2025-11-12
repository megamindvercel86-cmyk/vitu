"use client";
import Layout from "@/components/Layout/Layout";
import AnimatedHeading from "@/components/VaikuntamCityElite/landing-page/AnimatedHeading";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import logo from "../../../../../public/images/logos/logo.svg";

export default function ThankYouPage() {
  return (
    <>
    <section className="py-20 lg:py-0 bg-[#F3EAE1]">
      <section className=" bg-[#F3EAE1]">
        <section className=" bg-[#F3EAE1] relative z-[80] ">
          <div className="container px-12 lg:px-0 mx-auto  pb-20 lg:py-20 xl:py-24  ">
            <Link href="/vaikuntamcity">
              <Image src={logo} alt="vitu logo" width={313} height={88} className="mx-auto w-[10rem] h-auto lg:w-[16rem] object-contain" />
            </Link>
          </div>
        </section>

        <section className=" h-auto lg:h-[60vh] xl:h-[50vh]  bg-[#F3EAE1] relative z-[80]  ">
          <div className="container px-12 lg:px-0 mx-auto   flex items-center justify-center flex-col">
            <div className="   lg:pb-[55px] lg:px-12 ">
              <AnimatedHeading className="text-[#37121A] text-[26px] lg:text-[45px] lg2:text-[58px] font-FreightNeoProNormal leading-[100%] text-center">
                Thank You for Showing Interest
                <br className="hidden lg:block" /> in Vaikuntam City
              </AnimatedHeading>

              <p className="text-[#37121A]/60 font-FreightNeoProNormal text-base lg:text-[24px] lg2:text-[28px] leading-snug max-w-2xl lg2:max-w-4xl text-pretty flex-1 text-center mt-8 lg:mt-12 mx-auto">
                Your details have been successfully received. <br />
                <br />
                Our team will get in touch with you shortly to share more information and assist you further.
              </p>
            </div>
          </div>
        </section>
      </section>
      </section>
    </>
  );
}
