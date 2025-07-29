import {
    CombinedQueryData,
    CombinedSchemaQuery,
    CombinedValidatedQueryBoundaryProps
} from "@/common/components/query/combined/CombinedValidatedQueryBoundary.types.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import validateQuery from "@/common/hooks/validation/validate-query/validateQuery.ts";
import {ParseError} from "@/common/errors/ParseError.ts";
import {z} from "zod";

/**
 * A boundary component that accepts multiple React Query queries with associated Zod schemas,
 * validates their results, and only renders children when all queries have successfully loaded
 * and validated. Shows loading or error UI otherwise.
 *
 * @template TQueries - An array of CombinedSchemaQuery items describing each query, its unique key,
 * and Zod schema for validation. Used to strongly type the shape of the validated results.
 *
 * @param props - The props for the component:
 * @param props.queries - An array of queries with their keys and schemas to validate.
 * @param props.children - Render prop function receiving the combined validated data object.
 * @param props.message - Optional message to pass to the error component on validation failure.
 * @param props.loaderOnFetch - Whether to show the loader during background fetching if data exists.
 * @param props.loaderComponent - Optional custom loader component; defaults to `PageLoader`.
 * @param props.errorComponent - Optional custom error component; defaults to `PageParseError`.
 *
 * @returns ReactNode - Renders loader, error, or children with validated data depending on state.
 */
const CombinedValidatedQueryBoundary = <TQueries extends CombinedSchemaQuery[] = CombinedSchemaQuery[]>(
    props: CombinedValidatedQueryBoundaryProps<TQueries>
) => {
    const {
        children,
        queries,
        message,
        loaderOnFetch = false,
        loaderComponent: Loader = PageLoader,
        errorComponent: ErrorComponent = PageParseError,
    } = props;

    const hasData = queries.every(q => q.query.data != null);
    const isPending = queries.some(q => q.query.isPending);
    const isFetching = queries.some(q => q.query.isFetching);

    if (isPending || (loaderOnFetch && isFetching && !hasData)) {
        return <Loader/>;
    }

    let parseError: ParseError | Error | null = null;
    const parsedData = {} as CombinedQueryData<TQueries>;

    for (const {key, query, schema} of queries) {
        const dataKey = key as (keyof CombinedQueryData<TQueries>);
        const {success, error, data} = validateQuery({query, schema});

        if (!success) {
            parseError = error;
            break;
        }

        parsedData[dataKey] = data as z.infer<typeof schema>;
    }

    if (parseError) {
        return <ErrorComponent error={parseError} message={message}/>;
    }

    return children(parsedData);
};

export default CombinedValidatedQueryBoundary;
