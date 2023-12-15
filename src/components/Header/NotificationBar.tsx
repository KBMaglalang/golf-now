import React from "react";

// components

// context or store

// constants and functions
import { sanityFetch } from "@/lib/sanity";
import { SANITY_GET_NOTIFICATIONS } from "@/lib/sanity/queries";

export default async function NotificationBar() {
  /**

  Fetches notification data from Sanity API.
  @param {Object} options - The options for fetching notification data.
  @param {string} options.query - The query for fetching notification data.
  @param {string[]} options.tags - The tags for filtering notification data.
  @returns {Promise<HeaderNotificationType>} - A promise that resolves to the header notification object. */
  const nottificationData = await sanityFetch<HeaderNotificationType>({
    query: SANITY_GET_NOTIFICATIONS,
    tags: [],
  });

  if (!nottificationData?.title || !nottificationData?.text) return;

  return (
    <div className="w-full scrolling-text-container bg-brand-ads">
      <div className="w-full flex justify-center scrolling-text text-white font-medium py-2">
        {nottificationData?.text}
      </div>
    </div>
  );
}
