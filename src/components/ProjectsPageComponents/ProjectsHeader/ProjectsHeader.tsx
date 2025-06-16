import Typography from "@/components/Typography/Typography";

export default function ProjectHeader() {
  return (
    <>
      <div className=" text-center">
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-8xl mx-auto px-4  pb-36">
          <div className="flex flex-col items-center">
            <Typography variant="custom" className="font-CandideCondensedNormal text-customBrown text-4xl lg:text-5xl">
              5 mins
            </Typography>
            <Typography variant="custom" className="font-freightNeoMedium text-[#4F3737] mt-2 text-lg">
              from NITK Beach
            </Typography>
          </div>
          <div className="flex flex-col items-center">
            <Typography variant="h2" className="font-CandideCondensedNormal text-customBrown text-4xl lg:text-5xl">
              20 mins
            </Typography>
            <Typography variant="custom" className="font-freightNeoMedium text-[#4F3737] mt-2 text-lg">
              to the Mangaluru Airport
            </Typography>
          </div>
          <div className="flex flex-col items-center">
            <Typography variant="h2" className="font-CandideCondensedNormal text-customBrown text-4xl lg:text-5xl">
              5 mins
            </Typography>
            <Typography variant="custom" className="font-freightNeoMedium text-[#4F3737] mt-2 text-lg">
              to the closest Hospital
            </Typography>
          </div>
        </div>
        <Typography
          variant="custom"
          className="font-freightNeoMedium text-[#4F3737] pb-6 md:text-xl lg2:text-2xl lg:text-xl text-base px-4 max-w-3xl mx-auto"
        >
          Just <span className="font-CandideCondensedNormal">5</span> minutes away from the serene NITK Surathkal beach, our premium plotted
          development offers unparalleled access to coastal beauty.
        </Typography>
        <Typography
          variant="h1"
          className="font-freightNeoMedium  text-customBrown !leading-none md:mt-6 max-w-4xl text-xl md:text-3xl lg:text-5xl lg2:text-6xl md:max-w-2xl md:mx-3 lg:mx-auto"
        >
          Enjoy the waves & the ease of beachside living.
        </Typography>

      </div>
    </>
  );
}
