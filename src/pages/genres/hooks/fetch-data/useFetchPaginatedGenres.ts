/**
 * @file useFetchPaginatedGenres.ts
 *
 * React Query hook for fetching paginated `Genre` collections.
 */

import { GenreQueryOptions } from "@/pages/genres/schema/filters/GenreQueryOptions.types.ts";
import { RequestOptions } from "@/common/type/request/RequestOptions.ts";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";
import { PaginationValues } from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Parameters for {@link useFetchPaginatedGenres}.
 *
 * @template TData - Optional transformed response type.
 */
type FetchQueries<TData = unknown> = PaginationValues & {
    /** Optional genre filters. */
    queries?: GenreQueryOptions;

    /** Repository request options. */
    config?: RequestOptions;

    /** React Query configuration overrides. */
    options?: UseQueryOptions<TData>;
};

/**
 * Fetches paginated genres.
 *
 * @remarks
 * - Delegates pagination logic to {@link GenreRepository.paginated}
 * - Automatically normalizes query options and errors
 *
 * @param params - Pagination, filters, and configuration.
 * @returns React Query result containing paginated genre data.
 */
export default function useFetchPaginatedGenres<TData = unknown>(
    { page, perPage, queries, config, options }: FetchQueries<TData>
): UseQueryResult<unknown, HttpResponseError> {
    const fetchGenres = useQueryFnHandler({
        errorMessage: "Failed to fetch genres. Please try again.",
        action: () => GenreRepository.paginated({ page, perPage, config, queries }),
    });

    return useQuery({
        queryKey: ["genres", "list", "paginated", { page, perPage, ...queries, ...config }],
        queryFn: fetchGenres,
        ...useQueryOptionDefaults(options),
    });
}
