import {ComponentType, ReactNode} from 'react';
import PageLoader from "@/common/components/page/PageLoader.tsx";
import {UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {z, ZodTypeAny} from "zod";
import {ParseError} from "@/common/errors/ParseError.ts";

/**
 * Props for {@link ValidatedDataLoader}.
 *
 * @template TData - Raw data type returned by the query.
 * @template TSchema - Zod schema used to validate the query result.
 */
type LoaderProps<
    TData = unknown,
    TSchema extends ZodTypeAny = ZodTypeAny
> = {
    /**
     * Render-prop function that receives validated query data.
     */
    children: (data: z.infer<TSchema>) => ReactNode;

    /**
     * React Query result object.
     */
    query: UseQueryResult<TData, HttpResponseError>;

    /**
     * Zod schema used to validate the query result.
     */
    schema: TSchema;

    /**
     * Optional loader component displayed while the query is pending or fetching.
     *
     * @default PageLoader
     */
    loaderComponent?: ComponentType;
};

/**
 * Query boundary component that handles:
 * - Loading state
 * - Error propagation
 * - Runtime data validation via Zod
 *
 * Throws:
 * - {@link HttpResponseError} when the query fails
 * - {@link ParseError} when returned data does not match the schema
 *
 * @template TData - Raw data type returned by the query.
 *
 * @example
 * ```tsx
 * <QueryBoundary
 *   query={query}
 *   schema={MovieSchema}
 * >
 *   {(movie) => <MovieDetails movie={movie} />}
 * </QueryBoundary>
 * ```
 */
const ValidatedDataLoader = <TData = unknown>(params: LoaderProps<TData>) => {
    const {
        children,
        schema,
        query: {data, isPending, isFetching, isError, error},
        loaderComponent: Loader = PageLoader,
    } = params;

    if (isPending || (isFetching && !data)) return <Loader/>;
    if (isError) throw error;

    const {data: parsedData, error: parseError, success} = schema.safeParse(data);

    if (!success) {
        throw new ParseError({
            message: "Error in query. Failed to fetch data.",
            errors: parseError.errors,
        });
    }

    return <>
        {children(parsedData)}
    </>;
};

export default ValidatedDataLoader;
