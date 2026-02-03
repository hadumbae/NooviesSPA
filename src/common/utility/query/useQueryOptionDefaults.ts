/**
 * @file useQueryOptionDefaults.ts
 *
 * Provides a baseline configuration for React Query `useQuery` calls.
 *
 * Intended to be spread into query options to enforce consistent defaults
 * for caching, execution, and error behavior across the application.
 *
 * Defaults:
 * - `enabled`: `true`
 * - `staleTime`: `60_000` ms
 * - `placeholderData`: reuse previous cached data
 * - `throwOnError`: `false`
 *
 * Consumer-provided values override all defaults.
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
 * const {data} = useQuery({
 *   queryKey: ["user", id],
 *   queryFn: fetchUser,
 *   ...queryOptions,
 * });
 * ```
 */

import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";

/**
 * Returns a standardized set of default query options.
 *
 * @param values - Optional consumer overrides
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
         * Reuse previous cached data while a new query is loading.
         */
        placeholderData: (previousData: TData | undefined) => previousData,

        /**
         * Disable error throwing at the query layer by default.
         */
        throwOnError: false,

        /**
         * Consumer-provided option overrides.
         */
        ...values,
    };
}
