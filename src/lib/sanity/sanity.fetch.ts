import "server-only";

import type { QueryParams } from "@sanity/client";
import { draftMode } from "next/headers";
import { client } from "./sanity.client";

// constants and functions
import { SANITY_REVALIDATION_TIME } from "@/config/sanity/revalidate";

// eslint-disable-next-line no-process-env
export const token = process.env.SANITY_API_READ_TOKEN!;

const DEFAULT_PARAMS = {} as QueryParams;
const DEFAULT_TAGS = [] as string[];

export function sanityFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
}: {
  query: string;
  params?: QueryParams;
  cache?: RequestCache;
  tags: string[];
}): Promise<QueryResponse> {
  const isDraftMode = draftMode().isEnabled;
  if (isDraftMode && !token) {
    throw new Error(
      "The `SANITY_API_READ_TOKEN` environment variable is required."
    );
  }

  let revalidateValue: string | boolean | number = false;
  if (process.env.NODE_ENV === "production") {
    revalidateValue = SANITY_REVALIDATION_TIME;
  }

  return client.fetch<QueryResponse>(query, params, {
    ...(isDraftMode && {
      token,
      perspective: "previewDrafts",
    }),
    next: {
      revalidate: revalidateValue,
      tags,
    },
  });
}
