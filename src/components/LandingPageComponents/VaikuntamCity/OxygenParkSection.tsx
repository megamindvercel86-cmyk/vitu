"use client";

//============ Component Imports =============
import Accordion, { AccordionItem } from "@/components/Common/Accordian";
import { TickIcon } from "@/components/Icons/Icons";
import Typography from "@/components/Typography/Typography";
import Image from "next/image";
import StatsComponent from "../StatsComponent";

// ============ Function to generate Accordian Item Content =============
// This function generates the content for each accordion item
// It takes an array of strings and returns a list of items with a tick icon
// Each item is styled with a specific font and color
const AccordianItemContent = (
  data: Array<{
    label: string;
    icon: string;
  }>
) => {
  return (
    <ul className="">
      {data.map((item, index) => (
        <li
          key={index}
          className="flex items-center gap-3 text-customCongoBrown/60 font-fsSplitSans text-sm md:text-base p-3 rounded-lg hover:bg-[#DABFA1]/20 w-fit cursor-default transition-colors duration-300"
        >
          <img
            src={`/images/VaikuntamCityLandingPage/icons/${item.icon}`}
            alt="Logo"
            className="w-6 h-6 "
            width={50}
            height={50}
            loading="lazy"
          />
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
};

// Accordian data for the Oxygen Park section
const accordianData = [
  {
    value: "1",
    trigger: "Outdoor Activities",
    content: AccordianItemContent([
      {
        label: "Walking & Jogging Path",
        icon: "jogging-walking-path.svg",
      },
      {
        label: "Swimming Pool",
        icon: "swimming-pool.svg",
      },
    ]),
  },
  {
    value: "2",
    trigger: "Sports & Fitness Facilities",
    content: AccordianItemContent([
      {
        label: "Yoga Hall",
        icon: "yoga-hall.svg",
      },
      {
        label: "Gymnasium",
        icon: "gym.svg",
      },
      {
        label: "Games room",
        icon: "games-room.svg",
      },
      {
        label: "Basketball Court",
        icon: "basketball-court.svg",
      },
      {
        label: "Badminton Court",
        icon: "badminton-court.svg",
      },
    ]),
  },
  {
    value: "3",
    trigger: "Wellness & Recreation",
    content: AccordianItemContent([
      {
        label: "Oxygen Park",
        icon: "oxygen-park.svg",
      },
      {
        label: "Pond with Bridge Walk",
        icon: "pond-with-bridge-walk.svg",
      },
      {
        label: "Meditation Pavilion",
        icon: "meditation-pavillion.svg",
      },
      {
        label: "Wellness Spa",
        icon: "wellness-spa.svg",
      },
      {
        label: "Library",
        icon: "library.svg",
      },
    ]),
  },
  {
    value: "4",
    trigger: "Social & Community Spaces",
    content: AccordianItemContent([
      {
        label: "Family Lawn with Tiered Seating",
        icon: "family-lawn.svg",
      },
      {
        label: "Pergola with Seating Area",
        icon: "pergola.svg",
      },
      {
        label: "Senior Citizens Park",
        icon: "senior-citizen-park.svg",
      },
      {
        label: "Indoor Party Hall",
        icon: "indoor-party-hall.svg",
      },
      {
        label: "Lounge",
        icon: "lounge.svg",
      },
    ]),
  },
  {
    value: "5",
    trigger: "Security & Convenience",
    content: AccordianItemContent([
      {
        label: "24/7 CCTV Surveillance",
        icon: "security-cam.svg",
      },
      {
        label: "Buggy Transport",
        icon: "buggy.svg",
      },
      {
        label: "Mini Mart",
        icon: "mini-mart.svg",
      },
      {
        label: "Salon",
        icon: "salon.svg",
      },
      {
        label: "Visitor’s Car Parking",
        icon: "car-parking.svg",
      },
      {
        label: "Grand Entry Arch with Waterfall",
        icon: "pond-with-bridge-walk.svg",
      },
    ]),
  },
];

const analyticsData = [
  { value: "37,428", label: "Parks & Open Spaces" },
  { value: "2,32,367", label: "Residential Development" },
  { value: "19,000", label: "Clubhouse & Amenities" },
];

export default function OxygenParkSection(): React.ReactElement {
  return (
    <section className="py-16 lg:py-24 container mx-auto ">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-16">
        <div className=" mx-4 lg:mx-0 relative">
          <Image
            src={"/images/VaikuntamCityLandingPage/luxuryGreenOxygenPark.jpg"}
            width={835}
            height={1094}
            alt="oxygen green park image"
            className="rounded-3xl shadow-lg object-cover w-[30rem] h-auto"
          />
          <p className="font-fsSplitSans text-white text-xl lg:text-2xl lg2:text-3xl absolute bottom-10 left-1/2 -translate-x-1/2 min-w-max">
            Lush Green Oxygen Park
          </p>
        </div>
        <div className="max-w-md mx-4 lg:mx-0 my-auto">
          <h1 className="font-fsSiena text-customBrown lg:leading-none text-2xl md:text-3xl lg:text-5xl lg2:text-6xl min-w-max">
            A New Home,
            <br /> A New Way of Life
          </h1>
          <Typography
            variant="custom"
            className="font-fsSplitSans text-customCongoBrown/60 md:text-xl  text-sm  max-w-6xl  mt-2 lg:mt-4"
          >
            Embrace the excitement of new possibilities, creating spaces that
            reflect your unique personality and dreams at Vaikuntam City
          </Typography>
          <div>
            <Accordion value={null}>
              {accordianData.map((item) => (
                <AccordionItem
                  key={item.value}
                  value={item.value}
                  trigger={item.trigger}
                >
                  {item.content}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
      <StatsComponent postfix=" Sqft" items={analyticsData} />
    </section>
  );
}
