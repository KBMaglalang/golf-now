import React from "react";

// components

// context or store

// constants and functions
import { sanityFetch } from "@/lib/sanity";
import { SANITY_GET_NOTIFICATIONS } from "@/lib/sanity/queries";

export default async function NotificationBar() {
  const nottificationData = await sanityFetch<HeaderNotificationType>({
    query: SANITY_GET_NOTIFICATIONS,
    tags: [],
  });

  if (!nottificationData?.title || !nottificationData?.text) return;

  return (
    <div className="w-full bg-base-200 scrolling-text-container">
      <div className="w-full flex justify-center scrolling-text">
        {nottificationData?.text}
      </div>
    </div>
  );
}
