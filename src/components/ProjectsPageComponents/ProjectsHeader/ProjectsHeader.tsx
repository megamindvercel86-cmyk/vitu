import Typography from "@/components/Typography/Typography";

export default function ProjectHeader() {
  return (
    <div className="pt-[128px] pb-[107px] text-center">
      <Typography
        variant="custom"
        className="font-freightNeoMedium text-[#4F3737] text-[1rem]
                     pb-6 sm:text-[1.375rem] md:px-32 md:text-[1.125rem] 2xl:text-[2.125rem]"
      >
        Discover a thoughtfully designed, uniquely authentic experience just for
        you. Enjoy a harmonious blend of modern design, lush surroundings, &
        exclusive amenities, setting a new standard for coastal living at
        Vaikuntam City.
      </Typography>
      <Typography
        variant="custom"
        className="font-freightNeoMedium text-customBrown text-[1.5rem]
                     px-7 sm:text-[1.5rem] md:px-0 md:text-[2.5rem] lg2:text-[3.5rem] 2xl:text-[5rem]"
      >
        Discover Your Sanctuary
      </Typography>
    </div>
  );
}
