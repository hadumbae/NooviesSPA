/**
 * @fileoverview Type definitions for the theatre screen admin view data repository.
 */

import {SlugString} from "@/common/_schemas/strings/slug-strings/SlugString.ts";

/** Configuration for fetching theatre screen administrative view data. */
export type FetchTheatreScreenAdminViewDataConfig = {
    theatreSlug: SlugString;
    screenSlug: SlugString;
};