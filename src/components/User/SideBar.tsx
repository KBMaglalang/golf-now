import React from "react";

// components
import ButtonUserProfile from "./ButtonUserProfile";
import ButtonUserOrders from "./ButtonUserOrders";
import ButtonUserSettings from "./ButtonUserSettings";

// context or store

// constants and functions

export function SideBar() {
  return (
    <div className="w-full h-full flex flex-col space-y-4 md:border-r-2 p-4">
      <ButtonUserProfile />
      <ButtonUserOrders />
      <ButtonUserSettings />
    </div>
  );
}
