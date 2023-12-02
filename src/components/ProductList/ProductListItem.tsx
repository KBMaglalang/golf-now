import React from "react";
import Image from "next/image";
import Link from "next/link";

// components

// context or store

// constants and functions
import { urlForImage } from "@/lib/sanity";

type Props = {
  item: ProductType;
};

export default function ProductListItem({ item }: Props) {
  /* The line `const imageURL = urlForImage(item.image[0]).url();` is assigning the URL of the first
  image in the `item.image` array to the `imageURL` variable. */
  const imageURL = urlForImage(item.image[0]).url();

  return (
    <Link
      href={`/${item._type}/${item.slug.current}`}
      className="lg:w-1/4 md:w-1/2 p-4 w-full hover:bg-base-200 rounded-lg"
    >
      <div className="block relative h-48 rounded-lg overflow-hidden bg-white ">
        <Image
          alt={item.name || "product"}
          className="object-contain object-center w-full h-full block"
          src={imageURL || "https://dummyimage.com/420x260"}
          width={420}
          height={260}
          placeholder="blur"
          blurDataURL={imageURL}
        />
      </div>

      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          {item.brand.title || "Brand"}
        </h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">
          {item.name || "Item"}
        </h2>
        <p className="mt-1">{`$${item.price.toFixed(2)}` || "$"}</p>
      </div>
    </Link>
  );
}
