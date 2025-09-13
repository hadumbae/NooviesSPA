import { ManagedUseQuery } from "@/common/type/query/ManagedUseQuery.ts";
import { ZodTypeAny } from "zod";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import { UseQueryResult } from "@tanstack/react-query";

/**
 * The return type of `activeUseQueriesOnly`, representing the filtered active queries.
 *
 * @template TSchema - The Zod schema type used to validate the query data.
 * @template TData - The type of data returned by each query.
 * @template TError - The type of error returned by each query (default is HttpResponseError).
 *
 * @property queries - An array of `UseQueryResult`s for the queries that are enabled.
 * @property validationQueries - An array of objects containing metadata for validation:
 *   - `key`: the unique identifier of the query
 *   - `query`: the `UseQueryResult` of the query
 *   - `schema`: the Zod schema associated with the query
 */
export type ActiveUseQueryReturns<
    TSchema extends ZodTypeAny = ZodTypeAny,
    TData = unknown,
    TError = HttpResponseError
> = {
    queries: UseQueryResult<TData, TError>[];
    validationQueries: {
        key: string;
        query: UseQueryResult<TData, TError>;
        schema: TSchema;
    }[];
};

/**
 * Filters an array of `ManagedUseQuery` objects to only include the enabled queries.
 *
 * This function separates the raw `UseQueryResult`s from the validation metadata,
 * making it easy to work with active queries and their associated schemas.
 *
 * @template TSchema - The Zod schema type used to validate the query data.
 * @template TData - The type of data returned by each query.
 * @template TError - The type of error returned by each query (default is HttpResponseError).
 *
 * @param queries - Array of `ManagedUseQuery` objects containing `enabled`, `key`, `schema`, and `query`.
 * @returns An object containing:
 *   - `queries`: array of `UseQueryResult`s for the enabled queries.
 *   - `validationQueries`: array of `{ key, query, schema }` objects for schema validation.
 *
 * @example
 * ```ts
 * const allQueries: ManagedUseQuery[] = [
 *   { key: "movies", schema: MovieArraySchema, enabled: true, query: movieQuery },
 *   { key: "persons", schema: PersonArraySchema, enabled: false, query: personQuery },
 * ];
 *
 * const { queries, validationQueries } = activeUseQueriesOnly(allQueries);
 * // queries will only include movieQuery
 * // validationQueries will only include the movie metadata
 * ```
 */
export default function activeUseQueriesOnly<
    TSchema extends ZodTypeAny = ZodTypeAny,
    TData = unknown,
    TError = HttpResponseError
>(
    queries: ManagedUseQuery<TSchema, TData, TError>[]
): ActiveUseQueryReturns<TSchema, TData, TError> {
    const activeManagedQueries = queries.filter(q => q.enabled);

    const activeQueries = activeManagedQueries.map(q => q.query);
    const activeValidationQueries = activeManagedQueries.map(({ key, query, schema }) => ({ key, query, schema }));

    return {
        queries: activeQueries,
        validationQueries: activeValidationQueries
    };
}
