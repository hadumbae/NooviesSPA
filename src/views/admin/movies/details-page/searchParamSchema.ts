/** @fileoverview Zod schema and constants for movie details page search parameters. */

import {z} from "zod";

/** Allowed tabs on the movie details page. */
export const MOVIE_DETAILS_PAGE_TABS = ["credits", "showings"] as const;

/** Validation schema for movie details page search parameters. */
export const MovieDetailsPageSearchParamsSchema = z.object({
    activeTab: z
        .enum(MOVIE_DETAILS_PAGE_TABS, {message: "Invalid value. Must be 'credits' or 'showings'.",})
        .optional(),
});

/** Search parameters for the Movie Details page. */
export type MovieDetailsPageSearchParams = z.infer<typeof MovieDetailsPageSearchParamsSchema>;