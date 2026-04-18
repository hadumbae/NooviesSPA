/**
 * @fileoverview Type definitions for person detail view repository operations.
 */

import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";

/**
 * Parameters for retrieving a person's administrative detail view.
 */
export type FetchPersonDetailsViewDataConfig = {
  slug: SlugString;
  limit?: number;
};