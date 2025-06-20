import Typography from "@/components/Typography/Typography";

export default function ProjectHeader() {
  return (
    <>
      <div className=" text-center">
       <Typography
          variant="custom"
          className="font-freightNeoMedium text-[#4F3737] pb-6 md:text-xl lg2:text-2xl lg:text-xl text-sm px-4 max-w-3xl mx-auto"
        >
          Just <span className="font-CandideCondensedNormal">5</span> minutes away from the serene NITK Surathkal beach, our premium plotted
          development offers unparalleled access to coastal beauty.
        </Typography>
        <h1
          className="font-freightNeoMedium  text-customBrown  lg:leading-none md:mt-6 max-w-4xl text-2xl md:text-3xl lg:text-5xl lg2:text-6xl md:max-w-2xl md:mx-3 lg:mx-auto"
        >
          Enjoy the waves & the ease of beachside living.
        </h1>
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-8xl mx-auto px-4 pb-7 lg:pb-36">
          <div className="flex flex-col items-center">
            <h2    className="font-CandideCondensedNormal text-customBrown text-[1.5rem] lg:text-5xl ">
              5 mins
            </h2>
            <Typography variant="custom" className="font-freightNeoMedium text-[#4F3737] mt-2 text-sm lg:text-lg">
              from NITK Beach
            </Typography>
          </div>
          <div className="flex flex-col items-center">
            <h2  className="font-CandideCondensedNormal text-customBrown text-[1.5rem] lg:text-5xl">
              20 mins
            </h2>
            <Typography variant="custom" className="font-freightNeoMedium text-[#4F3737] mt-2 text-sm lg:text-lg">
              to the Mangaluru Airport
            </Typography>
          </div>
          <div className="flex flex-col items-center">
            <h2  className="font-CandideCondensedNormal text-customBrown text-[1.5rem] lg:text-5xl">
              5 mins
            </h2>
            <Typography variant="custom" className="font-freightNeoMedium text-[#4F3737] mt-2 text-sm lg:text-lg">
              to the closest Hospital
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
}
