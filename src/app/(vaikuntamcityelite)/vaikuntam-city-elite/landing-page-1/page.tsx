import AvailablePlotOrientations from "@/components/VaikuntamCityElite/landing-page/AvailablePlotOrientations";
import Enquiry from "@/components/VaikuntamCityElite/landing-page/Enquiry";
import Features from "@/components/VaikuntamCityElite/landing-page/Features";
import Hero from "@/components/VaikuntamCityElite/landing-page/Hero";
import InvestmentPotential from "@/components/VaikuntamCityElite/landing-page/InvestmentPotential";
import MapSection from "@/components/VaikuntamCityElite/landing-page/Map";
import NumberCounter from "@/components/VaikuntamCityElite/landing-page/NumberCounter";
import TheClub from "@/components/VaikuntamCityElite/landing-page/TheClub";
import EliteNavbar2 from "@/components/VaikuntamCityElite/Navbar/EliteNavbar-2";
import OurElevatedVision2 from "@/components/VaikuntamCityElite/landing-page/OurElevatedVision2";
// data for components
import herobg from "../../../../../public/images/vaikuntamCityEliteLandingPage/investors-hero-bg.webp";
import herobgMobile from "../../../../../public/images/vaikuntamCityEliteLandingPage/Hero Phone.webp";
import Accordian1Image from "../../../../../public/images/vaikuntamCityEliteLandingPage/cargoShip.webp";
import Accordian2Image from "../../../../../public/images/vaikuntamCityEliteLandingPage/highway.webp";
import Accordian3Image from "../../../../../public/images/vaikuntamCityEliteLandingPage/accordian3img.webp";
import Accordian4Image from "../../../../../public/images/vaikuntamCityEliteLandingPage/skyScrappers.webp";
import availablePlot1 from "../../../../../public/images/vaikuntamCityEliteLandingPage/availablePlot1.webp";
import availablePlot2 from "../../../../../public/images/vaikuntamCityEliteLandingPage/availablePlot2.webp";
import availablePlot3 from "../../../../../public/images/vaikuntamCityEliteLandingPage/availablePlot3.webp";
import NumberCounter2 from "@/components/VaikuntamCityElite/landing-page/NumberCounter2";
import Features2 from "@/components/VaikuntamCityElite/landing-page/Features2";
export default function vaikuntamCityEliteLandingPage() {
  return (
    <>
      <EliteNavbar2 leftAlignLogos />
      <Hero
        leftAlign
        herobg={herobg}
        herobgMobile={herobgMobile}
        title={{
          title1: "Invest in Coastal Karnataka’s",
          title2: "Fastest Growing Corridor",
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
      <Features2 style="2" accordianData={accordianData} />
      {/* <InvestmentPotential />
      <AvailablePlotOrientations
        image1={availablePlot1}
        image2={availablePlot2}
        image3={availablePlot3}
      /> */}
      <Enquiry userType="Investor" />
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
    description: "In the past 3 years",
    title: "2X Growth",
    icon: "growth",
  },
  {
    description: "City Access",
    title: "15 Mins",
    icon: "expressway",
  },
  {
    description: "Future Growth from SEZs, Port & Expressway",
    title: "10X",
    icon: "growth2",
  },
  {
    description: "Resale Flexibility",
    title: "3 Years",
    icon: "keyinhand",
  },
];


const accordianData = [
  {
    trigger: "Mangalore",
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
    trigger: "Current Infrastructure",
    value: "2",
    content: AccordianContent([
      "Mangalore International Airport",
      "New Mangalore Port Trust (NMPT)",
      "20+ Top Educational Institutions",
      "10+ Major Hospitals",
      "National Highways NH-66, NH-75, NH-169 connectivity",
    ]),
    image: Accordian2Image,
  },
  {
    trigger: "Future Development",
    value: "3",
    content: AccordianContent([
      "Mangalore International Airport Expansion",
      "New Mangalore Port Upgradation",
      "Industrial & IT Boom ",
      "Smart City Projects Phase-2 ",
      "Silicon Beach Program",
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
    description: "To Mangalore International Airport",
    title: "20 MINS",
    icon: "airport",
  },
  {
    description: "To NITK Beach",
    title: "5 MINS",
    icon: "lighthouse",
  },
  {
    description: "to NH66",
    title: "Effortless Access",
    icon: "nh66",
  },
  {
    description: "To the Port",
    title: "10 Mins",
    icon: "ship",
  },
];

const ourElevatedVisionData = {
  title: "Invest in Land That Gives Beyond Value",
  description:
    "Set in Mangalore’s fastest-growing corridor, these exclusive luxury villa plots combine premium location with assured potential. With seamless connectivity and consistent value growth, this land is an investment that stands ahead of time.",
  imageSection1: {
    image: {
      src: "/images/vaikuntamCityEliteLandingPage/couplesHoldingHand.webp",
      alt: "group image",
      width: 1000,
      height: 730,
    },
    superscript: "Residential Luxury Villa Plots for Sale",
    heading: "Mangalore, The Only City Connected By All 4 Modes of Transport",
    text: "At Vaikuntam City Elite, clarity isn’t just a promise it’s built into every square foot. Strategically located in Mangalore’s high-growth corridor, these luxury villa plots offer planned infrastructure, strong connectivity, and long-term value you can see unfolding. This is land for those who invest with vision and expect returns with confidence.",
  },
  imageSection2: {
    image: {
      src: "/images/vaikuntamCityEliteLandingPage/riverAndSea.webp",
      alt: "group image",
      width: 812,
      height: 655,
    },
    superscript: "Coastal Growth Hub",
    heading: "The Coastal Powerhouse Of Investment",
    text: "Mangalore is rapidly emerging as one of India’s top investment corridors, backed by strong infrastructure growth and seamless connectivity. These exclusive villa plots lie in a zone witnessing exponential value appreciation and rising demand. It offers a rare combination of coastal serenity and strong connectivity, making it a region that’s quietly expanding on every front.",
  },
};
