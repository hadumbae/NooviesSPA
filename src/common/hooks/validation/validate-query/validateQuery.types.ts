import {UseQueryResult} from "@tanstack/react-query";
import {ZodTypeAny} from "zod";
import {ParseError} from "@/common/errors/ParseError.ts";

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

/**
 * Represents a successful validation result.
 *
 * @template TReturn - The inferred type from the provided Zod schema.
 */
type ValidQueryDataResults<TReturn> = {
    /**
     * Indicates that the validation was successful.
     */
    success: true;

    /**
     * The parsed and validated data.
     */
    data: TReturn;

    /**
     * Always `null` since there was no error.
     */
    error: null;
};

/**
 * Represents a failed validation result (i.e., schema parse error).
 */
type InvalidQueryDataResults = {
    /**
     * Indicates that validation failed.
     */
    success: false;

    /**
     * Always `null` since the data could not be parsed.
     */
    data: null;

    /**
     * The error describing why validation failed.
     */
    error: Error | ParseError;
};

/**
 * Represents a pending validation state (e.g., data is still loading).
 */
type PendingQueryDataResults = {
    /**
     * Validation has not occurred yet (e.g., data is still pending).
     */
    success: false;

    /**
     * Always `null` since validation has not run.
     */
    data: null;

    /**
     * Always `null` since there's no error yet.
     */
    error: null;
};

/**
 * The union of all possible validation result states:
 * - Validated successfully
 * - Failed validation
 * - Waiting for data (pending)
 *
 * @template TReturn - The inferred type from the provided Zod schema.
 */
export type ValidateQueryResults<TReturn> =
    | ValidQueryDataResults<TReturn>
    | InvalidQueryDataResults
    | PendingQueryDataResults;