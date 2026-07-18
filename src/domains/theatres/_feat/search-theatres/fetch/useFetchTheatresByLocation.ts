/**
 * @fileoverview React Query hook for fetching paginated theatres filtered by a location target.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {FetchQueryOptions} from "@/common/_types/fetch-queries/FetchQueryOptions.ts";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {PaginatedItems} from "@/common/_types";
import {generatePaginationSchema} from "@/common/_feat/validation-builders";

import {TheatreWithRecentShowings, TheatreWithRecentShowingsSchema} from "@/domains/theatres/_schema";
import {SearchTheatreQueryKeys} from "@/domains/theatres/_feat/search-theatres/fetch/queryKeys.ts"
import {BrowseTheatreByLocationConfig, theatresByLocation} from "@/domains/theatres/_feat/search-theatres/repository";

/** Props for the useFetchTheatresByLocation component. */
type LocationParams = BrowseTheatreByLocationConfig & {
    options?: FetchQueryOptions<PaginatedItems<TheatreWithRecentShowings>>;
};

/**
 * Fetches paginated theatres filtered by a location target.
 */
export function useFetchTheatresByLocation(
    {page, perPage, target, showingsPerTheatre, options}: LocationParams,
): UseQueryResult<PaginatedItems<TheatreWithRecentShowings>, HttpResponseError> {
    const fetchByLocation = buildQueryFn<PaginatedItems<TheatreWithRecentShowings>>({
        action: () => theatresByLocation({page, perPage, target, showingsPerTheatre}),
        schema: generatePaginationSchema(TheatreWithRecentShowingsSchema),
    });

    return useQuery({
        queryKey: SearchTheatreQueryKeys.byLocation({page, perPage, target, showingsPerTheatre}),
        queryFn: fetchByLocation,
        ...useQueryOptionDefaults(options),
    });
}