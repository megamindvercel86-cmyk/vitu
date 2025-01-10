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
            Excited about the 
            possibilities your  next home could offer?
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
