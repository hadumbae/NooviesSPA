/**
 * @fileoverview Custom React Query hook for fetching administrative Genre view data.
 * Retrieves comprehensive details for a specific genre, including its associated
 * paginated movie list.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {PaginationValues} from "@/common/features/fetch-pagination-search-params";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {getFetchGenreDetails} from "@/domains/genres/_feat/admin-view-data/repository.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {GenreAdminViewDataQueryKeys} from "@/domains/genres/_feat/admin-view-data/GenreAdminViewDataQueryKeys.ts";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {
    GenreDetailsViewData,
    GenreDetailsViewDataSchema
} from "@/domains/genres/_feat/admin-view-data/GenreDetailsViewDataSchema.ts";

/** Parameters for the {@link useFetchGenreDetailsViewData} hook. */
type FetchParams = {
    slug: SlugString;
    queries: PaginationValues;
    options?: FetchQueryOptions<unknown>;
};

/**
 * Fetches the administrative view data for a specific genre.
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