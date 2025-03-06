import Typography from "@/components/Typography/Typography";

export default function ProjectHeader() {
  return (
    <div className="">
      <Typography
        variant="custom"
        className="font-freightNeoMedium text-[#4F3737] text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto"
      >
        Just 5 minutes away from the serene NITK Surathkal beach, our premium
        plotted development offers unparalleled access to coastal beauty.
      </Typography>
      <Typography
        variant="h1"
        className="font-freightNeoMedium text-customBrown text-xl md:text-2xl lg:text-3xl !leading-none xl:text-[60px] mt-6 max-w-4xl"
      >
        Enjoy the waves & the ease of beachside living.
      </Typography>
    </div>
  );
}
