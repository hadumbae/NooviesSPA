/**
 * @fileoverview Custom React Query hook for fetching administrative Genre view data.
 * Retrieves comprehensive details for a specific genre, including its associated
 * paginated movie list.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {PaginationValues} from "@/common/features/fetch-pagination-search-params";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {getFetchGenreDetails} from "@/domains/genres/repositories/views/GenreAdminViewDataRepository.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {GenreAdminViewDataQueryKeys} from "@/domains/genres/_feat/admin-view-data/GenreAdminViewDataQueryKeys.ts";

/** Parameters for the {@link useFetchGenreDetailsViewData} hook. */
type FetchParams = {
    slug: SlugString;
    queries: PaginationValues;
    options?: UseQueryOptions<unknown>;
};

/**
 * Fetches the administrative view data for a specific genre.
 */
export function useFetchGenreDetailsViewData(
    {slug, queries, options}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const {page, perPage} = queries;

    const fetchGenreData = useQueryFnHandler({
        action: () => getFetchGenreDetails({slug, queries}),
        errorMessage: "Failed to fetch genre details. Please try again.",
    });

    return useQuery({
        queryKey: GenreAdminViewDataQueryKeys.itemDetails({slug, page, perPage}),
        queryFn: fetchGenreData,
        ...useQueryOptionDefaults(options),
    });
}