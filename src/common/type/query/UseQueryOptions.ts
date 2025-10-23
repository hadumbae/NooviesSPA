/**
 * Options for customizing the behavior of a `useQuery` hook.
 *
 * @template TData The type of data returned by the query.
 */
export type UseQueryOptions<TData> = {
    /**
     * If `false`, the query will not automatically run.
     * Default is `true`.
     */
    enabled?: boolean;

    /**
     * The amount of time (in milliseconds) that fetched data is considered "fresh".
     *
     * - `0` (default) → data is stale immediately.
     * - `Infinity` → data is never considered stale.
     */
    staleTime?: number | typeof Infinity;

    /**
     * Initial data to populate the query with before it fetches.
     * Can be a direct value or a function returning the value (lazy initialization).
     *
     * This value becomes part of the query cache.
     */
    initialData?: TData | (() => TData);

    /**
     * Placeholder data to display while the query is loading.
     * Can be a direct value or a function that receives the previous query data
     * and returns a new value.
     *
     * Unlike `initialData`, this does **not** become the cached value.
     *
     * @param previousData - The previous data for this query, if available.
     */
    placeholderData?: TData | ((previousData: TData | undefined) => TData);
};
