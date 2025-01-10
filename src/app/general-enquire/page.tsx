"use client";

import FAQ from "@/components/FAQ/FAQ";
import FormSection from "@/components/FormSection/FormSection";
import Layout from "@/components/Layout/Layout";

export default function GeneralEnquire() {
  return (
    <Layout navbarProps={{ showGetInTouch: false }}>
      <FormSection
        heading={
          <>
            <span className="hidden xl:inline">
              Excited about the <br />
              possibilities your next <br />
              home could offer?
            </span>
            <span className="hidden lg:inline xl:hidden">
              Excited about the <br />
              possibilities your <br />
              next home could <br />
              offer?
            </span>
            <span className="inline lg:hidden">
              Excited about the <br />
              possibilities your next <br />
              home could offer?
            </span>
          </>
        }
        subheading={
          <>
            Take the first step towards the home of your <br />
            dreams. Fill in the form and begin your Journey.
          </>
        }
        page="General Enquire"
      />

      <FAQ />
    </Layout>
  );
}
