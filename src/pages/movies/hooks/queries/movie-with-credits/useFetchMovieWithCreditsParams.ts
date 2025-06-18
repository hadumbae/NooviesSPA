import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import QueryFilters from "@/common/type/QueryFilters.ts";

/**
 * Parameters for the `useFetchMovieWithCredits` hook.
 */
export type useFetchMovieWithCreditsParams = {
    /**
     * The ID of the movie to fetch.
     */
    movieID: ObjectId;

    /**
     * Whether to populate related fields in the movie document.
     * Defaults to `false`.
     */
    populateMovie?: boolean;

    /**
     * Optional filters to apply when fetching movie credits
     * (e.g., filtering by role type, department, etc.).
     */
    creditFilters?: QueryFilters;
};