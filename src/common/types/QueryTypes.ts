/**
 * @fileoverview Configuration types for data fetching operations involving pagination, validation, and filtering.
 */

import {PaginationValues} from "@/common/features/fetch-pagination-search-params";
import {ZodType, ZodTypeDef} from "zod";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";

/** Base configuration for individual data queries requiring schema validation. */
export type QueryConfig<TData = unknown> = {
    schema: ZodType<TData, ZodTypeDef, unknown>
    config?: RequestOptions;
    options?: FetchQueryOptions<TData>;
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