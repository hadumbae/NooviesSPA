/**
 * @file MovieDetailsSearchParams.schema.ts
 *
 * @summary
 * Zod schema and constants for movie details page search parameters.
 *
 * @description
 * Defines allowed tabs on the movie details page and validates
 * query parameters, ensuring only recognized tabs are used.
 */

import {z} from "zod";

/** Allowed tabs on the movie details page. */
export const MOVIE_DETAILS_PAGE_TABS = ["credits", "showings"] as const;

/**
 * @summary
 * Validation schema for movie details page search parameters.
 *
 * @description
 * Validates query parameters such as the active tab on the
 * movie details page.
 */
export const MovieDetailsSearchParams = z.object({
    /** Currently active tab on the movie details page. */
    activeTab: z
        .enum(MOVIE_DETAILS_PAGE_TABS, {
            message: "Invalid value. Must be 'credits' or 'showings'.",
        })
        .optional(),
});
