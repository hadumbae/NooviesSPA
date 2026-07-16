/**
 * @fileoverview Type definitions for the theatre client view data repository.
 */

import {SlugString} from "@/common/_schemas/strings/slug-strings/SlugString.ts";
import {DateOnlyString} from "@/common/_schemas/dates/DateOnlyStringSchema.ts";

/** Parameters for fetching theatre information view data. */
export type GetFetchTheatreInfoViewDataConfig = {
  theatreSlug: SlugString;
  localDateString: DateOnlyString;
  queries?: {
      limit?: number;
  };
};