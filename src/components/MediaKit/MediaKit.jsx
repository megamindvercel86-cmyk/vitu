import Button from "../Common/Button";

export default function MediaKit() {
  return (
    <div className="xl:mx-[278px] lg:mx-[78px] mx-auto  py-8 sm:py-12">
      <span className="font-FreightNeoProBold lg:text-2xl sm:text-base text-customBrown xl:text-[28px]">
      Download our Media Kit & Get Started!
      </span>
      <div className="flex gap-2">
        <Button>Download Now</Button>
      </div>
    </div>
  );
}
