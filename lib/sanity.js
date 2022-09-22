import createImageUrlBuilder from "@sanity/image-url";
import { sanityConfig } from "./config";
// import { createPreviewSubscriptionHook } from "next-sanity";

export const imageBuilder = createImageUrlBuilder(sanityConfig);

export const urlForImage = (source) =>
  imageBuilder.image(source).auto("format").fit("max");

// export const usePreviewSubscription =
//   createPreviewSubscriptionHook(sanityConfig);
