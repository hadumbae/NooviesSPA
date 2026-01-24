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

/**
 * Parameters for fetching theatres by location.
 */
type LocationParams = PaginationValues & {
    /** Location identifier (city, country code, or free-text target) */
    target?: string;

    /** React Query configuration overrides */
    options?: UseQueryOptions<unknown>;
};

/**
 * Fetches paginated theatres that have scheduled showings,
 * filtered by a location target.
 *
 * @param params Pagination, location, and query options
 * @returns React Query result for theatre browse request
 */
export function useFetchTheatresByLocation(
    {page, perPage, target, options}: LocationParams,
): UseQueryResult<unknown, HttpResponseError> {
    const fetchByLocation = useQueryFnHandler({
        action: () =>
            TheatreBrowseRepository.theatresByLocation({page, perPage, target}),
        errorMessage: "An error occurred.",
    });

    return useQuery({
        queryKey: ["theatres", "browse", "lists", "by-location", {page, perPage, target}],
        queryFn: fetchByLocation,
        ...useQueryOptionDefaults(options),
    });
}
