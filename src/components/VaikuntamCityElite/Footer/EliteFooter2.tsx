import Image from "next/image";
import Link from "next/link";

const EliteFooter2 = () => {
  return (
    <footer className="bg-[#1A1212] text-center relative overflow-hidden">
      <Image
        src={"/images/footerPattern.png"}
        alt="Vitu Elite Logo"
        fill
        className="z-10 object-cover w-full"
      />
      <div className="container mx-auto px-4 lg:px-0 py-8 pt-16 lg:py-28 lg:border-l lg:border-r lg:border-b border-[#C7784D]">
        <Image
          src={"/svgs/vituEliteLogo.svg"}
          alt="Vitu Elite Logo"
          width={347}
          height={97}
          className="mx-auto w-[14rem] h-full lg:w-[20rem] object-contain"
        />
        <p className="text-xl text-[#E0D9C7] mt-4 font-FreightNeoProNormal">
          Designed for Inspired Living
        </p>
      </div>

      <div className="container mx-auto px-4 lg:px-0 py-6 lg:py-10 lg:border-l lg:border-r lg:border-b border-[#C7784D]">
        <Image
          src={"/svgs/viturealtyfooterlogo.svg"}
          alt="Vitu Realty Logo"
          width={167}
          height={53}
          className="mx-auto w-[8rem] h-full lg:w-[13rem] object-contain"
        />
      </div>
      <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center lg:px-12 py-4  lg:border-l lg:border-r  border-[#C7784D]">
        <p className="text-[#E0D9C766] font-FreightNeoProNormal text-xs">
          © <span className="font-CandideCondensedNormal">{new Date().getFullYear()}</span> Vitu Realty | All rights reserved
        </p>
        <div className="flex mt-4 lg:mt-0 flex-row gap-2 text-[#E0D9C766] font-FreightNeoProNormal text-xs relative z-20 items-center">
          <Link href="/terms-of-service">
            <p className="cursor-pointer hover:underline">Terms of Service</p>
          </Link>
          <span>|</span>
          <Link href="/privacy-policy">
            <p className="cursor-pointer hover:underline">Privacy Policy</p>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default EliteFooter2;
