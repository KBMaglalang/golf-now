import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const cmsClient = sanityClient({
  projectId: "96naymmp",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(cmsClient);
export const urlFor = (source) => builder.image(source);
