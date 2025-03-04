import { ArrowRightIcon } from "@/components/Icons/Icons";
import Typography from "@/components/Typography/Typography";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import sustainabilityInitiatives from "@/data/sustainabilityInitiatives.json";
// Update the CardContent component to accept props
const CardContent = ({id}: {id:number}) => {
  const [currentCardId, setCurrentCardId] = useState(id);


  let project: {
    id: number;
    url: string;
    title: string;
    description: string;
} | undefined

   project = sustainabilityInitiatives.find((project) => project.id === currentCardId);

  const handleFooterClick = () => {
    console.log(
      "Footer clicked - navigate to next project or perform other action"
    );

    const nextProject = sustainabilityInitiatives.find((project) => {
      if (project.id === 16) {
        return 14 === currentCardId;
      } else {
        return project.id + 1 === currentCardId;
      }
    });

    if (nextProject) {
      setCurrentCardId(nextProject.id); // Update state to trigger re-render
    }
  };

  const nextProject = sustainabilityInitiatives.find((project) => {
    if (project.id === 16) {
      return 14 === currentCardId;
    } else {
      return project.id + 1 === currentCardId;
    }
  });

  console.log(nextProject);

  return (
    <>
      <div key={"dummy-content"}>
        <Image
          src={project?.url || "/placeholder.svg"}
          alt={project?.title || "Card image"}
          width={1042}
          height={45}
          className={cn("object-   h-[652px] w-full")}
        />
        <div className="p-4 md:p-10">
          <Typography variant="h1" className="text-customBrown">
            {project?.title}
          </Typography>
          <Typography className="text-[#04070799] font-FreightNeoProNormal pt-[20px] !text-xl">{project?.description}</Typography>
          <Footer
                    onFooterClick={handleFooterClick}
                    nextProjectTitle={nextProject?.title || ""}
                  />
        </div>
      </div>
    </>
  );
};

export default CardContent;
interface FooterProps {
  onFooterClick?: () => void;
  nextProjectTitle: string;
}

const Footer: React.FC<FooterProps> = ({ onFooterClick, nextProjectTitle }) => {
  return (
    <div className="bg-white rounded-b-xl lg:rounded-b-3xl pb-20 pt-20 lg:pb-0">
      <hr className="w-full h-[2px] bg-[#BDBEC2]" />
      <div
        className="px-0  container gap-8 lg:gap-48 flex justify-between lg:justify-between items-center py-10 lg:py-14 "
      >
        <div>
          <p className="text-xs text-[#8E8E93] uppercase font-roboto">Up Next</p>
          <h4 className="text-black1 font-roboto font-bold text-base max-w-[15rem] lg:max-w-none">{nextProjectTitle} </h4>
        </div>
          
          <div onClick={onFooterClick} className="cursor-pointer">
          <ArrowRightIcon />

        </div>
      </div>
    </div>
  );
};
