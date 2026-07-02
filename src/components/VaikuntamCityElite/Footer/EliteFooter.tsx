import Image from "next/image";
import Link from "next/link";

import vituLogo from "../../../../public/images/logos/eliteBrownLogo.svg"
const EliteFooter = () => {
  return (
    <footer className="bg-[#1A1212] text-center pt-12 relative overflow-hidden">
      <div className="py-16">
        {/* Optional background pattern if needed */}
        <div className="absolute inset-0 bg-repeat opacity-10 z-0" />

        <div className="relative z-10 flex flex-col items-center gap-2">
          <p className="text-sm text-[#A39484] font-normal">Brought to Life by</p>
          <Image src={vituLogo} alt="Vitu Realty Logo" width={250} height={40} />
        </div>
      </div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center lg:px-12 py-6 border-t border-[#A39484]/20 relative z-10">
        <p className="text-[#A39484]/60 font-FreightNeoProNormal text-xs">
          © <span className="font-CandideCondensedNormal">{new Date().getFullYear()}</span> Vitu Realty | All rights reserved
        </p>
        <div className="flex mt-4 lg:mt-0 flex-row gap-2 text-[#A39484]/60 font-FreightNeoProNormal text-xs relative z-20 items-center">
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

export default EliteFooter;
