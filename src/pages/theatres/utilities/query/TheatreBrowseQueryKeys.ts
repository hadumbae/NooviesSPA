/**
 * @file TheatreBrowseQueryKeys.ts
 *
 * React Query key factory for theatre browse queries.
 *
 * Provides stable, namespaced cache keys for
 * location-based theatre browsing with pagination.
 */

import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";

/**
 * Query parameters for location-based theatre browsing.
 *
 * All fields are optional to allow partial cache key
 * composition during optimistic or staged queries.
 */
type ByLocationParams = Partial<PaginationValues> & {
    /** Location identifier (city, country code, or free-form target) */
    target?: string;
};

/**
 * React Query key definitions for theatre browse queries.
 */
export const TheatreBrowseQueryKeys = {
    /** Base namespace for all theatre browse queries */
    all: ["theatres", "browse"],

    /**
     * Cache key for browsing theatres by location.
     *
     * @param params Location and pagination parameters
     * @returns React Query cache key
     */
    byLocation: (params: ByLocationParams) => [
        ...TheatreBrowseQueryKeys.all,
        "lists",
        "by-location",
        params,
    ],
};