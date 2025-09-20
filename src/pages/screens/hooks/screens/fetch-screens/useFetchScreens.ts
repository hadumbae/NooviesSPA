import {EntityPaginatedQuery, RequestOptions} from "@/common/type/repositories/EntityRequestParamTypes.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import {ScreenQueryOptions} from "@/pages/screens/schema/queries/ScreenQueryOptions.types.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import handleQueryResponse from "@/common/handlers/query/handleQueryResponse.ts";

/**
 * Query parameters for fetching screens.
 *
 * This combines:
 * - {@link RequestOptions} (controls population, virtuals, and limits)
 * - {@link EntityPaginatedQuery} (optional pagination)
 * - {@link ScreenQueryOptions} (domain-specific filters for screens)
 */
export type FetchScreenQueries = RequestOptions & EntityPaginatedQuery & ScreenQueryOptions;

/**
 * React Query hook for fetching screens from the repository
 * using filters, request options, and optional pagination.
 *
 * @template TData The expected shape of the fetched data. Defaults to `unknown`.
 *
 * @param {FetchScreenQueries} queries - Query parameters including filters, pagination, and request options.
 *
 * @returns {UseQueryResult<TData, HttpResponseError>} React Query result object containing:
 * - `data` — The fetched screen data.
 * - `error` — An `HttpResponseError` if the request fails.
 * - `isLoading`, `isError`, `isSuccess` — Status flags from React Query.
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchScreens({
 *   populate: true,
 *   paginated: true,
 *   page: 1,
 *   perPage: 10,
 *   name: "IMAX",
 * });
 * ```
 */
export default function useFetchScreens<TData = unknown>(
    queries: FetchScreenQueries
): UseQueryResult<TData, HttpResponseError> {
    const queryKey = ["fetch_screens_by_query", queries] as const;

    const queryAction = async () => {
        console.log("Screen Queries: ", queries);

        return handleQueryResponse({
            action: () => ScreenRepository.query({queries}),
            errorMessage: "Failed to fetch screen data. Pleas try again."
        })
    }

    return useQuery({
        queryKey,
        queryFn: queryAction,
        staleTime: 1000 * 60,
        placeholderData: (previousData) => previousData,
    });

}