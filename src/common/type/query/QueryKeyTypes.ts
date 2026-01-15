import { RequestOptions } from "@/common/type/request/RequestOptions.ts";
import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Parameters for building a query key targeting a single document by `_id`.
 *
 * Extends {@link RequestOptions} while explicitly disallowing `limit`,
 * since ID-based queries always return a single document.
 */
export type QueryKeyByIDParams =
    Omit<RequestOptions, "limit"> & { _id?: ObjectId };

/**
 * Parameters for building a query key targeting a single document by `slug`.
 *
 * Extends {@link RequestOptions} while explicitly disallowing `limit`,
 * since slug-based queries are expected to be unique.
 */
export type QueryKeyBySlugParams =
    Omit<RequestOptions, "limit"> & { slug?: string };

/**
 * Parameters for building a query key from arbitrary query options.
 *
 * Combines domain-specific query options with shared {@link RequestOptions},
 * enabling consistent cache key generation for list and filtered queries.
 *
 * @template TQueryOptions - Domain-specific query option shape.
 */
export type QueryKeyByOptionsParams<
    TQueryOptions = Record<string, unknown>
> = TQueryOptions & RequestOptions;
