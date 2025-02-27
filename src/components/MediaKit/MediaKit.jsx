"use client";

import Button from "../Common/Button";
import { useRouter } from 'next/navigation';


export default function MediaKit() {
  const router = useRouter();

  return (
    <div className="bg-white">
      <div className="xl:mx-[278px] lg:mx-[78px] lg:flex mx-7 lg:justify-between py-8 sm:py-12 text-center items-center justify-center">
        <span className="md:font-freightNeoMedium font-freightNeoSemibold lg:text-2xl sm:text-3xl text-3xl sm:text-customBrown text-customBrown md:text-[#040707] xl:text-[28px]">
          Download our Media Kit & Get Started!
        </span>
        <div className="flex lg:justify-end mt-3 lg:mt-0 sm:justify-center md:w-auto sm:w-full w-full">
          <Button className="md:w-[236px] lg:h-[55px] lg:text-[28px] text-base w-full" onClick={() => router.push('resources/media-kit')}>
            Download Now
          </Button>
        </div>
      </div>
    </div>
  );
}
