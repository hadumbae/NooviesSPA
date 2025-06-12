import {EntityPaginatedQuery, RequestOptions} from "@/common/type/repositories/EntityRequestParamTypes.ts";
import {MovieFilterQuery} from "@/pages/movies/schema/queries/MovieFilterQuerySchema.ts";
import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";
import throwResponseError from "@/common/utility/errors/throwResponseError.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

/**
 * Parameters used for querying movies, supporting filters, population, virtual fields, and optional pagination.
 *
 * Combines:
 * - {@link RequestOptions} for options like `populate`, `virtuals`, and `limit`
 * - {@link EntityPaginatedQuery} for optional pagination controls
 * - {@link MovieFilterQuery} for domain-specific filtering (e.g., by genre or release date)
 */
type QueryParams = RequestOptions & EntityPaginatedQuery & {
    /**
     * Optional filters to narrow down the movie results.
     * Includes fields like title, releaseDate, and genres.
     */
    filters?: MovieFilterQuery;
};

/**
 * React Query hook for fetching movies based on flexible query parameters.
 *
 * This hook enables both paginated and non-paginated movie queries, with support for:
 * - Filtering via {@link MovieFilterQuery}
 * - Population of related entities (`populate`)
 * - Inclusion of virtual fields (`virtuals`)
 * - Pagination (`page`, `perPage`)
 *
 * Internally, this hook uses {@link MovieRepository.query} and handles error throwing via `throwResponseError`.
 *
 * @param params - Query parameters including filters, pagination, and options.
 * @param params.filters - Optional filters to apply (e.g., title, releaseDate, genres).
 * @param params.paginated - Whether the result should be paginated.
 * @param params.page - The page number (required if `paginated` is true).
 * @param params.perPage - The number of results per page (required if `paginated` is true).
 * @param params.populate - Whether to populate referenced fields in the result.
 * @param params.virtuals - Whether to include virtual properties in the result.
 * @param params.limit - Optional limit for non-paginated queries.
 *
 * @returns A `UseQueryResult` containing the movie data or an error state.
 */
export default function useFetchMovieQuery(params: QueryParams): UseQueryResult<unknown> {
    const {filters = {}, paginated, page, perPage, ...options} = params;
    const pagination: EntityPaginatedQuery = paginated
        ? {paginated: true, page, perPage}
        : {paginated: false};

    const queryKey = ["fetch_movies_by_query", {filters, pagination, options}] as const;

    const fetchMovies = async () => {
        const {response, result} = await MovieRepository.query({
            queries: {...filters, ...pagination, ...options}
        });

        if (!response.ok) {
            const message = "Failed to fetch movies.";
            throwResponseError({message, response, result});
        }

        return result;
    }

    return useQuery({
        queryKey,
        queryFn: fetchMovies,
        staleTime: 1000 * 60,
        placeholderData: (previousData) => previousData,
    });
}