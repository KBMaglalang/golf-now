import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

const sanityConfig = {
  projectId: "96naymmp",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
};

export const cmsClient = createClient(sanityConfig);
export const urlFor = (source) => imageUrlBuilder(cmsClient).image(source);
