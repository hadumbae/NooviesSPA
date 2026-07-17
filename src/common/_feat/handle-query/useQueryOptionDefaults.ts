/**
 * @fileoverview Provides default configuration for TanStack Query fetch options.
 */

import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {keepPreviousData} from "@tanstack/react-query";

/** Merges provided query options with application-wide defaults. */
export function useQueryOptionDefaults<TData = unknown>(
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