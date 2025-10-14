import {EntityPaginatedQuery, RequestOptions} from "@/common/type/repositories/EntityRequestParamTypes.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {ShowingQueryMatchFilters} from "@/pages/showings/schema/queries/ShowingQueryOption.types.ts";

type FetchQueries = RequestOptions & EntityPaginatedQuery & ShowingQueryMatchFilters;

/**
 * React Query hook for fetching a paginated list of showings based on query filters.
 *
 * @template TData - The expected shape of the returned data (e.g., a paginated list of showings).
 *
 * @param queries - An object that combines:
 * - `RequestOptions`: optional metadata such as headers or context.
 * - `EntityPaginatedQuery`: pagination parameters (`page`, `limit`).
 * - `ShowingQueryFilters`: custom filters like `movie`, `theatre`, or `screen`.
 *
 * @returns A {@link UseQueryResult} containing showing data, loading state, error information, and more.
 *
 * @example
 * ```ts
 * const { data, isLoading } = useFetchShowings<PaginatedShowings>({
 *   page: 1,
 *   limit: 10,
 *   movie: "movieId123",
 *   screen: "screenId456"
 * });
 * ```
 */
export default function useFetchShowings<TData>(queries: FetchQueries): UseQueryResult<TData> {
    const queryKey = ["fetch_showings_by_query", queries] as const;

    const fetchByQuery = useQueryFnHandler<TData>({
        action: () => ShowingRepository.query({queries}),
        errorMessage: "Failed to fetch showing data. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchByQuery,
        staleTime: 1000 * 60,
        placeholderData: (previousData) => previousData,
    });
}