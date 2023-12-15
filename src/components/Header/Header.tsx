import React from "react";
import Link from "next/link";

// components
import CategoryBar from "./CategoryBar";
import MobileCategoryBar from "./MobileCategoryBar";
import NotificationBar from "./NotificationBar";
import { Search, ButtonCart, ButtonAccount } from "../Common";

// context or store

// constants and functions
import { WEBSITE_NAME } from "@/constants";

export function Header() {
  return (
    <header className="flex-col ">
      {/* notifications */}
      <NotificationBar />

      <div className="navbar bg-brand-main ">
        {/* website  */}
        <div className="flex-none">
          <Link
            data-text="home"
            href={"/"}
            className="font-bold text-xl p-4 hover:cursor-pointer text-white"
          >
            {WEBSITE_NAME}
          </Link>
        </div>

        {/* search desktop view */}
        <div className="flex-1 justify-center">
          <Search />
        </div>

        <div className="flex-none">
          {/* cart */}
          <ButtonCart />

          {/* account */}
          <ButtonAccount />
        </div>
      </div>

      {/* category bar */}
      <CategoryBar />
      <MobileCategoryBar />
    </header>
  );
}
