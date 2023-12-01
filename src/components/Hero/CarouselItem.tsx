import React from "react";
import Link from "next/link";
import Image from "next/image";

// components

// context or store

// constants and functions
import { urlForImage } from "@/lib/sanity";

type Props = {
  items: {
    image: string;
    title: string;
    link: string;
  };
  prevImage: number;
  nextImage: number;
  index: number;
};

export default function CarouselItem({
  items,
  prevImage,
  nextImage,
  index,
}: Props) {
  const imageURL = urlForImage(items?.image).url();

  if (!items?.image || !imageURL) return;

  return (
    <div id={`slide${index}`} className="carousel-item relative w-full">
      {/* images */}
      <Link href={items?.link} className="w-full">
        <Image
          priority
          src={imageURL || "https://dummyimage.com/1920x1080"}
          alt={items.title || "img"}
          width={1360}
          height={500}
          className="w-full"
          placeholder="blur"
          blurDataURL={"https://dummyimage.com/1920x1080"}
        />
      </Link>

      {/* control buttons */}
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href={`#slide${prevImage}`} className="btn btn-circle">
          ❮
        </a>
        <a href={`#slide${nextImage}`} className="btn btn-circle">
          ❯
        </a>
      </div>
    </div>
  );
}
