/**
 * @file QueryDefinition.types.ts
 * @description
 * Shared type utilities for strongly-typed React Query results
 * validated with Zod schemas.
 */
import {z, ZodTypeAny} from "zod";
import {UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Defines a single typed query with an associated Zod schema.
 *
 * @template TKey - Unique query key identifier
 * @template TData - Raw query response data
 * @template TSchema - Zod schema used to validate the query data
 */
export type QueryDefinition<
    TKey extends string = string,
    TData = unknown,
    TSchema extends ZodTypeAny = ZodTypeAny
> = {
    /** Unique query key */
    key: TKey;
    /** React Query result object */
    query: UseQueryResult<TData, HttpResponseError>;
    /** Zod schema for runtime validation */
    schema: TSchema;
};

/**
 * Maps a set of {@link QueryDefinition} entries to validated data types.
 *
 * The resulting object keys are derived from each query's `key`,
 * and values are inferred from the corresponding Zod schema.
 *
 * @template TQueries - Tuple of query definitions
 */
export type MultiQueryData<TQueries extends QueryDefinition[] = QueryDefinition[]> = {
    [K in TQueries[number] as K["key"]]: z.infer<K["schema"]>;
};
