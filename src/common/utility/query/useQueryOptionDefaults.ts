/**
 * Returns default options for a React Query query.
 *
 * @template TData - The type of the query data. Defaults to `unknown`.
 *
 * @remarks
 * This hook provides a standard set of options to be passed to React Query's
 * `useQuery` hook, including:
 * - `enabled`: Whether the query should automatically run (default `true`).
 * - `staleTime`: How long the data is considered fresh (default 60 seconds).
 * - `placeholderData`: Returns previous data while the query refetches.
 *
 * @returns An object containing default query options suitable for `useQuery`.
 *
 * @example
 * ```ts
 * const queryOptions = useQueryOptionDefaults<User>();
 * const { data } = useQuery(['user', id], fetchUser, queryOptions);
 * ```
 */
export default function useQueryOptionDefaults<TData = unknown>() {
    return {
        /** Whether the query is enabled and should run automatically. */
        enabled: true,

        /** Time in milliseconds before cached data is considered stale. Default is 60,000ms (1 minute). */
        staleTime: 1000 * 60,

        /**
         * Provides placeholder data while the query is loading.
         *
         * @param previousData - The previous cached data (if any).
         * @returns The previous data, or undefined if none exists.
         */
        placeholderData: (previousData: TData | undefined) => previousData,
    };
}
