import { FetchBySlugParams } from "@/common/type/query/FetchBySlugParams.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Fetch a single genre by its slug.
 *
 * @remarks
 * Wraps {@link GenreRepository.getBySlug} in a React Query hook with:
 * - Centralized error handling via {@link useQueryFnHandler}
 * - Default query option normalization via {@link useQueryOptionDefaults}
 *
 * Intended for detail views or routes where the genre slug
 * uniquely identifies the entity.
 *
 * @param params - Slug identifier and optional query configuration.
 *
 * @returns React Query result containing the fetched genre data.
 *
 * @example
 * ```ts
 * const { data, isLoading } = useFetchGenreBySlug({
 *   slug: "action",
 * });
 * ```
 */
export default function useFetchGenreBySlug(
    params: FetchBySlugParams,
): UseQueryResult<unknown, HttpResponseError> {
    const { slug, queryConfig, queryOptions } = params;

    const queryKey = ["fetch_genre_by_slug", {slug, ...queryConfig}];

    const fetchGenre = useQueryFnHandler({
        action: () => GenreRepository.getBySlug({ slug, ...queryConfig }),
        errorMessage: "Failed to fetch genre.",
    });

    const options = useQueryOptionDefaults(queryOptions);

    return useQuery({
        queryKey,
        queryFn: fetchGenre,
        ...options,
    });
}
