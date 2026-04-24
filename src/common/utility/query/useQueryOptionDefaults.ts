/**
 * @fileoverview Baseline configuration for TanStack Query execution.
 * Enforces consistent defaults for caching, UI transitions, and error handling
 * while allowing for seamless consumer-provided overrides.
 */

import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {keepPreviousData} from "@tanstack/react-query";

/**
 * Merges standardized query defaults with optional consumer overrides.
 */
export default function useQueryOptionDefaults<TData = unknown>(
    values?: FetchQueryOptions<TData>
): FetchQueryOptions<TData> {
    return {
        enabled: true,
        staleTime: 60_000,
        placeholderData: keepPreviousData,
        throwOnError: true,
        ...values,
    };
}