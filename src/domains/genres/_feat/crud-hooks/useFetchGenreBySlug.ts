/**
 * @fileoverview React Query hook for fetching a single Genre by its slug.
 * Orchestrates slug-based retrieval with standardized error handling and
 * consistent query key management.
 */

import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import GenreRepository from "@/domains/genres/repositories/GenreRepository.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import { RequestOptions } from "@/common/type/request/RequestOptions.ts";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";
import { GenreCRUDQueryKeys } from "@/domains/genres/_feat/crud-hooks/GenreCRUDQueryKeys.ts";

/**
 * Parameters for the useFetchGenreBySlug hook.
 */
type FetchParams<TData = unknown> = {
    slug: string;
    config?: Omit<RequestOptions, "limit">;
    options?: UseQueryOptions<TData>;
};

/**
 * Custom hook for retrieving a single genre via the Genre repository using its slug.
 */
export default function useFetchGenreBySlug<TData = unknown>(
    { slug, config, options }: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchGenre = useQueryFnHandler({
        action: () => GenreRepository.getBySlug({ slug, config }),
        errorMessage: "Failed to fetch genre data by slug. Please try again.",
    });

    return useQuery({
        queryKey: GenreCRUDQueryKeys.slug({ slug, ...config }),
        queryFn: fetchGenre,
        ...useQueryOptionDefaults(options),
    });
}