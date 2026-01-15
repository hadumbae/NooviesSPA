/**
 * @file useInvalidateQueryKeys.ts
 *
 * React hook that returns an async helper for invalidating one or more
 * TanStack Query cache entries.
 *
 * Designed for post-mutation cache synchronization.
 */

import {
    InvalidateOptions,
    InvalidateQueryFilters,
    QueryKey,
    useQueryClient,
} from "@tanstack/react-query";

/**
 * Accepted query key input.
 *
 * - Single `QueryKey`
 * - Array of `QueryKey` values
 */
type HookKeys = QueryKey | QueryKey[];

/**
 * **useInvalidateQueryKeys**
 *
 * Returns an async function that invalidates one or more query keys.
 *
 * Supports:
 * - Single or multiple query keys
 * - Additional {@link InvalidateQueryFilters} (excluding `queryKey`)
 * - Forwarded {@link InvalidateOptions}
 *
 * Empty key arrays are safely ignored.
 *
 * @returns Async cache invalidation function.
 *
 * @example
 * ```ts
 * const invalidateGenres = useInvalidateQueryKeys();
 *
 * await invalidateGenres(["genres"]);
 * ```
 *
 * @example
 * ```ts
 * await invalidateGenres(
 *   [["genres", "list"], ["genres", "_id"]],
 *   { exact: true }
 * );
 * ```
 */
export default function useInvalidateQueryKeys(): (
    keys: HookKeys,
    filters?: Omit<InvalidateQueryFilters, "queryKey">,
    options?: InvalidateOptions
) => Promise<void> {
    const queryClient = useQueryClient();

    return async (
        keys: HookKeys,
        filters?: Omit<InvalidateQueryFilters, "queryKey">,
        options?: InvalidateOptions
    ) => {
        if (Array.isArray(keys) && keys.length === 0) return;

        const queryKeys = Array.isArray(keys[0]) ? keys : [keys];

        await Promise.all(
            queryKeys.map((queryKey) =>
                queryClient.invalidateQueries(
                    { queryKey, ...filters },
                    options
                )
            )
        );
    };
}
