import React from "react";
import type { Metadata } from "next";

// components
import { BreadCrumb } from "@/components/Common";

// context or store

// constants and functions
import { META_TITLE, META_DESCRIPTION } from "@/constants";

export const metadata: Metadata = {
  title: `${META_TITLE} | About Us`,
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
          <h1 className="text-2xl font-bold">{`About Us`}</h1>
        </div>

        <div className="">
          <h2 className="text-xl font-bold">{`Our Story...`}</h2>
          <p>
            {`Since our founding in 1999, Golf Town Limited has grown to become
            Canada's golf superstore. With stores all across Canada, we have
            everything you need to play your very best. Golf Town Limited stores
            are sanctuaries where golf devotees come to try, buy, learn about
            and improve their game. With big box stores averaging 18,000 square
            feet, we carry an unprecedented selection of all the top brand names
            in golf, at the best prices. Whatever you are looking for - from
            clubs, bags and balls, to footwear, apparel, accessories and gifts -
            we're a veritable golfer's paradise As leaders, innovators and
            lovers of the game, we pride ourselves on being your source for all
            the latest products, information, technology, golf instruction and
            expertise to give you the best golf experience both in-store and on
            the course.`}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold">{`Expect Expert Service`}</h2>
          <p>
            {`Golf Town Limited associates are specialists in their field. They
            are professionally trained, knowledgeable and passionate about the
            game of golf. As experts, they're dedicated to outfitting every
            level of player from beginner to the avid low handicapper. Above
            all, they are here to cater to your needs and provide you with an
            exceptional shopping experience`}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold">{`Pressure Free Environment`}</h2>
          <p>
            {`At Golf Town Limited, we are committed to providing you with an
            informed, pleasurable and pressure free shopping experience. Whether
            researching the latest equipment, purchasing a new set of clubs or
            simply asking a question - our staff are here for you. So much so,
            that all staff work on a commission-free basis, meaning they are
            truly motivated by their love of the game and delivering superior
            customer service.`}
          </p>
        </div>
      </div>
    </main>
  );
}
