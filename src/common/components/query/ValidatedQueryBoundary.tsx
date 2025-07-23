import {UseQueryResult} from "@tanstack/react-query";
import {z, ZodTypeAny} from "zod";
import validateQuery from "@/common/hooks/validation/validate-query/validateQuery.ts";
import {ReactNode} from "react";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import PageLoader from "@/common/components/page/PageLoader.tsx";


/**
 * Props for {@link ValidatedQueryBoundary}.
 *
 * @template TData - Raw data type returned by the React Query.
 * @template TError - Error type returned by the React Query. Must extend {@link Error}.
 * @template TSchema - Zod schema type used for validation.
 */
export type ValidatedQueryBoundaryProps<
    TData = unknown,
    TError extends Error = Error,
    TSchema extends ZodTypeAny = ZodTypeAny
> = {
    /**
     * Render prop function called with the validated data.
     *
     * Receives data validated against the provided Zod schema.
     *
     * @param data - The validated data of type inferred from the schema.
     * @returns React nodes to render.
     */
    children: (data: z.infer<TSchema>) => ReactNode;

    /**
     * The React Query result object to validate.
     *
     * Contains query status and fetched data.
     */
    query: UseQueryResult<TData, TError>;

    /**
     * Zod schema against which to validate the query's data.
     */
    schema: TSchema;

    /**
     * Optional custom error message used if validation fails.
     */
    message?: string;
};

/**
 * React component that validates a React Query result using a Zod schema.
 *
 * Renders an error component if the query errors, is pending, or
 * if the data fails validation. Otherwise renders children with validated data.
 *
 * @template TData - Raw data type returned by the React Query.
 * @template TError - Error type returned by the React Query. Must extend {@link Error}.
 * @template TSchema - Zod schema type used for validation.
 *
 * @param props - Props containing query, schema, children render prop, and optional error message.
 *
 * @returns React node(s) representing either loading/error state or children with validated data.
 *
 * @example
 * ```tsx
 * <ValidatedQueryBoundary
 *   query={query}
 *   schema={MyZodSchema}
 *   message="Invalid data received."
 * >
 *   {(validatedData) => <DisplayComponent data={validatedData} />}
 * </ValidatedQueryBoundary>
 * ```
 */
const ValidatedQueryBoundary = <TData = unknown, TError extends Error = Error, TSchema extends ZodTypeAny = ZodTypeAny>(
    props: ValidatedQueryBoundaryProps<TData, TError, TSchema>
) => {
    const {children, query, schema, message} = props;

    const {isPending} = query;
    const {success, error, data} = validateQuery({query, schema, message});

    if (isPending) return <PageLoader/>;
    if (!success) return <PageParseError error={error} message={message}/>;

    return (
        <>
            {children(data)}
        </>
    );
};

export default ValidatedQueryBoundary;
