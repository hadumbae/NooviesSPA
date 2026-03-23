/**
 * @file Custom React Query hook for fetching administrative Genre view data.
 * @filename useFetchGenreDetailsViewData.ts
 */

import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {getFetchGenreDetails} from "@/domains/genres/repositories/views/GenreAdminViewDataRepository.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Parameters for the genre details query hook.
 */
type FetchParams = {
    /** The unique slug of the genre to fetch. */
    slug: SlugString,
    /** Pagination parameters for the associated movie list. */
    queries: PaginationValues;
    /** Standard TanStack Query options for behavior customization (e.g., enabled, staleTime). */
    options?: UseQueryOptions<unknown>;
}

/**
 * Custom hook that manages the server state for the Genre Details administrative view.
 * @param params - Configuration object including slug, pagination, and query options.
 * @returns A query result object containing data, loading states, and potential {@link HttpResponseError}.
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
        queryKey: ["genres", "views", "admin", "item", "details", {slug, page, perPage}],
        queryFn: fetchGenreData,
        ...useQueryOptionDefaults(options),
    });
}