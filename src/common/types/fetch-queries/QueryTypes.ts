/**
 * @fileoverview Configuration types for data fetching operations involving pagination, validation, and filtering.
 */

import {PaginationValues} from "@/common/features/fetch-pagination-search-params";
import {ZodType, ZodTypeDef} from "zod";
import {RequestOptions} from "src/common/type/request/RequestOptions.ts";
import {FetchQueryOptions} from "src/common/type/query/FetchQueryOptions.ts";
import {ObjectId} from "src/common/schema/strings/object-id/IDStringSchema.ts";
import {SlugString} from "src/common/schema/strings/simple-strings/SlugString.ts";

/** Base configuration for individual data queries requiring schema validation. */
export type QueryConfig<TData = unknown> = {
    schema: ZodType<TData, ZodTypeDef, unknown>
    config?: RequestOptions;
    options?: FetchQueryOptions<TData>;
};

/** Configuration for fetching a single entity by its unique identifier. */
export type IDQueryConfig<TData = unknown> = QueryConfig<TData> & {
    _id: ObjectId;
};

/** Configuration for fetching a single entity by its URL-friendly slug. */
export type SlugQueryConfig<TData = unknown> = QueryConfig<TData> & {
    slug: SlugString;
};

/** Configuration for fetching collections with optional filters. */
export type ListQueryConfig<
    TData = unknown,
    TQueries extends Record<string, unknown> = {}
> = QueryConfig<TData> & {
    queries?: TQueries;
};

/** Configuration for standardized paginated API requests. */
export type PaginatedQueryConfig<
    TData = unknown,
    TQueries extends Record<string, unknown> = {}
> = PaginationValues & ListQueryConfig<TData, TQueries>;