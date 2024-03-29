import React from "react";

// components
import CarouselItem from "./CarouselItem";

// context or store

// constants and functions
import { sanityFetch } from "@/lib/sanity";
import { SANITY_GET_HERO } from "@/lib/sanity/queries";

export default async function Carousel() {
  /**

  Fetches hero data from Sanity API.
  @param {Object} options - The options for fetching hero data.
  @param {string} options.query - The query for fetching hero data.
  @param {string[]} options.tags - The tags for filtering hero data.
  @returns {Promise<HeroType[]>} - A promise that resolves to an array of hero objects. */
  const heroData = await sanityFetch<HeroType[]>({
    query: SANITY_GET_HERO,
    tags: [],
  });

  const carouselEnd = heroData?.length - 1;
  const carouselPrevImage = (index: number) => {
    if (index === 0) return carouselEnd;
    else return index - 1;
  };
  const carouselNextImage = (index: number) => {
    if (index >= carouselEnd) return 0;
    else return index + 1;
  };

  return (
    <div className="carousel w-full">
      {heroData.map((item, index) => (
        <CarouselItem
          key={item._id}
          items={item}
          prevImage={carouselPrevImage(index)}
          nextImage={carouselNextImage(index)}
          index={index}
        />
      ))}
    </div>
  );
}
