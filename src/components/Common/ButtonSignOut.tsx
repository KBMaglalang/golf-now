"use client";

import React from "react";
import { signOut } from "next-auth/react";

// components

// context or store

// constants and functions

export function ButtonSignOut() {
  return (
    <button
      className="btn btn-error btn-sm"
      onClick={() => signOut({ callbackUrl: `${window.location.origin}/` })}
    >
      LogOut
    </button>
  );
}
