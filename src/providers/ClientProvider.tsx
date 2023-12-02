"use client";

import React from "react";
import { Toaster } from "react-hot-toast";

// ! Due to the react toast notification being a client facing function, it needs to be wrapped in a client provider
// other client libraries can also be put here

export function ClientProvider() {
  return (
    <>
      <Toaster position="top-center" />
    </>
  );
}
