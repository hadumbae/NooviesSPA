import {z, ZodTypeAny} from "zod";
import {UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {ComponentType, ReactNode} from "react";

/**
 * Represents a single query with an associated Zod schema
 * for validating its result.
 *
 * @template TKey - The unique string key identifying this query in the result object.
 * @template TData - The raw data type returned by the query before validation.
 * @template TSchema - The Zod schema type used to validate the query result.
 */
export type CombinedSchemaQuery<
    TKey extends string = string,
    TData = unknown,
    TSchema extends ZodTypeAny = ZodTypeAny
> = {
    /** A unique key that will be used as the property name in the validated results object. */
    key: TKey;

    /** The TanStack Query result object that contains the query's status and data. */
    query: UseQueryResult<TData, HttpResponseError>;

    /** The Zod schema that will validate and parse the query's data. */
    schema: TSchema;
};

/**
 * Infers the combined validated data object from a list of `CombinedSchemaQuery` definitions.
 * The resulting type maps each query's `key` to its schema's inferred TypeScript type.
 *
 * @template TQueries - A tuple or array of `CombinedSchemaQuery` definitions.
 *
 * @example
 * type Queries = [
 *   CombinedSchemaQuery<'user', UserResponse, typeof userSchema>,
 *   CombinedSchemaQuery<'posts', PostsResponse, typeof postsSchema>
 * ];
 *
 * type Data = ChildrenData<Queries>;
 * // Data: { user: User; posts: Post[] }
 */
export type CombinedQueryData<TQueries extends CombinedSchemaQuery[] = CombinedSchemaQuery[]> = {
    [K in TQueries[number] as K["key"]]: z.infer<K["schema"]>;
}

/**
 * Props for a component that validates multiple queries with Zod
 * before rendering children.
 *
 * The boundary component will:
 * - Execute all queries in `queries`
 * - Validate their data using the provided Zod schemas
 * - Render a loader, an error component, or the children function depending on query state
 *
 * @template TQueries - A tuple or array of `CombinedSchemaQuery` objects.
 */
export type CombinedValidatedQueryBoundaryProps<
    TQueries extends CombinedSchemaQuery[] = CombinedSchemaQuery[]
> = {
    /**
     * Render function that receives the combined validated data as an object keyed
     * by each query's `key`.
     */
    children: (data: CombinedQueryData<TQueries>) => ReactNode;

    /** An array of queries to execute and validate. */
    queries: TQueries;

    /** Optional message to display in the error component. */
    message?: string;

    /** If true, shows the loader component while any query is still fetching. */
    loaderOnFetch?: boolean;

    /** Optional custom component to render while loading. */
    loaderComponent?: ComponentType<{ className?: string }>;

    /** Optional className for the loader component. */
    loaderClassName?: string;

    /** Optional custom component to render when an error occurs. */
    errorComponent?: ComponentType<{ error: Error | null; message?: string; className?: string }>;


    /** Optional className for the error component. */
    errorClassName?: string;
};