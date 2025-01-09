"use client";

import FAQ from "@/components/FAQ/FAQ";
import FormSection from "@/components/FormSection/FormSection";
import Layout from "@/components/Layout/Layout";

export default function GeneralEnquire() {
  return (
    <Layout>
      <FormSection
        heading={
          <>
            Excited about the <br />
            possibilities your <br /> next home could <br /> offer?
          </>
        }
        subheading={
          <>
            Take the first step towards the home of your <br />
            dreams. Fill in the form and begin your Journey
          </>
        }
        page="General Enquire"
      />
      <FAQ/>
    </Layout>
  );
}
