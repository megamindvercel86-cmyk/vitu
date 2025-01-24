"use client";

import FAQ from "@/components/FAQ/FAQ";
import FormSection from "@/components/FormSection/FormSection";
import Layout from "@/components/Layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function GeneralEnquire() {
  return (
    <Layout navbarProps={{ showGetInTouch: false }}>
        <ToastContainer position="top-right" autoClose={5000} />
      <FormSection
        heading="Excited about the possibilities your next home could offer?"
        subheading="
            Take the first step towards the home of your
            dreams. Fill in the form and begin your Journey."
        page="General Enquire"
      />
      <FAQ />
    </Layout>
  );
}
