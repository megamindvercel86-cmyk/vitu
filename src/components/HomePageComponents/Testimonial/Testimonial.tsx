"use client";

import React from "react";
import Head from "next/head";
import Typography from "@/components/Typography/Typography";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import testimonialDataJson from "@/data/testimonials.json";

// Types definition for testimonial data
interface TestimonialData {
  id: number;
  name: string;
  comment: string;
  rating: number;
}

const testimonialData: TestimonialData[] = testimonialDataJson;

// Split the data into two halves for desktop
const midIndex = Math.ceil(testimonialData.length / 2);
const desktopDataLeft = testimonialData.slice(0, midIndex);
const desktopDataRight = testimonialData.slice(midIndex);

// Generate structured data for testimonials (JSON-LD)
const generateStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "LocalBusiness",
      "name": "Vitu Realty"
    },
    "review": testimonialData.map((testimonial) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": testimonial.name
      },
      "reviewBody": testimonial.comment,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": testimonial.rating,
        "bestRating": "5"
      }
    }))
  };
};

/**
 * Testimonial Component
 * Displays client testimonials in an infinite scrolling carousel.
 * Contains two sections:
 * 1. Header with title
 * 2. Scrolling testimonials in both directions
 */
export default function Testimonial(): React.ReactElement {
  return (
    <>
      {/* SEO Metadata */}
      <Head>
        <title>Client Testimonials | Vitu Realty Reviews</title>
        <meta
          name="description"
          content="See what our happy clients say about Vitu Realty. Read real reviews and testimonials from satisfied customers who found their dream home with us."
        />
        <meta
          name="keywords"
          content="client testimonials, real estate reviews, Vitu Realty feedback, property customer experiences"
        />
        <meta name="author" content="Vitu Realty" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData()) }}
        />
      </Head>

      <section className="xl:mt-[166px] lg:mt-[206px] mt-12">
        {/* Testimonial Header Section */}
        <header className="flex items-center justify-center flex-col lg:mb-[90px] mb-9">
          <h2 className="sr-only">Client Testimonials</h2>
          <Typography
            variant="custom"
            className="text-customBrown md:text-lg text-xs 2xl:text-[2.125rem] font-freightNeoMedium"
          >
            CLIENT TESTIMONIALS
          </Typography>
          <Typography
            variant="custom"
            className="text-customBrown text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[3.5rem] 2xl:text-[5rem] leading-[28px] md:leading-[72px] xl:leading-[67px] 2xl:leading-[90px] font-freightNeoMedium"
          >
            What Our Clients Say
          </Typography>
        </header>

        {/* Desktop Testimonial Carousel - Right Direction */}
        <div className="md:flex hidden rounded-md flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards items={desktopDataRight} direction="right" speed="slow" />
        </div>

        {/* Mobile Testimonial Carousel - Left Direction */}
        <div className="md:flex hidden rounded-md flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards items={desktopDataLeft} direction="left" speed="slow" />
        </div>
        <div className="rounded-md sm:hidden flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards items={testimonialData} direction="left" speed="slow" />
        </div>

        {/* Read More Section */}
        <div className="flex items-center justify-center flex-col mt-6 md:mt-[66px] mb-11 md:mb-[145px]">
          <Typography
            variant="custom"

            className="text-customBrown font-FreightNeoProBold text-[22px] hover:underline"
          >
            Read More 
          </Typography>
        </div>
      </section>
    </>
  );
}
