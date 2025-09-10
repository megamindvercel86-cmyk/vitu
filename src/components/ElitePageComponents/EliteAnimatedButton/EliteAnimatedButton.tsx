import { AnimatedConicButton } from '@/components/ui/moving-border'
import React from 'react'
import { Link } from 'react-scroll'

const EliteAnimatedButton = () => {
    const handleClick = () => {
  sessionStorage.setItem("eliteFormTitle", "DOWNLOAD E-BROCHURE");
  window.dispatchEvent(new Event("storageChange")); // Custom event
};
  return (
   <div className="mt-6 flex justify-center">
           <Link  to="elitForm" onClick={handleClick} className="inline-flex cursor-pointer items-center justify-center gap-2  mt-10   text-[#1C1213] border-[0.25px]  border-[#1C1213]/20 rounded-full text-sm font-medium lg:text-xl  ">
             <AnimatedConicButton theme="light" className="hidden !text-[#1C1213] lg:font-medium lg:font-freightNeoMedium md:flex !bg-none">
               <span className="flex gap-2 items-center">
                 DOWNLOAD E-BROCHURE
                 <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.2753 16.7061L16.2213 5.87717L5.39175 5.82251" stroke="#1C1213" stroke-width="1.5" stroke-miterlimit="10"/>
<path d="M16.2195 5.87756L6.1459 15.9512" stroke="#1C1213" stroke-width="1.5" stroke-miterlimit="10"/>
</svg>

               </span>
             </AnimatedConicButton>
             </Link>
           </div>
         
  )
}

export default EliteAnimatedButton
