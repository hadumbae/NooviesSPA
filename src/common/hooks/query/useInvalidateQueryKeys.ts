/**
 * @file useInvalidateQueryKeys.ts
 *
 * React hook that returns an async callback for invalidating one or more
 * TanStack Query cache entries.
 *
 * Supports single or multiple `QueryKey` values, optional exact matching,
 * and forwarded `InvalidateOptions`.
 */

import {InvalidateOptions, QueryKey, useQueryClient} from "@tanstack/react-query";

/**
 * Hook parameters for {@link useInvalidateQueryKeys}.
 */
type KeyParams = {
    /**
     * A single query key or an array of query keys to invalidate.
     */
    keys: QueryKey | QueryKey[];

    /**
     * Whether to invalidate only queries with an exact key match.
     * Defaults to `false` (partial matching allowed).
     */
    exact?: boolean;

    /**
     * Additional options forwarded to `invalidateQueries`.
     */
    options?: InvalidateOptions;
};

/**
 * Creates an async invalidation function for one or more React Query keys.
 *
 * @param params - Invalidation configuration.
 * @returns An async function that invalidates the specified query keys.
 *
 * @example
 * const invalidateTheatres = useInvalidateQueryKeys({
 *   keys: ["fetch_theatres_by_query"],
 * });
 *
 * await invalidateTheatres();
 */
export default function useInvalidateQueryKeys({keys, options, exact = false}: KeyParams): () => void {
    const queryClient = useQueryClient();

    const queryKeys = Array.isArray(keys) ? keys : [keys];

    return async () => {
        if (queryKeys.length === 0) return;

        await Promise.all(
            queryKeys.map((queryKey) => queryClient.invalidateQueries({queryKey, exact}, options))
        );
    };
}