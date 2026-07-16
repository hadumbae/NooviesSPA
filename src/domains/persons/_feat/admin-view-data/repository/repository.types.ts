/**
 * @fileoverview Type definitions for person detail view repository operations.
 */

import {SlugString} from "@/common/_schemas/strings/slug-strings/SlugString.ts";

/**
 * Parameters for retrieving a person's administrative detail view.
 */
export type FetchPersonDetailsViewDataConfig = {
  slug: SlugString;
  limit?: number;
};