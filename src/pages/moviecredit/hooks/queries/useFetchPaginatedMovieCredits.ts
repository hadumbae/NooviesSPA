import {MovieCreditQueryOptions} from "@/pages/moviecredit/schemas/filters/MovieCreditQueryOptions.types.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import MovieCreditRepository from "@/pages/moviecredit/repositories/MovieCreditRepository.ts";

/**
 * Params for {@link useFetchPaginatedMovieCredits}.
 */
type FetchParams<TData = unknown> = PaginationValues & {
    /** Credit query filters */
    queries: MovieCreditQueryOptions;

    /** Request options (excluding limit) */
    queryConfig?: Omit<RequestOptions, "limit">;

    /** React Query options */
    queryOptions?: UseQueryOptions<TData>;
};

/**
 * Fetch paginated movie credits.
 *
 * @template TData
 */
export default function useFetchPaginatedMovieCredits<TData = unknown>(
    params: FetchParams<TData>
): UseQueryResult<unknown, HttpResponseError> {
    const {
        page,
        perPage,
        queries = {},
        queryConfig,
        queryOptions,
    } = params;

    // --- OPTIONS ---
    const filteredQueries = filterNullishAttributes({...queries, ...queryConfig});
    const optionsWithDefaults = useQueryOptionDefaults(queryOptions);

    // --- QUERY FN ---
    const fetchPaginatedCredits = useQueryFnHandler({
        action: () =>
            MovieCreditRepository.paginated({
                page,
                perPage,
                queries: filteredQueries,
            }),
        errorMessage: "Failed to fetch movies. Please try again.",
    });

    // --- QUERY ---
    return useQuery({
        queryKey: ["fetch_paginated_movie_credits", filteredQueries],
        queryFn: fetchPaginatedCredits,
        ...optionsWithDefaults,
    });
}
