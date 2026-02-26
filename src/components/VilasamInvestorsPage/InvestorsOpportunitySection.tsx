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
    <section className="bg-white px-6 pb-10 pt-7 lg:px-12 lg:py-20 xl:px-20 xl:py-24">
      <div className="mx-auto max-w-7xl 2xl:max-w-[90vw]">
        <div className="grid pb-5 lg:pb-0 grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-10 xl:gap-16">
          {/* Text content - Reordered mathematically for CSS flex/grid but keeping DOM order same for SEO/accessibility */}
          <div className="order-1 flex flex-col space-y-4 lg:order-1 lg:space-y-7">
            <h2 className="text-balance font-ttCommons lg:leading-[1.2] xl:leading-[1.2] font-semibold hidden text-[28px] text-[#2A2A2A] sm:text-[32px] lg:text-4xl xl:text-5xl lg:block">
              {heading}
            </h2>
            <h2 className="text-balance font-ttCommons leading-tight font-semibold text-[28px] text-[#2A2A2A] sm:text-[32px] lg:text-4xl xl:text-5xl lg:hidden">
              {headingMobile}
            </h2>
            <p className="lg:max-w-sm pb-2 lg:pb-8 font-ttCommons font-medium text-[15px] text-[#999999] lg:text-lg lg:leading-[1.4] xl:max-w-xl">
              {description}
            </p>
            <Link
              href={ctaHref}
              className="hidden h-12 w-fit items-center justify-center rounded-md bg-[#064747] px-8 font-ttCommons font-bold text-white transition hover:bg-[#084943] lg:inline-flex lg:h-12 lg:px-10 text-base"
            >
              {ctaLabel}
            </Link>
          </div>

          {/* Image */}
          <div className="order-2 relative h-[280px] w-full overflow-hidden rounded-xl sm:h-[340px] lg:order-2 lg:h-[360px] xl:h-[520px]">
            <Image src={imageSrc} alt={imageAlt} fill className="object-cover object-[center_65%]" />
          </div>

          {/* Mobile CTA */}
          <div className="order-3 mt-4 flex justify-center lg:hidden">
            <Link
              href={ctaHref}
              className="inline-flex py-3 lg:h-12 w-full items-center justify-center rounded-[4px] bg-[#064747] px-8 font-ttCommons text-[16px] font-bold tracking-wide text-white transition hover:bg-[#084943]"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 lg:mt-12 lg:grid-cols-2 xl:mt-16 2xl:gap-44 xl:grid-cols-4 xl:gap-28">
          {cards.map((card) => (
            <div
              key={`${card.title}-${card.subtitle || ""}`}
              className="flex flex-col justify-center rounded-[16px] bg-[#F9F9F9] px-4 py-6 text-center lg:min-h-[80px] lg:px-5"
            >
              <p className="lg:whitespace-pre-line font-ttCommons text-xl font-semibold leading-snug text-[#2A2A2A] lg:text-xl xl:text-xl">
                {card.title}
              </p>
              {card.subtitle ? (
                <p className="mt-2 font-ttCommons text-sm font-medium text-[#999999] lg:text-base">
                  {card.subtitle}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}