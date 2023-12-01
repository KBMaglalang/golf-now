import React from "react";
import Link from "next/link";

// components

// context or store

// constants and functions

export default function MobileCategoryBar() {
  return (
    <div className="dropdown w-full justify-center flex md:hidden">
      <div tabIndex={0} role="button" className="btn m-1 w-full">
        Menu
      </div>

      <div className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
        <Link
          href={"/new"}
          role="tab"
          className="tab hover:tab-active w-full md:w-auto"
        >
          New!
        </Link>
        <Link
          href={"/deals"}
          role="tab"
          className="tab hover:tab-active w-full md:w-auto"
        >
          Deals
        </Link>
        <Link
          href={"/clubs"}
          role="tab"
          className="tab hover:tab-active w-full md:w-auto"
        >
          Clubs
        </Link>
        <Link
          href={"/balls"}
          role="tab"
          className="tab hover:tab-active w-full md:w-auto"
        >
          Golf Balls
        </Link>
        <Link
          href={"/shoes"}
          role="tab"
          className="tab hover:tab-active w-full md:w-auto"
        >
          Shoes
        </Link>
        <Link
          href={"/clothing"}
          role="tab"
          className="tab hover:tab-active w-full md:w-auto"
        >
          Clothing
        </Link>
        <Link
          href={"/bag-carts"}
          role="tab"
          className="tab hover:tab-active w-full md:w-auto"
        >
          Bags & Carts
        </Link>
        <Link
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
