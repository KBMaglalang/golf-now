/* eslint-disable no-process-env */
// import { createClient } from "src";
import { createClient } from "./client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2022-11-11",
  useCdn: false,
  perspective: "published",
  studioUrl: "/studio",
  logger: console,
  encodeSourceMap: true,
  resultSourceMap: "withKeyArraySelector",
  token:
    process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
});
