import React from "react";

// components
import { BreadCrumb } from "@/components/Common";
import { Contact } from "@/components/Contact";

// context or store

// constants and functions

export default function page() {
  return (
    <main className="container mx-auto my-12 flex-1 p-5">
      {/* breadcrumb */}
      <BreadCrumb />

      {/* content */}
      <div className="space-y-4 my-12">
        <div>
          <h1 className="text-2xl font-bold">{`Contact Us`}</h1>
        </div>
        {/* message */}
        <div>
          <p>
            {`Here at GolfNow, we always want to hear from our valued customers.
            Since Golf Town Limited is committed to providing you a great
            shopping experience coupled with superior customer service, your
            questions, compliments, concerns and suggestions are always welcome!
            Your feedback allows us to know what we're doing right and what we
            could do to improve. we want to serve you better`}
          </p>
        </div>

        {/* contact form  */}
        <Contact />
      </div>
    </main>
  );
}
