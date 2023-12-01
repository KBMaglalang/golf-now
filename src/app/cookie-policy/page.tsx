import React from "react";

// components
import { BreadCrumb } from "@/components/Common";

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
          <h1 className="text-2xl font-bold">{`Cookie Policy`}</h1>
        </div>

        {/* message */}
        <div className="space-y-4 ">
          <h2 className="text-md font-bold">{`Last updated: November 19, 1990`}</h2>
          <p>
            {`This Cookie Policy explains how GolfNow ("we", "us", and "ours") use
            cookies and similar technologies to recognize you when you visit our
            website at GolfNow.com. It explains what these technologies are and
            why we use them, as well as your rights to control our use of them.`}
          </p>

          <h2 className="text-xl font-bold">{`What are cookies?`}</h2>
          <p>
            {`Cookies are small data files that are placed on your computer or
            mobile device when you visit a website. Cookies are widely used by
            website owners to make their websites work, as well as to provide
            reporting information. Cookies set by the website owner (in this
            case, GolfNow) are called "first-party cookies". Cookies set by
            parties other than the website owner are called "third-party
            cookies". Third-party cookies enable third-party features or
            functionality to be provided on or through the website (e.g.,
            advertising, interactive content, and analytics). The parties that
            set these third-party cookies can recognize your computer both when
            it visits the website in question and also when it visits certain
            other websites.`}
          </p>

          <h2 className="text-xl font-bold">{`Why do we use cookies?`}</h2>
          <p>
            {`We use first-party and third-party cookies for several reasons. Some
            cookies are required for technical reasons in order for our Websites
            to operate, and we refer to these as "essential" or "strictly
            necessary" cookies. Other cookies also enable us to track and target
            the interests of our users to enhance the experience on our Online
            Properties. Third parties serve cookies through our Websites for
            advertising, analytics, and other purposes. This is described in
            more detail below.`}
          </p>

          <h2 className="text-xl font-bold">{`Types of cookies used:`}</h2>
          <p>
            {`Essential website cookies: These cookies are strictly necessary to
            provide you with services available through our Websites and to use
            some of its features, such as access to secure areas. Performance
            and functionality cookies: These cookies are used to enhance the
            performance and functionality of our Websites but are non-essential
            to their use. However, without these cookies, certain functionality
            may become unavailable. Analytics and customization cookies: These
            cookies collect information that is used either in aggregate form to
            help us understand how our Websites are being used or how effective
            our marketing campaigns are, or to help us customize our Websites
            for you. Advertising cookies: These cookies are used to make
            advertising messages more relevant to you. They perform functions
            like preventing the same ad from continuously reappearing, ensuring
            that ads are properly displayed for advertisers, and in some cases
            selecting advertisements that are based on your interests. Social
            networking cookies: These cookies are used to enable you to share
            pages and content that you find interesting on our Websites through
            third-party social networking and other websites. These cookies may
            also be used for advertising purposes too.`}
          </p>

          <h2 className="text-xl font-bold">{`How can I control cookies?`}</h2>
          <p>
            {`You have the right to decide whether to accept or reject cookies.
            You can exercise your cookie rights by setting your preferences in
            the Cookie Consent Manager. The Cookie Consent Manager allows you to
            select which categories of cookies you accept or reject. Essential
            cookies cannot be rejected as they are strictly necessary to provide
            you with services.`}
          </p>
          <p>
            {`The specific steps to do this depend on the browser you use. For
            more information about how to control cookie settings through your
            browser:`}
          </p>

          <ul>
            <li>{`Chrome`}</li>
            <li>{`Firefox`}</li>
            <li>{`Internet Explorer`} </li>
            <li>{`Safari`}</li>
            <li>{`Edge`}</li>
          </ul>

          <h2 className="text-xl font-bold">{`Changes to this Cookie Policy`}</h2>
          <p>
            {`We may update this Cookie Policy from time to time in order to
            reflect, for example, changes to the cookies we use or for other
            operational, legal, or regulatory reasons. Please therefore re-visit
            this Cookie Policy regularly to stay informed about our use of
            cookies and related technologies.`}
          </p>

          <h2 className="text-xl font-bold">{`Contact us`}</h2>
          <p>
            {`If you have any questions about our use of cookies or other
            technologies.`}
          </p>
        </div>
      </div>
    </main>
  );
}
