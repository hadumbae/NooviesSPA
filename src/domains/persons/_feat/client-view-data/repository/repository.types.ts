/**
 * @fileoverview Type definitions for the person view data repository.
 */

/** Configuration for fetching person information view data. */
export type GetFetchPersonInfoViewDataConfig = {
    slug: string;
    limit?: number;
};