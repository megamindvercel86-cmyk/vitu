import Typography from "@/components/Typography/Typography";

export default function ProjectHeader() {
  return (
    <>
    <div className=" mb-[200px] text-center">
  <Typography
    variant="custom"
    className="font-freightNeoMedium text-[#4F3737] text-lg px-7 pb-6 sm:text-xl md:px-0 md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[2.125rem] max-w-3xl mx-auto"
  >
    Just 5 minutes away from the serene NITK Surathkal beach, our premium
    plotted development offers unparalleled access to coastal beauty.
  </Typography>
  <Typography
    variant="h1"
    className="font-freightNeoMedium text-customBrown text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[60px] !leading-none mt-6 max-w-4xl mx-auto"
  >
    Enjoy the waves & the ease of beachside living.
  </Typography>
</div>

</>
  );
}
