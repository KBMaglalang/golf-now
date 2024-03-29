"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

// components

// context or store

// constants and functions

export function Search() {
  const router = useRouter();
  const [text, setText] = useState("");

  /**

  Handles keyboard events for input field.
  @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event object.
  @returns {void} */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // on enter key press down
    if (e.key === "Enter") {
      router.push(`/search?q=${text}`);
    }
  };

  return (
    <div className="flex flex-row w-full max-w-4xl">
      <input
        data-test="search-input"
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full"
        defaultValue={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Link data-test="search-button" href={`/search?q=${text}`}>
        <MagnifyingGlassCircleIcon className="w-12 h-12 text-white" />
      </Link>
    </div>
  );
}
