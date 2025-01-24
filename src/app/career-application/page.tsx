"use client";

import FormSection from "@/components/FormSection/FormSection";
import Layout from "@/components/Layout/Layout";

export default function CareerApplication() {
  return (
    <Layout navbarProps={{ showGetInTouch: false }}>
      <FormSection
        heading="The career you've been waiting for starts here! "
        subheading="Begin your journey to a rewarding career—fill 
                    out the form & let’s get started"
        page="Career Application"
      />
    </Layout>
  );
}
