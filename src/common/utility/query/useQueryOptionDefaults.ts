import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";

/**
 * @file useQueryOptionDefaults.ts
 *
 * @summary
 * Provides default configuration for React Query queries.
 *
 * @description
 * Returns a baseline set of options intended to be spread into `useQuery`,
 * with sensible defaults for caching and refetch behavior.
 *
 * Defaults:
 * - `enabled`: `true`
 * - `staleTime`: `60_000` ms
 * - `placeholderData`: reuse previous cached data
 *
 * @template TData
 * Type of data returned by the query.
 *
 * @example
 * ```ts
 * const queryOptions = useQueryOptionDefaults<User>({
 *   enabled: !!id,
 * });
 *
 * const { data } = useQuery({
 *   queryKey: ["user", id],
 *   queryFn: fetchUser,
 *   ...queryOptions,
 * });
 * ```
 */
export default function useQueryOptionDefaults<TData = unknown>(
    values?: UseQueryOptions<TData>
): UseQueryOptions<TData> {
    return {
        /**
         * Enable automatic execution of the query.
         */
        enabled: true,

        /**
         * Duration (in milliseconds) for which data is considered fresh.
         */
        staleTime: 60_000,

        /**
         * Reuse previous data while a new query is loading.
         */
        placeholderData: (previousData: TData | undefined) => previousData,

        /**
         * Consumer-provided options.
         */
        ...values,
    };
}
