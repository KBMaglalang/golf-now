"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// components

// context or store

// constants and functions
import { formatPathname } from "@/lib/utils";

export function BreadCrumb() {
  const pathname = usePathname();
  const updatedPathName = formatPathname(pathname);

  function joinUpToIndex(arr: string[], index: number) {
    // Use slice to get elements from the start up to the specified index
    // Use join to combine them with '/'
    const results = arr
      .slice(0, index + 1)
      .join("/")
      .toString()
      .replace(/ /g, "-")
      .toLowerCase();

    return results;
  }

  if (!updatedPathName) return;

  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        {updatedPathName &&
          updatedPathName?.map((pathItem, index, array) => {
            return (
              <li key={index}>
                {index < array.length - 1 ? (
                  <Link href={`/${joinUpToIndex(array, index)}`}>
                    {pathItem}
                  </Link>
                ) : (
                  pathItem
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
