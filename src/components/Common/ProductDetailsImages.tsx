"use client";

import React, { useState } from "react";
import Image from "next/image";

// components

// context or store

// constants and functions

type Props = {
  imageUrls: string[];
};

export function ProductDetailsImages({ imageUrls }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* image carousel */}
      <div className="flex md:flex-col md:w-1/12 md:space-y-4 md:h-full md:overflow-y-auto overflow-x-auto space-x-4 md:space-x-0">
        {imageUrls?.length > 0 &&
          imageUrls?.map((image: string, index: number) => (
            <Image
              key={index}
              src={image || "https://dummyimage.com/120x120"}
              alt={"product"}
              className="object-fill object-center w-full h-auto block border-2 rounded-lg hover:cursor-pointer"
              width={120}
              height={120}
              placeholder="blur"
              blurDataURL={image}
              onClick={() => setSelectedImage(index)}
            />
          ))}
      </div>

      {/* main image */}
      <div className="flex flex-col md:w-11/12 w-full p-8 rounded-lg">
        {imageUrls?.length > 0 && (
          <Image
            src={imageUrls?.[selectedImage] || "https://dummyimage.com/420x260"}
            alt={"product"}
            className="object-cover object-center w-full h-full block rounded-lg"
            width={420}
            height={420}
            placeholder="blur"
            blurDataURL={imageUrls?.[selectedImage]}
          />
        )}
      </div>
    </div>
  );
}
