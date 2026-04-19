/**
 * @fileoverview Configuration options for useQuery hooks.
 * Defines a subset of TanStack Query options to maintain consistent cache behavior,
 * execution control, and error handling across the application.
 */

import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import type {UseQueryOptions as QueryOptions} from "@tanstack/react-query";

/**
 * Filtered subset of React Query configuration options.
 */
export type FetchQueryOptions<TData, TError = HttpResponseError> = Pick<QueryOptions<TData, TError>,
    | "enabled"
    | "staleTime"
    | "initialData"
    | "placeholderData"
    | "throwOnError"
>;