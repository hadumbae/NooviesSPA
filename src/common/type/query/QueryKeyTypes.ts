/**
 * @file QueryKeyTypes.ts
 *
 * Shared type utilities for constructing stable TanStack Query keys.
 *
 * These types standardize how query parameters are combined into cache keys
 * across single-entity, filtered, and paginated queries.
 */

import { RequestOptions } from "@/common/type/request/RequestOptions.ts";
import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { PaginationValues } from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";

/**
 * Parameters for building a query key targeting a single document by `_id`.
 *
 * @remarks
 * Extends {@link RequestOptions} while explicitly omitting `limit`,
 * since ID-based queries always return a single entity.
 */
export type QueryKeyByIDParams =
    Omit<RequestOptions, "limit"> & {
    /** Optional document identifier */
    _id?: ObjectId;
};

/**
 * Parameters for building a query key targeting a single document by `slug`.
 *
 * @remarks
 * Extends {@link RequestOptions} while explicitly omitting `limit`,
 * since slug-based queries are expected to resolve to a single entity.
 */
export type QueryKeyBySlugParams =
    Omit<RequestOptions, "limit"> & {
    /** Optional unique slug */
    slug?: string;
};

/**
 * Parameters for building a query key from arbitrary query options.
 *
 * @remarks
 * Combines domain-specific filters with shared {@link RequestOptions},
 * enabling consistent cache key generation for filtered list queries.
 *
 * @template TQueryOptions - Domain-specific query option shape.
 */
export type QueryKeyByOptionsParams<
    TQueryOptions = Record<string, unknown>
> = TQueryOptions & RequestOptions;

/**
 * Parameters for building a paginated query key.
 *
 * @remarks
 * Combines pagination state, domain-specific filters, and shared
 * {@link RequestOptions} into a single cache key structure.
 *
 * @template TQueryOptions - Domain-specific query option shape.
 */
export type QueryKeyByPaginationParams<
    TQueryOptions = Record<string, unknown>
> = PaginationValues & TQueryOptions & RequestOptions;
