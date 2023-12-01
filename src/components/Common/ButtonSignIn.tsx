"use client";

import React from "react";
import { signIn } from "next-auth/react";

// components

// context or store

// constants and functions

export function ButtonSignIn() {
  return (
    <button
      className="btn btn-primary btn-sm"
      onClick={() =>
        signIn("google", { callbackUrl: `${window.location.origin}/` })
      }
    >
      LogIn
    </button>
  );
}
