"use client"
import FormSection from "@/components/FormSection/FormSection";
import Layout from "@/components/Layout/Layout";

export default function ProjetEnquire() {
  return (
    <Layout>
      <FormSection
        heading={
          <>
           Your dream home is <br />
           closer than you think!
          </>
        }
        subheading={
          <>
            Begin your journey to a new home—fill out the <br />
            form & let’s get started.
          </>
        }
        page="Project Enquire"
      />
    </Layout>
  );
}
