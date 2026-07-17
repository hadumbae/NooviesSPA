/**
 * @fileoverview Custom React Query hook for fetching administrative Genre view data.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";
import {SlugString} from "@/common/_schemas/strings/slug-strings/SlugString.ts";
import {getFetchGenreDetails} from "@/domains/genres/_feat/admin-view-data/repository";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {GenreAdminViewDataQueryKeys} from "@/domains/genres/_feat/admin-view-data/fetch/GenreAdminViewDataQueryKeys.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {GenreDetailsViewData, GenreDetailsViewDataSchema} from "@/domains/genres/_feat/admin-view-data/schema";

/** Parameters for the useFetchGenreDetailsViewData hook. */
type FetchParams = {
    slug: SlugString;
    queries: PaginationValues;
    options?: FetchQueryOptions<unknown>;
};

/**
 * Fetches and validates the administrative view data for a specific genre.
 */
export function useFetchGenreDetailsViewData(
    {slug, queries, options}: FetchParams
): UseQueryResult<GenreDetailsViewData, HttpResponseError> {
    const {page, perPage} = queries;

    const fetchGenreData = buildQueryFn({
        schema: GenreDetailsViewDataSchema,
        action: () => getFetchGenreDetails({slug, queries}),
    });

    return useQuery({
        queryKey: GenreAdminViewDataQueryKeys.itemDetails({slug, page, perPage}),
        queryFn: fetchGenreData,
        ...useQueryOptionDefaults(options),
    });
}