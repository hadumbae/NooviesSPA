/**
 * @file FetchQueryTypes.ts
 *
 * Shared query parameter type definitions for React Query hooks.
 *
 * These types standardize:
 * - Pagination inputs
 * - ID- and slug-based fetches
 * - Query option passthrough
 * - Request configuration overrides
 */

import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Parameters for paginated queries with optional filters and query options.
 */
export type PaginatedQueryParams<TOptions, TData = unknown> =
    PaginationValues & {
    /** Optional query filters or parameters. */
    queries?: TOptions;
    /** Optional request configuration overrides. */
    config?: RequestOptions;
    /** Optional React Query behavior overrides. */
    options?: UseQueryOptions<TData>;
};

/**
 * Parameters for fetching a single resource by ID.
 */
export type IDQueryParams<TData = unknown> = {
    /** Resource identifier. */
    _id: ObjectId;
    /** Request configuration without pagination controls. */
    config?: Omit<RequestOptions, "limit">;
    /** Optional React Query behavior overrides. */
    options?: UseQueryOptions<TData>;
};

/**
 * Parameters for fetching a single resource by slug.
 */
export type SlugQueryParams<TData = unknown> = {
    /** Resource slug identifier. */
    slug: string;
    /** Request configuration without pagination controls. */
    config?: Omit<RequestOptions, "limit">;
    /** Optional React Query behavior overrides. */
    options?: UseQueryOptions<TData>;
};

/**
 * Parameters for list queries without pagination requirements.
 */
export type OptionQueryParams<TOptions, TData = unknown> = {
    /** Optional query filters or parameters. */
    queries?: TOptions;
    /** Optional request configuration overrides. */
    config?: RequestOptions;
    /** Optional React Query behavior overrides. */
    options?: UseQueryOptions<TData>;
};
