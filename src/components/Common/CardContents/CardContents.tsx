import { ArrowRightIcon } from "@/components/Icons/Icons";
import Typography from "@/components/Typography/Typography";

// Update the CardContent component to accept props
const CardContent = ({bottomTitle,content}:{bottomTitle:string,content:string}) => {
  return (
    <>
   
        <div key={"dummy-content"}>
          <Typography variant="h1" className="text-customBrown">
            {bottomTitle}
          </Typography>
          {/* <Typography
              variant="h2"
              className="font-freightNeoMedium text-[#040707CC] !text-[22px]"
            >
              {project.subtitle}
            </Typography> */}
          <Typography className="text-[#04070799] font-FreightNeoProNormal pt-[50px]  !text-xl">{content}</Typography>
          {/* {project.sections.map((section, index) => (
              <div key={index}>
                <Typography
                  variant="h2"
                  className="font-freightNeoSemibold text-[#040707CC] !text-[26px] pt-[45px]"
                >
                  {section.heading}
                </Typography>
                <Typography className="text-[#04070799] font-FreightNeoProNormal !text-xl">
                  {section.description}
                </Typography>
                {section.subsections &&
                  section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex}>
                      <Typography className="font-FreightNeoProNormal text-[#04070799]  !text-xl">
                        <strong>{subsection.subheading}:</strong>{" "}
                        {subsection.description}
                      </Typography>
                    </div>
                  ))}
              </div>
            ))} */}
          <Footer  nextProjectTitle="Next Project Title" />
        </div>
    </>
  );
};

export default CardContent;
interface FooterProps {
  onFooterClick?: () => void;
  nextProjectTitle: string;
}

const Footer: React.FC<FooterProps> = ({ onFooterClick, nextProjectTitle }) =>{
  return (
    <div className="bg-white rounded-b-xl lg:rounded-b-3xl pb-20 pt-20 lg:pb-0">
      <hr className="w-full h-[2px] bg-[#BDBEC2]" />
      <div
        //   onClick={onFooterClick}
        className="px-0  container gap-8 lg:gap-48 flex justify-between lg:justify-between items-center py-10 lg:py-14 cursor-pointer"
      >
        <div>
          <p className="text-xs text-[#8E8E93] uppercase font-roboto">Next Project</p>
          <h4 className="text-black1 font-roboto font-bold text-base max-w-[15rem] lg:max-w-none">Next Project Title </h4>
        </div>
        <ArrowRightIcon />
      </div>
    </div>
  );
};
