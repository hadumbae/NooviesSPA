import {FetchBySlugParams} from "@/common/type/query/FetchBySlugParams.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";

/**
 * Fetches a single movie by its slug.
 *
 * @remarks
 * Wraps {@link MovieRepository.getBySlug} in a React Query hook with
 * standardized error handling and default query options.
 *
 * The query key is scoped by both the slug and provided query configuration
 * to ensure correct cache separation.
 *
 * @template TData - Expected response data shape
 *
 * @param params - Slug, query config, and optional React Query options
 * @returns React Query result for the movie fetch operation
 */
export default function useFetchMovieBySlug<TData = unknown>(
    params: FetchBySlugParams<TData>,
): UseQueryResult<unknown, HttpResponseError> {
    const {slug, queryConfig, queryOptions} = params;

    const queryKey = ["fetch_movie_by_slug", queryConfig];

    const fetchMovie = useQueryFnHandler({
        action: () => MovieRepository.getBySlug({slug, ...queryConfig}),
        errorMessage: "Failed to fetch movie. Please try again.",
    });

    const options = useQueryOptionDefaults(queryOptions);

    return useQuery({
        queryKey,
        queryFn: fetchMovie,
        ...options,
    });
}
