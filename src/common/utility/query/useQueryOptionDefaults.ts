/**
 * @fileoverview Baseline configuration for TanStack Query execution.
 * Enforces consistent defaults for caching, UI transitions, and error handling
 * while allowing for seamless consumer-provided overrides.
 */

import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {keepPreviousData} from "@tanstack/react-query";

/**
 * Merges standardized query defaults with optional consumer overrides.
 */
export default function useQueryOptionDefaults<TData = unknown>(
    values?: UseQueryOptions<TData>
): UseQueryOptions<TData> {
    return {
        enabled: true,
        staleTime: 60_000,
        placeholderData: keepPreviousData,
        throwOnError: false,
        ...values,
    };
}