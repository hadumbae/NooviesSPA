import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * @file UseQueryOptions.ts
 *
 * Configuration options for a `useQuery` hook.
 *
 * Defines cache behavior, execution control, error handling,
 * and data hydration strategies for a React Query query.
 *
 * @template TData
 * Type of data returned by the query.
 *
 * @template TError
 * Type of error produced by the query function.
 */
export type UseQueryOptions<TData, TError = HttpResponseError> = {
    /**
     * Enable or disable automatic query execution.
     *
     * @defaultValue true
     */
    enabled?: boolean;

    /**
     * Duration (in milliseconds) for which fetched data is considered fresh.
     *
     * @remarks
     * - `0` → data is stale immediately
     * - `Infinity` → data is never considered stale
     */
    staleTime?: number | typeof Infinity;

    /**
     * Initial value used to populate the query before the first fetch.
     *
     * @remarks
     * This value is written to the query cache.
     */
    initialData?: TData | (() => TData);

    /**
     * Temporary data displayed while a query is loading or refetching.
     *
     * @remarks
     * Unlike `initialData`, placeholder data is **not** stored in the cache.
     *
     * @param previousData
     * Previously cached data for this query, if available.
     */
    placeholderData?: TData | ((previousData: TData | undefined) => TData | undefined);

    /**
     * Controls whether query errors should be thrown.
     *
     * @remarks
     * When set to a function, the return value determines whether
     * the error should be thrown for the given error instance.
     */
    throwOnError?: boolean | ((error: TError) => boolean);
};
