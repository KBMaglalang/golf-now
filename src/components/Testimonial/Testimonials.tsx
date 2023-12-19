import React from "react";

// components
import TestimonialItem from "./TestimonialItem";

// context or store

// constants and functions

const TEMP_DATA = [
  {
    review:
      "As a beginner in golf, this website has been a game-changer for me. The tips and tutorials are straightforward and easy to follow. I've improved my swing significantly!",
    name: "Mike Thompson",
    rating: 5,
  },
  {
    review:
      "I've been golfing for years, but the in-depth course reviews and equipment suggestions on this site have introduced me to so many new aspects of the game. Love it!",
    name: "Sarah Jenkins",
    rating: 5,
  },
  {
    review:
      "The community section of this website is fantastic. It's great to connect with other golfers, share experiences, and get advice from more experienced players.",
    name: "Raj Patel",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="text-gray-600 body-font bg-brand-main">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {/* testimonials */}
          {TEMP_DATA.map((item, index) => (
            <TestimonialItem key={index} testimonial={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
