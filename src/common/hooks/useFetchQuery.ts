import {QueryKey, useQuery, UseQueryOptions, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import fetchReturns from "@/common/type/fetch/FetchReturns.ts";

/**
 * Parameters for `useFetchQuery`, defining the query key, fetch action,
 * and optional configuration for React Query.
 *
 * @template TReturn - The expected shape of the successful return value.
 */
interface fetchParams<TReturn> {
    /** Unique identifier for the query, used by Tanstack Query for caching and invalidation. */
    queryKey: QueryKey;

    /** An async function returning a response-result object. The `result` will be returned if the response is OK. */
    action: () => Promise<fetchReturns<TReturn>>;

    /**
     * Optional configuration for the query, excluding `queryKey` and `queryFn`
     * which are internally handled by this hook.
     */
    options?: Omit<UseQueryOptions<TReturn, Error>, 'queryKey' | 'queryFn'>;
}

/**
 * A reusable hook for fetching data using Tanstack Query with built-in error handling and validation.
 *
 * This hook expects the `action` to return a response object with a `result` and an HTTP `response`.
 * If the response is not OK, a `HttpResponseError` will be thrown. The hook also accepts optional
 * query configuration through `options`.
 *
 * @template TReturn - The type of the returned result value.
 *
 * @param queryKey - A unique identifier used for caching and query tracking.
 * @param action - A function that performs the fetch and returns `{ response, result }`.
 * @param options - Optional React Query configuration, excluding `queryKey` and `queryFn`.
 *
 * @returns A `UseQueryResult` containing the result, loading/error state, etc.
 *
 * @example
 * ```ts
 * const action = () => MovieRepository.fetchAll();
 * const query = useFetchQuery({ queryKey: ["fetch_all_movies"], action });
 * ```
 */
export default function useFetchQuery<TReturn>(
    {queryKey, action, options = {}}: fetchParams<TReturn>
): UseQueryResult<TReturn> {
    const queryFn = async () => {
        const {response, result: data} = await action();

        if (!response.ok) {
            throw new HttpResponseError({
                response,
                message: `Request failed for queryKey: ${JSON.stringify(queryKey)}`,
            });
        }

        return data;
    }

    return useQuery({queryKey, queryFn, ...options});
}