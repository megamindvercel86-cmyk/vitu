import Typography from "@/components/Typography/Typography";

export default function StoryHeader() {
  return (
    <div className="pt-[128px] pb-[107px] text-center">
      <Typography
        variant="custom"
        className="font-freightNeoMedium text-[#4F3737] text-[1rem]
                     px-7 pb-6 sm:text-[1.375rem] md:px-0 md:text-[1.125rem] 2xl:text-[2.125rem]"
      >
        From the welcoming comfort at your doorstep to the serene spaces
        designed just for you
      </Typography>
      <Typography
        variant="custom"
        className="font-freightNeoMedium text-customBrown text-[1.5rem]
                     px-7 sm:text-[1.5rem] md:px-0 md:text-[2.5rem] lg2:text-[3.5rem] 2xl:text-[5rem]"
      >
        At Vitu, Every Design Feels Like Home—Because It Is
      </Typography>
    </div>
  );
}
