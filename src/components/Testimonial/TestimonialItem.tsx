import React from "react";

// components

// context or store

// constants and functions

type Props = {
  testimonial: {
    review: string;
    name: string;
    rating: number;
  };
};

export default function TestimonialItem({ testimonial }: Props) {
  return (
    <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
      <div className="h-full text-center">
        <div className="rating mb-4">
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            // checked
            defaultChecked
          />
        </div>

        <p className="leading-relaxed text-white">{testimonial.review}</p>
        <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
        <h2 className="text-white font-medium title-font tracking-wider text-sm">
          {testimonial.name}
        </h2>
      </div>
    </div>
  );
}
