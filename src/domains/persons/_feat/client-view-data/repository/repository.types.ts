/**
 * @fileoverview Type definitions for the person view data repository.
 */

import {BrowsePersonsQueryOptions} from "@/domains/persons/_feat/client-view-data";

/** Configuration for fetching a paginated list of person view data. */
export type GetFetchBrowsePersonsViewDataConfig = {
    page?: number;
    perPage?: number;
    queries?: BrowsePersonsQueryOptions;
};

/** Configuration for fetching person information view data. */
export type GetFetchPersonInfoViewDataConfig = {
    slug: string;
    limit?: number;
};