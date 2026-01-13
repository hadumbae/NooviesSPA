/**
 * @file useFetchGenreBySlug.ts
 *
 * React Query hook for fetching a single genre by slug.
 *
 * Responsibilities:
 * - Invoke {@link GenreRepository.getBySlug}
 * - Apply centralized query error handling
 * - Normalize React Query options
 */

import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";

/**
 * Parameters for {@link useFetchGenreBySlug}.
 */
type FetchParams = {
    /** Genre slug identifier. */
    slug: string;
    /** Optional request configuration (excluding pagination). */
    config?: Omit<RequestOptions, "limit">;
    /** Optional React Query options override. */
    options?: UseQueryOptions<unknown>;
};

/**
 * **useFetchGenreBySlug**
 *
 * Fetches a single genre entity using its slug.
 *
 * Flow:
 * 1. Wrap repository call with {@link useQueryFnHandler}
 * 2. Execute query via React Query
 * 3. Apply default query option normalization
 *
 * Error Handling:
 * - Repository errors are wrapped as {@link HttpResponseError}
 *
 * @param params - {@link FetchParams}
 *
 * @returns React Query result containing the genre data.
 *
 * @example
 * ```ts
 * const {data, isLoading} = useFetchGenreBySlug({
 *   slug: "action",
 * });
 * ```
 */
export default function useFetchGenreBySlug(
    {slug, config, options}: FetchParams,
): UseQueryResult<unknown, HttpResponseError> {
    const fetchGenre = useQueryFnHandler({
        action: () => GenreRepository.getBySlug({slug, config}),
        errorMessage: "Failed to fetch genre.",
    });

    return useQuery({
        queryKey: ["fetch_genre_by_slug", {slug, ...config}],
        queryFn: fetchGenre,
        ...useQueryOptionDefaults(options),
    });
}
