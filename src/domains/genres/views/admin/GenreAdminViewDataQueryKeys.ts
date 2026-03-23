/**
 * @file Query key factory for administrative Genre view-specific data.
 * @filename GenreAdminViewDataQueryKeys.ts
 */

import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";

/**
 * Parameter structure for identifying specific genre detail queries.
 */
type ItemDetailsParams = Partial<PaginationValues> & {
    /** The URL-friendly unique identifier for the genre. */
    slug?: SlugString
};

/**
 * Factory object for generating consistent, hierarchical TanStack Query keys.
 * * **all:** The base key used for broad cache invalidation of all admin genre view data.
 * * **itemDetails:** A granular key that incorporates the genre slug and pagination state to ensure unique caching for specific data sets.
 */
export const GenreAdminViewDataQueryKeys = {
    /**
     * The root scope for administrative genre views.
     */
    all: ["genres", "views", "admin"],

    /**
     * Generates a key for fetching aggregated genre metadata and associated movies.
     * @param params - Contains the slug and pagination offsets to differentiate cache entries.
     */
    itemDetails: (params: ItemDetailsParams = {}) =>
        [...GenreAdminViewDataQueryKeys.all, "item", "details", params],
}