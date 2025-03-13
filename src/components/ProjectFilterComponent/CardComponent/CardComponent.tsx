"use client";

import InfiniteCarousel from "@/components/Common/InfiniteCarousel/InfiniteCarousel";
import ProjectListing from "@/components/ProjectsPageCommonComponents/ProjectListing/ProjectListing";
import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import React from "react";
import PojectInfiniteCarousel from "../ProjectFilterInfiniteCarousel/ProjectFilterInfiniteCarousel";

interface Article {
  id: number;
  category: string;
  title: string;
  description: string;
  type: "primary" | "secondary";
  url: string;
  href:string
}

const ARTICLES: Article[] = [
  {
    id: 1,
    category: "Project #1",
    title: "Vaikuntam City",
    description: "A cleaner environment starts with us.",
    type: "secondary",
    url: "/images/projectFilter/image1.png",
    href:"/vaikuntamcity"
  },
  {
    id: 2,
    category: "Project #2",
    title: "Mithila",
    description: "Protect the planet with sustainable choices.",
    type: "secondary",
    url: "/images/projectFilter/image2.png",
    href:"/vaikuntamcity"
  },
  {
    id: 3,
    category: "Project #3",
    title: "Vilasam",
    description: "Build a healthier planet with sustainable choices.",
    type: "secondary",
    url: "/images/projectFilter/image3.png",
    href:"/vaikuntamcity"
  },
  
];

const ARTICLES_MOBAIL: Article[] = [
  {
    id: 1,
    category: "Project #1",
    title: "Vaikuntam City",
    description: "A cleaner environment starts with us.",
    type: "secondary",
    url: "/images/projectFilter/image1.png",
    href:"/vaikuntamcity"
  },
  {
    id: 2,
    category: "Project #2",
    title: "Mithila",
    description: "Protect the planet with sustainable choices.",
    type: "secondary",
    url: "/images/projectFilter/image2.png",
    href:"/vaikuntamcity"
  },
  {
    id: 3,
    category: "Project #3",
    title: "Vilasam",
    description: "Build a healthier planet with sustainable choices.",
    type: "secondary",
    url: "/images/projectFilter/image3.png",
    href:"/vaikuntamcity"
  },
  {
    id: 4,
    category: "Project #1",
    title: "Vaikuntam City",
    description: "A cleaner environment starts with us.",
    type: "secondary",
    url: "/images/projectFilter/image1.png",
    href:"/vaikuntamcity"
  },
  {
    id: 5,
    category: "Project #2",
    title: "Mithila",
    description: "Protect the planet with sustainable choices.",
    type: "secondary",
    url: "/images/projectFilter/image2.png",
    href:"/vaikuntamcity"
  },
  {
    id: 6,
    category: "Project #3",
    title: "Vilasam",
    description: "Build a healthier planet with sustainable choices.",
    type: "secondary",
    url: "/images/projectFilter/image3.png",
    href:"/vaikuntamcity"
  },
];

const ProjectFilter = () => {
  return (
    <div className=" 2xl:w-full xl:max-w-[1380px] justify-center 2xl:max-w-[2000px] xl:mx-auto lg:max-w-[1244px] mb-10  lg:mx-auto lg:px-2">
      <main className="lg:pt-[94px] xl:pt-[117px] pt-[59px]">
        {/* Header Section */}

        {/* Desktop Carousel */}
        <div className="relative lg:block hidden">
          <div className="w-full h-full">
            <Carousel
              items={ARTICLES.map((card, index) => (
                <ProjectListing key={index} card={card} index={index} layout={true} />
              ))}
            />
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="relative md:block lg:hidden">
        <PojectInfiniteCarousel cards={ARTICLES_MOBAIL}  />
      </div>
      </main>
    </div>
  );
};

export default ProjectFilter;
