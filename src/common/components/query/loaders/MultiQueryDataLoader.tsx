/**
 * @file MultiQueryDataLoader.tsx
 * @description
 * Coordinates multiple React Query results, validates their data with Zod,
 * and renders children only once all queries are ready and valid.
 *
 * - Displays a loader while queries are pending or fetching without data
 * - Throws on query or validation errors (for error boundaries)
 * - Provides fully validated, typed data to children
 */
import {ComponentType, ReactNode} from "react";
import {MultiQueryData, QueryDefinition} from "@/common/type/query/loader/MultiQuery.types.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import validateQuery from "@/common/hooks/validation/validate-query/validateQuery.ts";
import {z} from "zod";

/**
 * Props for {@link MultiQueryDataLoader}.
 *
 * @template TQueries - Tuple of query definitions
 */
type LoaderProps<TQueries extends QueryDefinition[]> = {
    /** Render prop receiving validated query data */
    children: (data: MultiQueryData<TQueries>) => ReactNode;
    /** Query definitions to coordinate and validate */
    queries: QueryDefinition[];
    /** Optional loader component override */
    loaderComponent?: ComponentType<{className?: string}>;
    /** Optional class name applied to the loader */
    loaderClassName?: string;
};

/**
 * Orchestrates multiple queries and exposes validated data to children.
 *
 * @template TQueries - Tuple of query definitions
 * @param props - {@link LoaderProps}
 * @returns Loader, throws an error, or renders children with validated data
 */
const MultiQueryDataLoader = <
    TQueries extends QueryDefinition[] = QueryDefinition[]
>(props: LoaderProps<TQueries>) => {
    const {
        children,
        queries,
        loaderComponent: Loader = PageLoader,
        loaderClassName,
    } = props;

    // --- QUERY SETUP ---

    const hasNoData = queries.some(({query}) => !query.data);
    const isPending = queries.some(({query}) => query.isPending);
    const isFetching = queries.some(({query}) => query.isFetching);
    const isError = queries.some(({query}) => query.isError);
    const error = queries.find(({query}) => query.error)?.query.error ?? null;

    // --- LOADING ---

    if (isPending || (isFetching && hasNoData)) {
        return <Loader className={loaderClassName}/>;
    }

    if (isError) {
        throw error;
    }

    // --- VALIDATION ---

    const parsedData = {} as MultiQueryData<TQueries>;

    for (const {key, query, schema} of queries) {
        const dataKey = key as keyof MultiQueryData<TQueries>;
        const {success, error, data} = validateQuery({query, schema});

        if (!success) {
            throw error;
        }

        parsedData[dataKey] = data as z.infer<typeof schema>;
    }

    // --- RENDER ---

    return (
        children(parsedData)
    );
};

export default MultiQueryDataLoader;
