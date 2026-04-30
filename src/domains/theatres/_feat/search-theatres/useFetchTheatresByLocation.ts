/**
 * @fileoverview React Query hook for fetching paginated theatres filtered by a location target.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {theatresByLocation} from "@/domains/theatres/_feat/search-theatres/repository.ts";
import {BrowseTheatreByLocationConfig} from "@/domains/theatres/_feat/search-theatres/repository.types.ts";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {
    PaginatedTheatresWithRecentShowings,
    PaginatedTheatresWithRecentShowingsSchema
} from "@/domains/theatres/schema/theatre";
import {SearchTheatreQueryKeys} from "@/domains/theatres/_feat/search-theatres/queryKeys.ts";

/** Props for the useFetchTheatresByLocation component. */
type LocationParams = BrowseTheatreByLocationConfig & {
    options?: FetchQueryOptions<PaginatedTheatresWithRecentShowings>;
};

/**
 * Fetches paginated theatres filtered by a location target.
 */
export function useFetchTheatresByLocation(
    {page, perPage, target, showingsPerTheatre, options}: LocationParams,
): UseQueryResult<PaginatedTheatresWithRecentShowings, HttpResponseError> {
    const fetchByLocation = buildQueryFn<PaginatedTheatresWithRecentShowings>({
        action: () => theatresByLocation({page, perPage, target, showingsPerTheatre}),
        schema: PaginatedTheatresWithRecentShowingsSchema,
    });

    return useQuery({
        queryKey: SearchTheatreQueryKeys.byLocation({page, perPage, target, showingsPerTheatre}),
        queryFn: fetchByLocation,
        ...useQueryOptionDefaults(options),
    });
}