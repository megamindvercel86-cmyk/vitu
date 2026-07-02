import React from "react";
import { BackArrow } from "../Icons/Icons";
import Typography from "../Typography/Typography";
import Link from "next/link";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="xl:pt-[9rem] xl:px-[13.125rem] lg:pt-[9.25rem] lg:px-[4.875rem] sm:pt-[3.938rem] sm:px-[1.688rem] pt-[3.938rem] px-[1.688rem]">
      <div className="flex lg:gap-[1.313rem] gap-2">
        <Link href="/" aria-label="Back to home">
          <div className="pt-1">
            <BackArrow />
          </div>
        </Link>
        <Typography
          variant="custom"
          className="text-customBrown font-semibold xl:text-[52px] font-freightNeoSemibold lg:text-5xl text-3xl"
        >
          Privacy Policy
        </Typography>
      </div>

      <div className="lg:pl-[2.938rem] lg:pt-[3.625rem] sm:pt-[1.25rem] lg:flex sm:flex-col lg:flex-row pt-5">
        <div>
          <p className="font-FreightNeoProBold font-bold text-customTextGray text-xl w-[9.813rem] pb-3 lg:pb-0">
            Overview
          </p>
        </div>
        <div className="lg:pl-[4.188rem] flex-1">
          <Typography variant="small" className="mb-4">
            Vitu Realty India Private Limited ("Vitu Realty", "we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, process, secure, use, and share your personal information when you visit our website, use our services, or interact with our promotional and lead capture forms.
          </Typography>
          <Typography variant="small" className="mb-4">
            By accessing our website and providing information, you consent to the terms of this Privacy Policy and agree to our processing of personal data in accordance with the Digital Personal Data Protection Act (DPDPA) 2023, the Information Technology Act 2000, and other applicable data protection regulations in India.
          </Typography>
        </div>
      </div>

      <div className="lg:pl-[2.938rem] lg:pt-[3.625rem] sm:pt-[1.25rem] lg:flex sm:flex-col lg:flex-row pt-5">
        <div>
          <p className="font-FreightNeoProBold font-bold text-customTextGray text-xl w-[9.813rem] pb-3 lg:pb-0">
            Information We Collect
          </p>
        </div>
        <div className="lg:pl-[4.188rem] flex-1">
          <Typography variant="small" className="mb-4">
            We collect personal data directly from you and automatically through your use of our website:
          </Typography>
          <ul className="ml-8 list-disc space-y-2 mb-4" style={{ listStyleType: "disc", color: "gray" }}>
            <li>
              <Typography variant="small">
                <strong>Directly Provided Information:</strong> When you fill out an enquiry form, apply for a career, request an e-brochure, register interest in a project, or sign up for our newsletter, we collect details such as your name, email address, phone number, location, and any specific preferences or messages you submit.
              </Typography>
            </li>
            <li>
              <Typography variant="small">
                <strong>Automatically Collected Information:</strong> We collect technical and behavioral information about your visit, including your IP address, device type, browser information, referral URL, page view history, interaction time, and UTM campaign parameters.
              </Typography>
            </li>
            <li>
              <Typography variant="small">
                <strong>Cookies and Tracking:</strong> We use cookies, tracking pixels, and scripts (such as Facebook Pixel, Google Tag Manager, Zoho PageSense, and Accelr embed tracking) to analyze site performance, target relevant marketing campaigns, and optimize lead attribution.
              </Typography>
            </li>
          </ul>
        </div>
      </div>

      <div className="lg:pl-[2.938rem] lg:pt-[3.625rem] sm:pt-[1.25rem] lg:flex sm:flex-col lg:flex-row pt-5">
        <div>
          <p className="font-FreightNeoProBold font-bold text-customTextGray text-xl w-[9.813rem] pb-3 lg:pb-0">
            How We Use Your Data
          </p>
        </div>
        <div className="lg:pl-[4.188rem] flex-1">
          <Typography variant="small" className="mb-4">
            We use the personal information we collect for various business and customer relation purposes:
          </Typography>
          <ul className="ml-8 list-disc space-y-2 mb-4" style={{ listStyleType: "disc", color: "gray" }}>
            <li>
              <Typography variant="small">
                To respond to your project enquiries, schedule site visits, or send project e-brochures.
              </Typography>
            </li>
            <li>
              <Typography variant="small">
                To securely manage your lead details in our Customer Relationship Management (CRM) system, Zoho CRM.
              </Typography>
            </li>
            <li>
              <Typography variant="small">
                To send newsletters and promotional communications if you have signed up or consented to receive them.
              </Typography>
            </li>
            <li>
              <Typography variant="small">
                To evaluate job applications submitted via our career application forms.
              </Typography>
            </li>
            <li>
              <Typography variant="small">
                To run digital advertisement campaigns and measure marketing performance through platform tracking.
              </Typography>
            </li>
            <li>
              <Typography variant="small">
                To monitor, optimize, and maintain the performance and security of our digital platforms.
              </Typography>
            </li>
          </ul>
        </div>
      </div>

      <div className="lg:pl-[2.938rem] lg:pt-[3.625rem] sm:pt-[1.25rem] lg:flex sm:flex-col lg:flex-row pt-5">
        <div>
          <p className="font-FreightNeoProBold font-bold text-customTextGray text-xl w-[9.813rem] pb-3 lg:pb-0">
            Data Sharing & Security
          </p>
        </div>
        <div className="lg:pl-[4.188rem] flex-1">
          <Typography variant="small" className="mb-4">
            We value your trust and implement appropriate technical and administrative safeguards to keep your personal data secure.
          </Typography>
          <ul className="ml-8 list-disc space-y-2 mb-4" style={{ listStyleType: "disc", color: "gray" }}>
            <li>
              <Typography variant="small">
                <strong>No Data Selling:</strong> We do not sell, trade, rent, or distribute your personal details to third parties for independent marketing purposes.
              </Typography>
            </li>
            <li>
              <Typography variant="small">
                <strong>Trusted Partners:</strong> We share data only with trusted vendors and technology partners who assist us in operating our website, marketing, and business systems (such as Zoho CRM, cloud hosting partners, and marketing analytical services) under strict security agreements.
              </Typography>
            </li>
            <li>
              <Typography variant="small">
                <strong>Legal Disclosures:</strong> We may disclose data if required by law, subpoena, or government directive to protect the safety of users, the public, or our legal rights.
              </Typography>
            </li>
          </ul>
        </div>
      </div>

      <div className="lg:pl-[2.938rem] lg:pt-[3.625rem] sm:pt-[1.25rem] lg:flex sm:flex-col lg:flex-row pt-5">
        <div>
          <p className="font-FreightNeoProBold font-bold text-customTextGray text-xl w-[9.813rem] pb-3 lg:pb-0">
            Your Rights & Choices
          </p>
        </div>
        <div className="lg:pl-[4.188rem] flex-1">
          <Typography variant="small" className="mb-4">
            Under applicable regulations, you have control over how your data is handled:
          </Typography>
          <ul className="ml-8 list-disc space-y-2 mb-4" style={{ listStyleType: "disc", color: "gray" }}>
            <li>
              <Typography variant="small">
                <strong>Access and Rectification:</strong> You may request access to, or correct, any inaccuracies in the personal information we hold about you.
              </Typography>
            </li>
            <li>
              <Typography variant="small">
                <strong>Consent Withdrawal:</strong> You have the right to withdraw your consent to email marketing or newsletters by using the unsubscribe link or contacting us directly.
              </Typography>
            </li>
            <li>
              <Typography variant="small">
                <strong>Data Erasure:</strong> You can request that we delete or erase your personal information from our active files, subject to any legal and compliance retention obligations.
              </Typography>
            </li>
          </ul>
        </div>
      </div>

      <div className="lg:pl-[2.938rem] lg:pt-[3.625rem] sm:pt-[1.25rem] lg:flex sm:flex-col lg:flex-row pt-5">
        <div>
          <p className="font-FreightNeoProBold font-bold text-customTextGray text-xl w-[9.813rem] pb-3 lg:pb-0">
            Updates to Policy
          </p>
        </div>
        <div className="lg:pl-[4.188rem] flex-1">
          <Typography variant="small" className="mb-4">
            We reserve the right to modify this Privacy Policy at any time. When we make updates, the revised version will be published on this page with the updated "Effective Date" at the top of the policy page.
          </Typography>
        </div>
      </div>

      <div className="lg:pl-[2.938rem] lg:pt-[3.625rem] sm:pt-[1.25rem] lg:flex sm:flex-col lg:flex-row pt-5 pb-[130px]">
        <div>
          <p className="font-FreightNeoProBold font-bold text-customTextGray text-xl w-[9.813rem] pb-3 lg:pb-0">
            Contact Us
          </p>
        </div>
        <div className="lg:pl-[4.188rem] flex-1">
          <Typography variant="small">
            If you have any questions, concerns, or requests regarding this Privacy Policy or how your personal information is processed, you can reach out to us at:
          </Typography>
          <Typography variant="small" className="mt-2 font-bold">
            Vitu Realty India Private Limited
          </Typography>
          <Typography variant="small" className="text-gray-500 text-[16px]">
            No 10-10-427/4, Laxman Commercial Complex, <br />
            Golikatta Bazar, Bunder, <br />
            Mangalore, Karnataka - 575001
          </Typography>
          <Typography variant="small" className="mt-1 text-[16px]">
            Email: <a href="mailto:info@viturealty.com" className="text-customBrown hover:underline">info@viturealty.com</a>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
