"use client";

import Button from "../Common/Button";

export default function MediaKit() {
  return (
    <div className="bg-white">
      <div className="xl:mx-[278px] lg:mx-[78px] lg:flex lg:justify-between py-8 sm:py-12 items-center justify-center">
        <span className="font-FreightNeoProBold lg:text-2xl sm:text-base text-customBrown xl:text-[28px]">
          Download our Media Kit & Get Started!
        </span>
        <div className="flex lg:justify-end sm:justify-center ">
          <Button className="lg:w-[236px] lg:h-[55px] lg:text-[28px]">
            Download Now
          </Button>
        </div>
      </div>
    </div>
  );
}
