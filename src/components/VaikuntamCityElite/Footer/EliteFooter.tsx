import Image from "next/image";

import vituLogo from "../../../../public/images/logos/eliteBrownLogo.svg"
const EliteFooter = () => {
  return (
    <footer className="bg-[#1A1212] text-center py-12 relative overflow-hidden">
      <div className="py-16">

     
      {/* Optional background pattern if needed */}
      <div className="absolute inset-0 bg-repeat opacity-10 z-0" />

      <div className="relative z-10 flex flex-col items-center gap-2">
        <p className="text-sm text-[#A39484] font-normal">Brought to Life by</p>
        <Image src={vituLogo} alt="Vitu Realty Logo" width={250} height={40} />
      </div> </div>
    </footer>
  );
};

export default EliteFooter;
