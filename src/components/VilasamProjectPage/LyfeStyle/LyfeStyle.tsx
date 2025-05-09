import CTAButtonIcon from '@/components/Icons/Icons'
import Image from 'next/image'
import React from 'react'

const LyfeStyle = () => {
  return (
    <section>
      <div className='relative'>
        <div className=' lg:absolute  lg:top-16 grid grid-cols-1 lg:grid-cols-12  lg:gap-14 mx-[1.8125rem] lg:mx-20'>
          <div className='lg:col-span-5 '>
            <h1 className='text-2xl leading-[1.3] lg:text-[60px] font-geistSerif font-[500] text-[#0C3E49]'>
              Where Leisure Meets Lifestyle
            </h1>
            <div className="relative group cursor-pointer">
              <button
                type="button"
                className="
                  relative group
                  mt-4
                  flex items-center justify-center
                  gap-[0.6875rem]
                  rounded-full
                  pl-[10px] pr-[1rem] py-[0.1px] lg:py-[0.100rem]
                  text-base font-freightNeoMedium text-white
                  2xl:pt-4 2xl:pb-4 2xl:pr-6 2xl:text-[2rem]
                  overflow-hidden z-100
                "
              >
                <div className={`absolute inset-0 bg-[#e0f2ec] rounded-full`}></div>
                <div className="relative z-10 flex items-center justify-center w-[2rem] h-[2rem]">
                  <div
                    className={`
                      absolute w-0 h-0 rounded-full
                      group-hover:w-[47rem] group-hover:h-[30rem]
                      transition-all duration-500 ease-out
                    `}
                  ></div>
                  <div className="relative z-20">
                    <CTAButtonIcon fill="#0C3E49" direction="right" />
                  </div>
                </div>
                <span className={`relative z-20 text-[#0C3E49] text-[13px] mt-[3px] md:mt-0`}>
                  More about our sustainability centric approach
                </span>
              </button>
            </div>
          </div>
          <div className='lg:col-span-7'>
            <p className='text-[#0C3E4999] text-lg lg:text-right mt-8  lg:text-[24px] font-[500] font-sourceSans3 '>
              Experience leisure and lifestyle come together at The Club. As part of your Vilasam journey, enjoy exclusive membership to the Vaikuntam City Clubhouse, an elegant space designed for relaxation, connection, and recreation.
            </p>
          </div>
        </div>

        {/* Image container with gradient */}
        <div className='relative'>
          <Image
            src="/images/vilasamPageImages/image3.webp"
            alt='vilasam'
            height={1000}
            width={1000}
            className='w-full   '
          />
          <div className="absolute bottom-0 left-0 w-full h-[100px] lg:h-[170px] bg-gradient-to-t from-white to-transparent" />
        </div>
      </div>
    </section>
  )
}

export default LyfeStyle
