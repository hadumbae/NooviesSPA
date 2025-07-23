import {UseQueryResult} from "@tanstack/react-query";
import {ZodTypeAny} from "zod";

/**
 * Parameters for validating the result of a React Query against a Zod schema.
 *
 * This type defines the shape of the object passed to a `validateQuery` function.
 *
 * @template TData - The type of data returned by the query.
 * @template TError - The type of error returned by the query. Must extend {@link Error}.
 * @template TSchema - The Zod schema type used for validation.
 */
export type ValidateQueryParams<
    TData = unknown,
    TError extends Error = Error,
    TSchema extends ZodTypeAny = ZodTypeAny
> = {
    /**
     * The query result returned from a React Query hook (e.g., `useQuery`).
     * This object includes the query state, fetched data, and potential error.
     */
    query: UseQueryResult<TData, TError>;

    /**
     * The Zod schema to validate the fetched data against.
     * If the data does not match the schema, it is considered invalid.
     */
    schema: TSchema;

    /**
     * Optional custom error message to include in the validation error if
     * the data does not pass the schema check.
     */
    message?: string;
};