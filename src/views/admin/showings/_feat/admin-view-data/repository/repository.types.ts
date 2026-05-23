/**
 * @fileoverview Type definitions for the showing details admin view data repository.
 */

import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";

/** Configuration for fetching showing details view data. */
export type GetFetchShowingDetailsViewDataConfig = {
    slug: SlugString;
}