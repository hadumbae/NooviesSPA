/**
 * @file useFetchTheatresByLocation.ts
 *
 * React Query hook for fetching paginated theatres
 * filtered by a location target.
 *
 * Integrates:
 * - {@link TheatreBrowseRepository} for API access
 * - Shared query option defaults
 * - Centralized query error handling
 */

import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {TheatreBrowseRepository} from "@/pages/theatres/repositories/theatre-browse/TheatreBrowseRepository.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {
    BrowseTheatreByLocationConfig,
} from "@/pages/theatres/repositories/theatre-browse/TheatreBrowseRepository.types.ts";

/**
 * Parameters for fetching theatres by location.
 */
type LocationParams = PaginationValues & {
    /**
     * Location target used to filter theatres.
     *
     * Can represent a country code, city name, or free-form marker.
     */
    target?: string;

    /** Optional per-theatre browse configuration */
    config?: BrowseTheatreByLocationConfig;

    /** React Query option overrides */
    options?: UseQueryOptions<unknown>;
};

/**
 * Fetches paginated theatres filtered by a location target.
 *
 * Uses a stable query key derived from pagination and location
 * parameters, and applies shared query defaults automatically.
 *
 * @param params Pagination, location target, and query options
 * @returns React Query result for the theatre browse request
 */
export function useFetchTheatresByLocation(
    {page, perPage, target, options, config}: LocationParams,
): UseQueryResult<unknown, HttpResponseError> {
    const fetchByLocation = useQueryFnHandler({
        action: () => TheatreBrowseRepository.theatresByLocation({page, perPage, target, config}),
        errorMessage: "An error occurred.",
    });

    return useQuery({
        queryKey: ["theatres", "browse", "lists", "by-location", {page, perPage, target}],
        queryFn: fetchByLocation,
        ...useQueryOptionDefaults(options),
    });
}
