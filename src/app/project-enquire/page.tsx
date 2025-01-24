"use client"
import FormSection from "@/components/FormSection/FormSection";
import Layout from "@/components/Layout/Layout";

export default function ProjetEnquire() {
  return (
    <Layout navbarProps={{ showGetInTouch: false }}>
      <FormSection
        heading={
          <>
           Your dream home is 
           closer than you think!
          </>
        }
        subheading={
          <>
            Begin your journey to a new home—fill out the 
            form & let’s get started.
          </>
        }
        page="Project Enquire"
      />
    </Layout>
  );
}
