/**
 * @fileoverview Type definitions for the showing details admin view data repository.
 */

import {SlugString} from "@/common/_schemas/strings/slug-strings/SlugString.ts";

/** Configuration for fetching showing details view data. */
export type GetFetchShowingDetailsViewDataConfig = {
    slug: SlugString;
}