import PojectInfiniteCarousel from "@/components/ProjectsPageComponents/ProjectFilterComponent/ProjectFilterInfiniteCarousel/ProjectFilterInfiniteCarousel";
import ProjectListing from "@/components/ProjectsPageComponents/ProjectsPageCommonComponents/ProjectListing/ProjectListing";
import Typography from "@/components/Typography/Typography";
import { Carousel } from "@/components/ui/apple-cards-carousel";
import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    id: 1,
    category:"Project #1",
    title: "Vilasam",
    subtitle: "How Home Buying Has Evolved",
    url: "/images/projects/vilasam.webp",
    href: "/vilasam"
  },
  {
    id: 2,
    category:"Project #2",
    title: "Vaikuntam City Elite",
    subtitle: "Building Sustainably for a Better Tomorrow",
    url: "/images/projects/elite.webp",
    href: "/elite",
    soldOut: true
  },
  {
    id: 3,
    category:"Project #3",
    title: "Vaikuntam City",
    subtitle: "Build a Healthier Planet with Sustainable Choices",
    url: "/images/projects/city.webp",
    href: "/vaikuntamcity",
    soldOut: true
  },
];

export default function FeaturedProjects() {
  return (
    <section className="bg-[#FBF7F3] pb-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="md:block hidden relative z-0 overflow-hidden">
          <Typography className=" text-center font-FreightNeoProNormal text-base text-[#4F373799] lg:text-xl 2xl:text-[2.125rem]">
            Featured Projects
          </Typography>
          <h2
            className="w-[224px]  text-center hidden lg:block md:w-full text-2xl lg:text-5xl lg2:text-6xl font-freightNeoMedium leading-[28px] md:leading-[72px] xl:leading-[67px] 2xl:leading-[100px] text-[#503637]"
          >
            A New Home, A New Way of Life
          </h2>
        </div>

        <main className="lg:pt-[94px]  pt-[59px]">
          {/* Header Section */}

          {/* Desktop Carousel */}
          <div className="relative lg:block hidden">
            <div className="w-full h-full">
              <Carousel
                items={cards.map((card, index) => (
                  <ProjectListing key={index} card={card} index={index} layout={true} />
                ))}
              />
            </div>
          </div>

          {/* Mobile Carousel */}
          <div className="relative md:block lg:hidden">
            <PojectInfiniteCarousel cards={cards} />
          </div>
        </main>
      </div>
    </section>
  );
}
