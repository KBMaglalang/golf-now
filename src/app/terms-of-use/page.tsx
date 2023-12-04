import React from "react";
import type { Metadata } from "next";

// components
import { BreadCrumb } from "@/components/Common";

// context or store

// constants and functions
import { META_TITLE, META_DESCRIPTION } from "@/constants";

export const metadata: Metadata = {
  title: `${META_TITLE} | Terms Of Use`,
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
          >{`Terms Of Use`}</h1>
        </div>

        {/* message */}
        <div className="space-y-4">
          <h2 className="text-md font-bold">{`Last updated: November 19, 1990`}</h2>
          <p>
            {`Welcome to GolfNow! These terms and conditions outline the rules and
            regulations for the use of GolfNow's Website, located at [Your
            Website URL]. By accessing this website, we assume you accept these
            terms and conditions. Do not continue to use GolfNow if you do not
            agree to take all of the terms and conditions stated on this page.`}
          </p>
          <h2 className="text-xl font-bold">{`Intellectual Property Rights`}</h2>
          <p>
            {`Other than the content you own, under these Terms, GolfNow and/or
            its licensors own all the intellectual property rights and materials
            contained in this Website. You are granted a limited license only
            for purposes of viewing the material contained on this Website.`}
          </p>
          <h2 className="text-xl font-bold">{`Restrictions`}</h2>
          <p>{`You are specifically restricted from all of the following:`}</p>
          <ul>
            <li>{`Publishing any Website material in any other media.`}</li>
            <li>
              {`Selling, sublicensing, and/or otherwise commercializing any
              Website material.`}
            </li>
            <li>{`Publicly performing and/or showing any Website material.`}</li>
            <li>
              {`Using this Website in any way that is or may be damaging to this
              Website.`}
            </li>
            <li>
              {`Using this Website in any way that impacts user access to this
              Website.`}
            </li>
            <li>
              {`Using this Website contrary to applicable laws and regulations, or
              in any way may cause harm to the Website, or to any person or
              business entity.`}
            </li>
            <li>
              {`Engaging in any data mining, data harvesting, data extracting, or
              any other similar activity in relation to this Website.`}
            </li>
          </ul>
          <h2 className="text-xl font-bold">{`Your Content`}</h2>
          <p>
            {`In these Website Standard Terms and Conditions, “Your Content” shall
            mean any audio, video text, images, or other material you choose to
            display on this Website. By displaying Your Content, you grant
            GolfNow a non-exclusive, worldwide, irrevocable, royalty-free,
            sublicensable license to use, reproduce, adapt, publish, translate,
            and distribute it in any and all media.`}
          </p>
          <p>
            {`Your Content must be your own and must not be invading any
            third-party’s rights. GolfNow reserves the right to remove any of
            Your Content from this Website at any time without notice.`}
          </p>
          <h2 className="text-xl font-bold">{`No warranties`}</h2>
          <p>
            {`This Website is provided "as is," with all faults, and GolfNow
            expresses no representations or warranties, of any kind related to
            this Website or the materials contained on this Website.`}
          </p>
          <h2 className="text-xl font-bold">{`Limitation of liability`}</h2>
          <p>
            {`In no event shall GolfNow, nor any of its officers, directors, and
            employees, be liable to you for anything arising out of or in any
            way connected with your use of this Website, whether such liability
            is under contract, tort, or otherwise, and GolfNow, including its
            officers, directors, and employees shall not be liable for any
            indirect, consequential, or special liability arising out of or in
            any way related to your use of this Website.`}
          </p>
          <h2 className="text-xl font-bold">{`Indemnification`}</h2>
          <p>
            {`You hereby indemnify to the fullest extent GolfNow from and against
            any and/or all liabilities, costs, demands, causes of action,
            damages, and expenses arising in any way related to your breach of
            any of the provisions of these Terms.`}
          </p>
          <h2 className="text-xl font-bold">{`Severability`}</h2>
          <p>
            {`If any provision of these Terms is found to be invalid under any
            applicable law, such provisions shall be deleted without affecting
            the remaining provisions herein.`}
          </p>
          <h2 className="text-xl font-bold">{`Variation of Terms`}</h2>
          <p>
            {`GolfNow is permitted to revise these Terms at any time as it sees
            fit, and by using this Website you are expected to review these
            Terms on a regular basis.`}
          </p>
          <h2 className="text-xl font-bold">{`Assignment`}</h2>
          <p>
            {`GolfNow is allowed to assign, transfer, and subcontract its rights
            and/or obligations under these Terms without any notification.
            However, you are not allowed to assign, transfer, or subcontract any
            of your rights and/or obligations under these Terms.`}
          </p>
          <h2 className="text-xl font-bold">{`Entire Agreement`}</h2>
          <p>
            {`These Terms constitute the entire agreement between GolfNow and you
            in relation to your use of this Website, and supersede all prior
            agreements and understandings.`}
          </p>
          <h2 className="text-xl font-bold">{`Governing Law & Jurisdiction`}</h2>
          <p>
            {`These Terms will be governed by and interpreted in accordance with
            the laws of the State/Country of [Your Location], and you submit to
            the non-exclusive jurisdiction of the state and federal courts
            located in [Your Location] for the resolution of any disputes.`}
          </p>
        </div>
      </div>
    </main>
  );
}
