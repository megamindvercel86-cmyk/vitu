import Image from "next/image";
import Link from "next/link";

export interface InvestorsOpportunityCard {
  title: string;
  subtitle?: string;
}

export interface InvestorsOpportunitySectionProps {
  heading: string;
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
  cards,
}: InvestorsOpportunitySectionProps) {
  return (
    <section className="bg-white px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-24">
      <div className="mx-auto max-w-7xl xl:max-w-[90vw]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.4fr] md:items-center md:gap-10 lg:gap-16">
          <div className="space-y-5 md:space-y-6">
            <h2 className="text-balance font-ttCommons text-3xl font-bold leading-tight text-[#222] md:text-4xl lg:text-5xl">
              {heading}
            </h2>
            <p className="max-w-sm font-ttCommons text-base leading-relaxed text-[#888] md:text-lg lg:max-w-xl">
              {description}
            </p>
            <Link
              href={ctaHref}
              className="hidden h-12 items-center justify-center rounded-md bg-[#0a5a56] px-8 font-ttCommons text-sm font-semibold text-white transition hover:bg-[#084943] md:inline-flex md:h-14 md:px-10 md:text-base"
            >
              {ctaLabel}
            </Link>
          </div>

          <div className="relative h-[240px] w-full overflow-hidden rounded-2xl md:h-[360px] lg:h-[520px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-[center_65%]"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href={ctaHref}
            className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-md bg-[#0a5a56] px-8 font-ttCommons text-base font-semibold text-white transition hover:bg-[#084943]"
          >
            {ctaLabel}
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 lg:mt-16 xl:gap-44 lg:grid-cols-4 lg:gap-6">
          {cards.map((card) => (
            <div
              key={`${card.title}-${card.subtitle || ""}`}
              className="flex flex-col justify-center rounded-[10px] bg-[#fafafa] px-4 py-6 text-center md:min-h-[120px] md:px-5"
            >
              <p className="whitespace-pre-line font-ttCommons text-lg font-bold leading-snug text-[#333] md:text-xl lg:text-2xl">
                {card.title}
              </p>
              {card.subtitle ? (
                <p className="mt-2 font-ttCommons text-sm font-medium text-[#999] md:text-base">
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
