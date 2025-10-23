import {ZodTypeAny} from "zod";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {UseQueryResult} from "@tanstack/react-query";

/**
 * Represents a React Query result along with metadata for management and validation.
 * Typically used when filtering between enabled and disabled queries.
 *
 * @template TSchema - The Zod schema type used to validate the query data.
 * @template TData - The type of data returned by the query.
 * @template TError - The type of error returned by the query (default is HttpResponseError).
 *
 * @property enabled - Whether the query is currently enabled and should be executed.
 * @property key - A unique key identifying this query, used for caching and reference.
 * @property schema - A Zod schema to validate the query result.
 * @property query - The actual `UseQueryResult` returned by React Query.
 */
export type ManagedUseQuery<
    TSchema extends ZodTypeAny = ZodTypeAny,
    TData = unknown,
    TError = HttpResponseError
> = {
    enabled: boolean;
    key: string;
    schema: TSchema;
    query: UseQueryResult<TData, TError>;
};