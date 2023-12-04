import React from "react";
import type { Metadata } from "next";

// components
import { BreadCrumb } from "@/components/Common";

// context or store

// constants and functions
import { META_TITLE, META_DESCRIPTION } from "@/constants";

export const metadata: Metadata = {
  title: `${META_TITLE} | Privacy Policy`,
  description: META_DESCRIPTION,
  icons: {
    icon: "./favicon.png",
  },
};

export default function page() {
  return (
    <main className="container mx-auto my-12 flex-1 p-5">
      {/* breadcrumb */}
      <BreadCrumb />

      {/* content */}
      <div className="space-y-4 my-12">
        <div>
          <h1
            data-test="category-header"
            className="text-2xl font-bold"
          >{`Privacy Policy`}</h1>
        </div>

        {/* message */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">{`Last updated: November 19, 1990`}</h2>
          <p>
            {`This Privacy Policy describes how GolfNow ("we", "us", or "our")
            collects, uses, and shares your personal information when you use
            our website GolfNow.com.`}
          </p>
          <h2 className="text-xl font-bold">{`Information We Collect`}</h2>
          <p>
            {`We collect information from you when you register on our site, place
            an order, subscribe to a newsletter, respond to a survey, fill out a
            form, or enter information on our site. The types of information we
            may collect include:`}
          </p>
          <ul>
            <li>
              {`Your name, email address, mailing address, phone number, and other
              contact information.`}
            </li>
            <li>
              {`Transactional information based on your activities on the site.`}
            </li>
            <li>{`Billing and payment information.`}</li>
            <li>
              {`Other information relevant to customer surveys and/or offers.`}
            </li>
          </ul>

          <h2 className="text-xl font-bold">{`How We Use Your Information`}</h2>
          <p>
            {`The information we collect from you may be used in one of the
            following ways:`}
          </p>
          <ul>
            <li>
              {`To personalize your experience (your information helps us to
              better respond to your individual needs).`}
            </li>
            <li>
              {`To improve our website (we continually strive to improve our
              website offerings based on the information and feedback we receive
              from you).`}
            </li>
            <li>
              {`To improve customer service (your information helps us to more
              effectively respond to your customer service requests and support
              needs).`}
            </li>
            <li>{`To process transactions and manage your account.`}</li>
            <li>
              {`To send periodic emails regarding your order or other products and
              services.`}
            </li>
          </ul>

          <h2 className="text-xl font-bold">{`How We Protect Your Information`}</h2>
          <p>
            {`We implement a variety of security measures to maintain the safety
            of your personal information when you place an order or enter,
            submit, or access your personal information.`}
          </p>
          <h2 className="text-xl font-bold">
            {`Disclosure of Information to Third Parties`}
          </h2>
          <p>
            {`We do not sell, trade, or otherwise transfer to outside parties your
            personally identifiable information. This does not include trusted
            third parties who assist us in operating our website, conducting our
            business, or servicing you, so long as those parties agree to keep
            this information confidential. We may also release your information
            when we believe release is appropriate to comply with the law,
            enforce our site policies, or protect ours or others' rights,
            property, or safety.`}
          </p>
          <h2 className="text-xl font-bold">{`Third-party Links`}</h2>
          <p>
            {`Occasionally, at our discretion, we may include or offer third-party
            products or services on our website. These third-party sites have
            separate and independent privacy policies. We, therefore, have no
            responsibility or liability for the content and activities of these
            linked sites.`}
          </p>
          <h2 className="text-xl font-bold">{`Your Consent`}</h2>
          <p>{`By using our site, you consent to our website's privacy policy.`}</p>
          <h2 className="text-xl font-bold">{`Changes to our Privacy Policy`}</h2>
          <p>
            {`If we decide to change our privacy policy, we will post those
            changes on this page.`}
          </p>
        </div>
      </div>
    </main>
  );
}
