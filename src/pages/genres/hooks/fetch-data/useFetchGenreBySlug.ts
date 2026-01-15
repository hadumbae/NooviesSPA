/**
 * @file useFetchGenreBySlug.ts
 *
 * React Query hook for fetching a single `Genre` by slug.
 *
 * Responsibilities:
 * - Invoke {@link GenreRepository.getBySlug}
 * - Apply centralized query error handling
 * - Normalize React Query options
 */

import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import { RequestOptions } from "@/common/type/request/RequestOptions.ts";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";

/**
 * Parameters for {@link useFetchGenreBySlug}.
 */
type FetchParams = {
    /** Genre slug identifier. */
    slug: string;

    /**
     * Repository request options.
     *
     * Excludes pagination-related fields.
     */
    config?: Omit<RequestOptions, "limit">;

    /** React Query configuration overrides. */
    options?: UseQueryOptions<unknown>;
};

/**
 * Fetches a single `Genre` by slug.
 *
 * @param params - Fetch configuration.
 * @returns React Query result containing genre data or {@link HttpResponseError}.
 */
export default function useFetchGenreBySlug(
    { slug, config, options }: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchGenre = useQueryFnHandler({
        action: () => GenreRepository.getBySlug({ slug, config }),
        errorMessage: "Failed to fetch genre.",
    });

    return useQuery({
        queryKey: ["genres", "slug", { slug, ...config }],
        queryFn: fetchGenre,
        ...useQueryOptionDefaults(options),
    });
}
