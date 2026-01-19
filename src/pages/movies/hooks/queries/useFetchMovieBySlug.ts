import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";

/**
 * Parameters for fetching a movie by slug.
 */
type FetchParams = {
    /** Unique movie slug */
    slug: string;
    /** Optional request configuration */
    config?: RequestOptions;
    /** Optional React Query overrides */
    options?: UseQueryOptions<unknown>;
};

/**
 * React Query hook for fetching a movie by slug.
 *
 * @remarks
 * - Wraps {@link MovieRepository.getBySlug}
 * - Applies default query options
 * - Normalizes error handling
 *
 * @param params - Fetch parameters
 * @returns React Query result
 */
export default function useFetchMovieBySlug(
    {slug, config, options}: FetchParams,
): UseQueryResult<unknown, HttpResponseError> {
    const fetchMovie = useQueryFnHandler({
        action: () => MovieRepository.getBySlug({slug, config}),
        errorMessage: "Failed to fetch movie. Please try again.",
    });

    return useQuery({
        queryKey: ["movies", "slug", {slug, ...config}],
        queryFn: fetchMovie,
        ...useQueryOptionDefaults(options),
    });
}
