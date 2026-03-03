import AvailablePlotOrientations from "@/components/VaikuntamCityElite/landing-page/AvailablePlotOrientations";
import Enquiry from "@/components/VaikuntamCityElite/landing-page/Enquiry";
import Features from "@/components/VaikuntamCityElite/landing-page/Features";
import Hero from "@/components/VaikuntamCityElite/landing-page/Hero";
import InvestmentPotential from "@/components/VaikuntamCityElite/landing-page/InvestmentPotential";
import MapSection from "@/components/VaikuntamCityElite/landing-page/Map";
import NumberCounter from "@/components/VaikuntamCityElite/landing-page/NumberCounter";
import TheClub from "@/components/VaikuntamCityElite/landing-page/TheClub";
import EliteNavbar2 from "@/components/VaikuntamCityElite/Navbar/EliteNavbar-2";

// data for components

import herobg from "../../../../../public/images/vaikuntamCityEliteLandingPage/hero-bg.webp";
import herobgMobile from "../../../../../public/images/vaikuntamCityEliteLandingPage/hero-bg1.webp";

import OurElevatedVision2 from "@/components/VaikuntamCityElite/landing-page/OurElevatedVision2";
import Accordian1Image from "../../../../../public/images/vaikuntamCityEliteLandingPage/riverAndSea.webp";
import Accordian2Image from "../../../../../public/images/vaikuntamCityEliteLandingPage/accordian2img.webp";
import Accordian3Image from "../../../../../public/images/vaikuntamCityEliteLandingPage/accordian3img.webp";
import Accordian4Image from "../../../../../public/images/vaikuntamCityEliteLandingPage/accordian4img.webp";
import availablePlot1 from "../../../../../public/images/vaikuntamCityEliteLandingPage/availablePlot1.webp";
import availablePlot2 from "../../../../../public/images/vaikuntamCityEliteLandingPage/availablePlot2.webp";
import availablePlot3 from "../../../../../public/images/vaikuntamCityEliteLandingPage/availablePlot3.webp";
import NumberCounter2 from "@/components/VaikuntamCityElite/landing-page/NumberCounter2";

export default function vaikuntamCityEliteLandingPage() {
  return (
    <>
      <EliteNavbar2 />
      <Hero
        herobg={herobg}
        herobgMobile={herobgMobile}
        title={{
          title1: "Settle Into Mangaluru’s",
          title2: "Finest Living",
        }}
      />
      <OurElevatedVision2
        numberCounterData={numberCounterData2}
        title={ourElevatedVisionData.title}
        description={ourElevatedVisionData.description}
        imageSection1={ourElevatedVisionData.imageSection1}
        imageSection2={ourElevatedVisionData.imageSection2}
      />
      <NumberCounter2 data={numberCounterData} />
      <TheClub />
      <Features style="2" accordianData={accordianData} />
      {/* <InvestmentPotential /> */}
      {/* <AvailablePlotOrientations
        image1={availablePlot1}
        image2={availablePlot2}
        image3={availablePlot3}
      /> */}
      <Enquiry premise="Vaikuntam City Elite - Landing Page 2" userType="Home Buyer" />
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

const numberCounterData2 = [
  {
    description: "European style concrete roads",
    title: "30 Feet",
    icon: "track",
  },
  {
    description: "spread across layout",
    title: "25+ Shade trees",
    icon: "tree",
  },
  {
    description: "Secure gated community",
    title: "24X7 Security",
    icon: "security",
  },
  {
    description: "for wellness & leisure",
    title: "20+ Amenities",
    icon: "amenities",
  },
];

const accordianData = [
  {
    trigger: "Coastal Living",
    value: "1",
    content: AccordianContent([
      "Thriving coastal city with growing potential",
      "Gateway to Karnataka’s industrial corridor",
      "Strong presence of tech and ports",
      "Rich in culture, education and commerce",
      "Balanced lifestyle with scenic surroundings",
    ]),
    image: Accordian1Image,
  },
  {
    trigger: "Amenities",
    value: "2",
    content: AccordianContent([
      "Clubhouse designed for comfort and connection",
      "Dedicated barbecue zones for relaxed, outdoor gatherings",
      "Shaded walkways and tree-lined internal roads for peaceful strolls",
      "Yoga pavilion designed for mindful ease",
      "Amphitheatre space for shared community moments",
    ]),
    image: Accordian2Image,
  },
  {
    trigger: "Automation",
    value: "3",
    content: AccordianContent([
      "Automated entry gates for secure access",
      "Automatic irrigation to nourish green zones",
      "Solar lighting that powers every pathway",
      "Streetlights with auto on/off functionality",
      "Low-maintenance systems, thoughtfully integrated",
    ]),
    image: Accordian4Image,
  },
  {
    trigger: "The Club",
    value: "4",
    content: AccordianContent([
      "Mangalore’s first pickle ball court",
      "Serene yoga and meditation hall",
      "Fully-equipped fitness studio",
      "Swimming pool with deck and shade",
      "Indoor games and reading lounge",
    ]),
    image: Accordian3Image,
  },
];

const numberCounterData = [
  {
    description: "To the NITK Campus",
    title: "5 MINS",
    icon: "campus",
  },
  {
    description: "To NITK Beach",
    title: "5 MINS",
    icon: "lighthouse",
  },
  {
    description: "To Closest Hospitals",
    title: "5 MINS",
    icon: "hospital",
  },
  {
    description: "To Closest Shopping Centres",
    title: "7 MINS",
    icon: "shopping",
  },
];

const ourElevatedVisionData = {
  title: "Your Dream Address",
  description:
    "Step into a neighbourhood where luxury, comfort, and security come together effortlessly. From peaceful surroundings to thoughtful amenities, every detail is crafted to enrich your family’s lifestyle. At Vaikuntam City Elite, you don’t just move in, you arrive at everything you’ve ever wanted in a home.",
  imageSection1: {
    image: {
      src: "/images/vaikuntamCityEliteLandingPage/peopleGroup.webp",
      alt: "group image",
      width: 1000,
      height: 730,
    },
    superscript: "Residential Luxury Villa Plots for Sale",
    heading: "Where every sunrise feels like home, together",
    text: "At Vaikuntam City Elite, you don’t just own a home. You become part of a community rooted in trust, elegance and peace of mind. From children playing freely to conversations that stretch into golden evenings, every detail is designed to protect what matters most. Neighborhood safety is a priority and Wholesome living is the everyday standard.",
  },
  imageSection2: {
    image: {
      src: "/images/vaikuntamCityEliteLandingPage/familyOnBeach.webp",
      alt: "group image",
      width: 812,
      height: 655,
    },
    superscript: "Effortless Access",
    heading: "Your Essentials Just Minutes Away",
    text: "Live where your family’s needs are always within reach. From education and healthcare to shopping and leisure, everything is just around the corner. Vaikuntam City Elite is thoughtfully placed to keep you close to what matters most.",
  },
};
