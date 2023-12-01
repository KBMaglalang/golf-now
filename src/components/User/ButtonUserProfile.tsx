import React from "react";
import Link from "next/link";

// components

// context or store

// constants and functions

export default function ButtonUserProfile() {
  return (
    <Link href={"/user/profile"} className="btn btn-ghost">
      Profile
    </Link>
  );
}
