import React from "react";
import Link from "next/link";

// components

// context or store

// constants and functions

export default function CategoryBar() {
  return (
    <div className="navbar bg-base-100 hidden md:block">
      <div
        role="tablist"
        className="tabs tabs-lifted tabs-lg flex flex-wrap justify-between w-full"
      >
        <Link
          data-test="category-new"
          href={"/new"}
          role="tab"
          className="tab hover:tab-active w-full md:w-auto"
        >
          New!
        </Link>
        <Link
          data-test="category-deals"
          href={"/deals"}
          role="tab"
          className="tab hover:tab-active w-full md:w-auto"
        >
          Deals
        </Link>
        <Link
          data-test="category-clubs"
          href={"/clubs"}
          role="tab"
          className="tab hover:tab-active w-full md:w-auto"
        >
          Clubs
        </Link>
        <Link
          data-test="category-balls"
          href={"/balls"}
          role="tab"
          className="tab hover:tab-active w-full md:w-auto"
        >
          Golf Balls
        </Link>
        <Link
          data-test="category-shoes"
          href={"/shoes"}
          role="tab"
          className="tab hover:tab-active w-full md:w-auto"
        >
          Shoes
        </Link>
        <Link
          data-test="category-clothing"
          href={"/clothing"}
          role="tab"
          className="tab hover:tab-active w-full md:w-auto"
        >
          Clothing
        </Link>
        <Link
          data-test="category-bag-carts"
          href={"/bag-carts"}
          role="tab"
          className="tab hover:tab-active w-full md:w-auto"
        >
          Bags & Carts
        </Link>
        <Link
          data-test="category-golf-tech"
          href={"/golf-tech"}
          role="tab"
          className="tab hover:tab-active w-full md:w-auto"
        >
          Golf Tech
        </Link>
      </div>
    </div>
  );
}
