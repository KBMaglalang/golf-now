import React from "react";
import Link from "next/link";

// components

// context or store

// constants and functions

export default function ButtonUserSettings() {
  return (
    <Link href={"/user/settings"} className="btn btn-ghost">
      Settings
    </Link>
  );
}
