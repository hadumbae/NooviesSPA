import {UseQueryResult} from "@tanstack/react-query";
import {z, ZodTypeAny} from "zod";
import validateQuery from "@/common/hooks/validation/validate-query/validateQuery.ts";
import {ComponentType, ReactNode} from "react";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import {ParseError} from "@/common/errors/ParseError.ts";

/**
 * Props for {@link ValidatedQueryBoundary}.
 *
 * @template TSchema - The Zod schema type used to validate the query's data.
 */
export type ValidatedQueryBoundaryProps<TSchema extends ZodTypeAny = ZodTypeAny> = {
    /**
     * Render function that receives validated data.
     * Will only be called if validation succeeds.
     *
     * @param data - The validated data, typed according to the provided schema.
     * @returns A ReactNode to render.
     */
    children: (data: z.infer<TSchema>) => ReactNode;

    /**
     * The query result object from `useQuery` or a similar hook.
     * Its `data` will be validated against the provided schema.
     */
    query: UseQueryResult;

    /**
     * The Zod schema to validate the query's `data` against.
     * Validation will ensure data matches the expected structure before rendering children.
     */
    schema: TSchema;

    /**
     * Optional custom error message shown if validation fails.
     * Defaults to a generic "Invalid Data." message.
     */
    message?: string;

    /**
     * If `true`, the loader will be displayed during background refetching
     * when there is no existing data yet.
     * Defaults to `false`.
     */
    loaderOnFetch?: boolean;

    /**
     * Optional loader component to display during pending states.
     * Defaults to {@link PageLoader}.
     */
    loaderComponent?: ComponentType;

    /**
     * Optional error component to display if validation fails.
     * Defaults to {@link PageParseError}.
     *
     * The component will receive:
     * - `error`: A {@link ParseError} with validation details.
     * - `message`: An optional message passed from props.
     */
    errorComponent?: ComponentType<{ error: ParseError; message?: string }>;
};

/**
 * A boundary component that validates a React Query's result against a Zod schema
 * before rendering its children.
 *
 * This component:
 * - Shows a loader while the query is pending (and optionally during background fetch).
 * - Validates query data using the provided Zod schema.
 * - Shows an error component if validation fails.
 * - Renders its children only when validation succeeds.
 *
 * @template TSchema - The Zod schema type used to validate the query's data.
 *
 * @param props - See {@link ValidatedQueryBoundaryProps}.
 *
 * @returns The loader, error component, or children depending on query state and validation result.
 *
 * @example
 * ```tsx
 * const schema = z.object({
 *   id: z.number(),
 *   name: z.string(),
 * });
 *
 * const query = useQuery(...);
 *
 * <ValidatedQueryBoundary
 *   query={query}
 *   schema={schema}
 *   message="Invalid user data"
 * >
 *   {(data) => <UserProfile user={data} />}
 * </ValidatedQueryBoundary>
 * ```
 */
const ValidatedQueryBoundary = <TSchema extends ZodTypeAny = ZodTypeAny>(
    props: ValidatedQueryBoundaryProps<TSchema>
) => {
    const {
        children,
        query,
        schema,
        message,
        loaderOnFetch = false,
        loaderComponent: Loader = PageLoader,
        errorComponent: Error = PageParseError,
    } = props;

    const {data: queryData, isPending, isFetching} = query;
    const {success, error, data} = validateQuery({query, schema, message});

    if (isPending || (loaderOnFetch && isFetching && !queryData)) {
        console.log("Data is loading...")
        return <Loader/>;
    }

    if (!success) {
        console.log("An Error Occurred. Validation failed...");
        return <Error error={error as ParseError} message={message}/>;
    }

    return (
        <>
            {children(data)}
        </>
    );
};

export default ValidatedQueryBoundary;
