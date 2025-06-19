import React from "react";
import { BackArrow } from "../Icons/Icons";
import Typography from "../Typography/Typography";
import Link from "next/link";

const TermsAndService: React.FC = () => {
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
          className="text-customBrown font-semibold xl:text-[52px] font-freightNeoSemibold lg:text-5xl text-3xl "
        >
          Terms of Service
        </Typography>
      </div>
      <div className="lg:pl-[2.938rem] lg:pt-[3.625rem]  sm:pt-[1.25rem] lg:flex sm:flex-col lg:flex-row pt-5">
        <div>
          <p className="font-FreightNeoProBold font-bold text-customTextGray text-xl w-[9.813rem] pb-3 lg:pb-0">
            Terms of Use
          </p>
        </div>
        <div className="lg:pl-[4.188rem]">
          <Typography variant="small">
            By visiting our website and accessing the information, resources,
            services, products, and tools we provide for you, either directly or
            indirectly (hereafter referred to as ‘Resources’), you agree to use
            these Resources only for the purposes intended as permitted by:
          </Typography>
          <Typography variant="small">
            The terms of this User Agreement
          </Typography>
          <Typography variant="small">
            Applicable laws, regulations and generally accepted online practices
            or guidelines in India.
          </Typography>
          <Typography variant="small">WHEREIN, YOU UNDERSTAND THAT:</Typography>
          <ul
            className="ml-8 list-disc"
            style={{ listStyleType: "disc", color: "gray" }}
          >
            <li>
              <Typography variant="small">
                In order to access our Resources, you may be required to provide
                certain information about yourself (such as identification,
                contact details, etc.) as part of the registration process, or
                as part of your ability to use the Resources. You agree that any
                information you provide will always be accurate, correct, and
                up-to-date.
              </Typography>
            </li>
            <li>
              <Typography variant="small">
                You are responsible for maintaining the confidentiality of any
                login information associated with any account you use to access
                our Resources. Accordingly, you are responsible for all
                activities that occur under your account/s.
              </Typography>
            </li>
            <li>
              <Typography variant="small">
                Accessing (or attempting to access) any of our Resources by any
                means other than through the means we provide, is strictly
                prohibited. You specifically agree not to access (or attempt to
                access) any of our Resources through any automated, unethical or
                unconventional means. Engaging in any activity that disrupts or
                interferes with our Resources, including the servers and/or
                networks to which our Resources are located or connected, is
                strictly prohibited.
              </Typography>
            </li>
            <li>
              <Typography variant="small">
                Attempting to copy, duplicate, reproduce, sell, trade, rent or
                resell our Resources is strictly prohibited.
              </Typography>
            </li>
            <li>
              <Typography variant="small">
                You are solely responsible for any consequences, losses, or
                damages that we may directly or indirectly incur or suffer due
                to any unauthorized activities conducted by you, as explained
                above, and may incur criminal or civil liability.
              </Typography>
            </li>
            <li>
              <Typography variant="small">
                You agree to indemnify and hold harmless Vitu Realty and its
                parent company and affiliates, and their directors, officers,
                managers, employees, donors, agents, and licensors, from and
                against all losses, expenses, damages and costs, including
                reasonable attorneys’ fees, resulting from any violation of this
                User Agreement or the failure to fulfill any obligations
                relating to your account incurred by you or any other person
                using your account. We reserve the right to take over the
                exclusive defense of any claim for which we are entitled to
                indemnification under this User Agreement. In such event, you
                shall provide us with such cooperation as is reasonably
                requested by us.
              </Typography>
            </li>
          </ul>
        </div>
      </div>
      <div className="lg:pl-[47px] lg:pt-[58px] lg:flex sm:flex-col lg:flex-row pt-[44px] sm:gap-[12px] lg:gap-0">
        <div>
          <p className="font-FreightNeoProBold font-bold text-customTextGray text-xl w-[157px] pb-3 lg:pb-0">
            Trademark Notice
          </p>
        </div>
        <div className="lg:pl-[67px]">
          <Typography variant="small">
            All of the trademarks, service marks and logos displayed on this
            website (the “Trademark(s)”) are registered and unregistered
            trademarks of Vitu Realty. Except as expressly stated in these terms
            and conditions, you may not reproduce, display or otherwise use any
            Trademark without first obtaining a written permission from
            Vitu Realty. You agree not to affect / interrupt or attempt to
            affect / interrupt the operation of this website in any way.
          </Typography>
        </div>
      </div>
      <div className="lg:pl-[47px] lg:pt-[58px] lg:flex sm:flex-col lg:flex-row pt-[44px]">
        <div>
          <p className="font-FreightNeoProBold font-bold text-customTextGray text-xl w-[157px] pb-3 lg:pb-0">
            Unsolicited Ideas
          </p>
        </div>
        <div className="lg:pl-[67px]">
          <Typography variant="small">
            Vitu Realty welcomes your comments and feedback regarding this
            website. All information and materials, including comments, ideas,
            questions, designs, and the like, submitted to Vitu Realty through
            this website will be considered{" "}
            <span className="font-bold">NON-CONFIDENTIAL</span> and
            <span className="font-bold"> NON-PROPRIETARY. </span>For this
            reason, we ask you not to send us any information or materials that
            you do not wish to assign to us, including any confidential
            information.
          </Typography>
        </div>
      </div>

      <div className="lg:pl-[47px] lg:pt-[58px] lg:flex sm:flex-col lg:flex-row pt-[44px]">
        <div>
          <p className="font-FreightNeoProBold font-bold text-customTextGray text-xl lg:w-[157px] w-full pb-3 lg:pb-0">
            Limitations of Liability
          </p>
        </div>
        <div className="lg:pl-[67px]">
          <Typography variant="small">
            Your use of this website is at your sole risk. Under no
            circumstances shall Vitu Realty be liable for any direct or indirect
            losses or damages arising out of or in connection with your use of
            or inability to use this website or your reliance on any information
            provided on this website. This is a comprehensive limitation of
            liability that applies to all losses and damages of any kind
            whatsoever, whether direct or indirect, general, special,
            incidental, consequential, exemplary, or otherwise, including,
            without limitation, loss of data, revenue, or profits.
          </Typography>
        </div>
      </div>
      <div className="lg:pl-[47px] lg:pt-[58px] lg:flex sm:flex-col lg:flex-row pt-[44px]">
        <div>
          <p className="font-FreightNeoProBold font-bold text-customTextGray text-xl w-[157px] pb-3 lg:pb-0">
            Privacy
          </p>
        </div>
        <div className="lg:pl-[67px]">
          <Typography variant="small">
            Your privacy is very important to us, which is why we’ve created a
            separate Privacy Policy in order to explain in detail how we
            collect, manage, process, secure, and store your private
            information. Our Privacy Policy is included under the scope of this
            User Agreement.
          </Typography>
        </div>
      </div>
      <div className="lg:pl-[47px] lg:pt-[58px] lg:flex sm:flex-col lg:flex-row pt-[44px] pb-[130px]">
        <div>
          <p className="font-FreightNeoProBold font-bold text-customTextGray text-xl w-[157px] pb-3 lg:pb-0">
            Entire Agreement
          </p>
        </div>
        <div className="lg:pl-[67px]">
          <Typography variant="small">
            This Agreement constitutes the entire agreement between you and
            Vitu Realty with respect to your access to and/or use of this
            website.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default TermsAndService;
