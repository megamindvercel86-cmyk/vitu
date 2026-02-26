import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export interface InvestorsOpportunityCard {
  title: string;
  subtitle?: string;
}

export interface InvestorsOpportunitySectionProps {
  heading: ReactNode;
  headingMobile: ReactNode;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
  cards: InvestorsOpportunityCard[];
}

export default function InvestorsOpportunitySection({
  heading,
  description,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
  headingMobile,
  cards,
}: InvestorsOpportunitySectionProps) {
  return (
    <section className="bg-white px-5 pb-10 pt-7 md:px-12 md:py-20 lg:px-20 lg:py-24">
      <div className="mx-auto max-w-7xl xl:max-w-[90vw]">
        <div className="grid pb-5 md:pb-0 grid-cols-1 gap-6 md:grid-cols-[1fr_1.4fr] md:items-center md:gap-10 lg:gap-16">
          {/* Text content - Reordered mathematically for CSS flex/grid but keeping DOM order same for SEO/accessibility */}
          <div className="order-1 flex flex-col space-y-4 md:order-1 md:space-y-7">
            <h2 className="text-balance font-ttCommons  md:leading-[1.2] lg:leading-[1.2] font-semibold hidden text-[28px] text-[#2A2A2A] sm:text-[32px] md:text-4xl lg:text-5xl md:block">
              {heading}
            </h2>
            <h2 className="text-balance font-ttCommons leading-tight  font-semibold text-[28px] text-[#2A2A2A] sm:text-[32px] md:text-4xl lg:text-5xl  md:hidden">
              {headingMobile}
            </h2>
            <p className="max-w-sm pb-2 md:pb-8 font-ttCommons font-medium text-[15px]  text-[#999999] md:text-lg md:leading-[1.4] lg:max-w-xl">
              {description}
            </p>
            <Link
              href={ctaHref}
              className="hidden h-12 w-fit items-center justify-center rounded-md bg-[#064747] px-8 font-ttCommons  font-bold text-white transition hover:bg-[#084943] md:inline-flex md:h-12 md:px-10 text-base"
            >
              {ctaLabel}
            </Link>
          </div>

          {/* Image */}
          <div className="order-2 relative h-[280px] w-full overflow-hidden rounded-xl sm:h-[340px] md:order-2 md:h-[360px] lg:h-[520px]">
            <Image src={imageSrc} alt={imageAlt} fill className="object-cover object-[center_65%]" />
          </div>

          {/* Mobile CTA */}
          <div className="order-3 mt-4 flex justify-center md:hidden">
            <Link
              href={ctaHref}
              className="inline-flex py-3 md:h-12 w-full items-center justify-center rounded-[4px] bg-[#064747] px-8 font-ttCommons text-[16px] font-bold tracking-wide text-white transition hover:bg-[#084943]"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 lg:mt-16 xl:gap-44 lg:grid-cols-4 lg:gap-28">
          {cards.map((card) => (
            <div
              key={`${card.title}-${card.subtitle || ""}`}
              className="flex flex-col justify-center rounded-[16px] bg-[#F9F9F9] px-4 py-6 text-center md:min-h-[80px] md:px-5"
            >
              <p className="md:whitespace-pre-line font-ttCommons text-xl font-semibold leading-snug text-[#2A2A2A] md:text-xl lg:text-xl">
                {card.title}
              </p>
              {card.subtitle ? <p className="mt-2 font-ttCommons text-sm font-medium text-[#999999] md:text-base">{card.subtitle}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
