/* eslint-disable no-process-env */
import createImageUrlBuilder from "@sanity/image-url";

export const imageBuilder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
});

// @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line
export const urlForImage = (
  source: Parameters<(typeof imageBuilder)["image"]>[0]
) => imageBuilder.image(source).auto("format").fit("max");
