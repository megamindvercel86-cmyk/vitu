import AvailablePlotOrientations from "@/components/VaikuntamCityElite/landing-page/AvailablePlotOrientations";
import Enquiry from "@/components/VaikuntamCityElite/landing-page/Enquiry";
import Features from "@/components/VaikuntamCityElite/landing-page/Features";
import Hero from "@/components/VaikuntamCityElite/landing-page/Hero";
import InvestmentPotential from "@/components/VaikuntamCityElite/landing-page/InvestmentPotential";
import MapSection from "@/components/VaikuntamCityElite/landing-page/Map";
import NumberCounter from "@/components/VaikuntamCityElite/landing-page/NumberCounter";
import OurElevatedVision from "@/components/VaikuntamCityElite/landing-page/OurElevatedVision";
import TheClub from "@/components/VaikuntamCityElite/landing-page/TheClub";
import EliteNavbar2 from "@/components/VaikuntamCityElite/Navbar/EliteNavbar-2";

// data for components

import herobg from "../../../../../public/images/vaikuntamCityEliteLandingPage/hero-bg.webp";
import herobgMobile from "../../../../../public/images/vaikuntamCityEliteLandingPage/hero-bg1.webp";

import Accordian1Image from "../../../../../public/images/vaikuntamCityEliteLandingPage/accordian1img.webp";
import Accordian2Image from "../../../../../public/images/vaikuntamCityEliteLandingPage/accordian2img.webp";
import Accordian3Image from "../../../../../public/images/vaikuntamCityEliteLandingPage/accordian3img.webp";
import Accordian4Image from "../../../../../public/images/vaikuntamCityEliteLandingPage/accordian4img.webp";
export default function vaikuntamCityEliteLandingPage() {
  return (
    <>
      <EliteNavbar2 />
      <Hero
        herobg={herobg}
        herobgMobile={herobgMobile}
        title={{
          title1: "A Signature Landmark",
          title2: "of Coastal Luxury",
        }}
        objectPosition="object-top"
      />
      <OurElevatedVision
        title={ourElevatedVisionData.title}
        description={ourElevatedVisionData.description}
        imageSection1={ourElevatedVisionData.imageSection1}
        imageSection2={ourElevatedVisionData.imageSection2}
      />
      <NumberCounter data={numberCounterData} />
      <TheClub />
      <Features accordianData={accordianData} />
      <InvestmentPotential />
      <AvailablePlotOrientations />
      <Enquiry premise="Vaikuntam City Elite - Landing Page" userType="" />
      <MapSection />
    </>
  );
}

const AccordianContent = (list: Array<string>) => {
  return (
    <ul className="pl-6 list-disc space-y-2">
      {list.map((item) => (
        <li
          className="font-hankenGrotesk text-lg leading-[24px]"
          style={{
            color: "#E0D9C7",
          }}
          key={item}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

const accordianData = [
  {
    trigger: "Sustainable by Design",
    value: "1",
    content: AccordianContent([
      "Over 25 native and flowering trees",
      "Drip-irrigated greenery throughout the layout",
      "Tree-lined internal roads and shaded walkways",
      "Pocket gardens and outdoor seating zones",
      "Thoughtfully preserved green buffers",
    ]),
    image: Accordian1Image,
  },
  {
    trigger: "Wellness and Leisure",
    value: "2",
    content: AccordianContent([
      "Open-air yoga pavilion for morning routines",
      "Amphitheatre for small gatherings and cultural evenings",
      "Meditation-friendly zones across the layout",
      "Lawn areas for informal play and evening strolls",
    ]),
    image: Accordian2Image,
  },
  {
    trigger: "The Club",
    value: "3",
    content: AccordianContent([
      "Serene yoga and meditation hall",
      "Fully-equipped fitness studio",
      "Swimming pool with deck and shade",
      "Indoor games and reading lounge",
      "Community hosting area and event room",
    ]),
    image: Accordian3Image,
  },
  {
    trigger: "Foundations That Last",
    value: "4",
    content: AccordianContent([
      "Plug & play utility systems for every plot",
      "24x7 gated security and surveillance",
      "Solar-powered street lighting",
      "Wide internal roads for smooth navigation",
    ]),
    image: Accordian4Image,
  },
];

const numberCounterData = [
  {
    targetNumber: 7,
    delay: 0,
    description: "to the NITK Campus",
    title: "mins",
  },
  {
    targetNumber: 5,
    delay: 0,
    description: "to the Surathkal Lighthouse Beach",
    title: "mins",
  },
  {
    targetNumber: 5,
    delay: 0,
    description: "to the Closest Hospital",
    title: "mins",
  },
  {
    targetNumber: 7,
    delay: 0,
    description: "to the Closest Shopping Centre",
    title: "mins",
  },
];

const ourElevatedVisionData = {
  title: " A Tapestry of Space, Light and Intention",
  description:
    " Gracefully situated behind NITK in Surathkal, Vaikuntam City Elite presents 11 luxury villa plots. Embraced by coastal tranquility and urban ease, it is a rare address defined by refinement, purpose and enduring worth.",
  imageSection1: {
    image: {
      src: "/images/vaikuntamCityEliteLandingPage/peopleGroup.webp",
      alt: "group image",
      width: 1000,
      height: 730,
    },
    superscript: "Our Elevated Vision",
    heading: "The Art Of Wholesome Living",
    text: "Home is where life feels in tune and each person finds space and every moment feels shared. At Vaikuntam City Elite, spaces are shaped to support both togetherness and individuality, allowing family life to unfold with grace.",
  },
  imageSection2: {
    image: {
      src: "/images/vaikuntamCityEliteLandingPage/familyOnBeach.webp",
      alt: "group image",
      width: 812,
      height: 655,
    },
    superscript: "Placed with Purpose",
    heading: "Situated for the Life You Envision",
    text: "Vaikuntam City Elite sits in a corridor of quiet growth and everyday access. From the shoreline to top schools and healthcare, everything you need is minutes away. It’s a setting that doesn’t ask you to choose between pace and peace , but it simply gives you both.",
  },
};
