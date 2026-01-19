import {MovieCreditQueryOptions} from "@/pages/moviecredit/schemas/filters/MovieCreditQueryOptions.types.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import MovieCreditRepository from "@/pages/moviecredit/repositories/MovieCreditRepository.ts";

/**
 * Params for {@link useFetchPaginatedMovieCredits}.
 */
type FetchParams<TData = unknown> = PaginationValues & {
    /** Credit query filters */
    queries?: MovieCreditQueryOptions;

    /** Request options (excluding limit) */
    config?: Omit<RequestOptions, "limit">;

    /** React Query options */
    options?: UseQueryOptions<TData>;
};

/**
 * Fetch paginated movie credits.
 *
 * @template TData
 */
export function useFetchPaginatedMovieCredits<TData = unknown>(
    {page, perPage, queries, config, options}: FetchParams<TData>
): UseQueryResult<unknown, HttpResponseError> {
    const fetchPaginatedCredits = useQueryFnHandler({
        action: () => MovieCreditRepository.paginated({page, perPage, queries, config}),
        errorMessage: "Failed to fetch movies. Please try again.",
    });

    return useQuery({
        queryKey: ["movie_credits", "lists", "paginated", {...queries, ...config}],
        queryFn: fetchPaginatedCredits,
        ...useQueryOptionDefaults(options),
    });
}
