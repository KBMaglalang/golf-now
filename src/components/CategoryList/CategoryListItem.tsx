import React from "react";
import Image from "next/image";
import Link from "next/link";

// components

// context or store

// constants and functions
import { urlForImage } from "@/lib/sanity";

type Props = {
  category: CategoryType;
};

export default function CategoryListItem({ category }: Props) {
  const imageURL = urlForImage(category.logo).url();

  return (
    <Link
      href={`/${category.slug.current}`}
      className="lg:w-1/4 md:w-1/2 p-4 w-full hover:bg-base-200 rounded-lg"
    >
      <div className="block relative h-48 rounded-lg overflow-hidden bg-white">
        <Image
          src={imageURL || "https://dummyimage.com/420x260"}
          alt={category.title || "ecommerce"}
          className="object-contain object-center w-full h-full block rounded-lg"
          width={420}
          height={260}
          placeholder="blur"
          blurDataURL={imageURL}
        />
      </div>

      <div className="mt-4">
        <h2 className="text-gray-900 title-font text-lg font-medium">
          {category.title || "Category"}
        </h2>
      </div>
    </Link>
  );
}
