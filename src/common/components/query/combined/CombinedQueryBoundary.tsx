import {ComponentType, ReactNode} from 'react';
import {UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";

/**
 * Props for the {@link CombinedQueryBoundary} component.
 *
 * @typeParam TData - The type of aggregated data returned to `children`.
 * By default, it will be an array of the `.data` values from all queries.
 */
type CombinedQueryBoundaryProps<TData = unknown> = {
    /**
     * The content to render once all queries succeed.
     * - Can be a static React node.
     * - Or a render function that receives aggregated query data (usually an array of results).
     */
    children: ReactNode | ((data: TData) => ReactNode);

    /**
     * An array of `UseQueryResult` instances from `@tanstack/react-query`.
     * The component will:
     * - Render a loader if any query is pending.
     * - Render an error if any query fails.
     * - Pass aggregated `data` to children when all queries succeed.
     */
    queries: UseQueryResult<unknown, HttpResponseError>[];

    /**
     * Whether to display the loader when background refetching (`isFetching`) is in progress.
     * Defaults to `false`.
     */
    loaderOnFetch?: boolean;

    /**
     * Custom loader component to render during loading states.
     * Defaults to {@link PageLoader}.
     */
    loaderComponent?: ComponentType;

    /**
     * Custom error component to render if any query encounters an error.
     * Defaults to {@link PageHTTPError}.
     *
     * Receives the first encountered error object.
     */
    errorComponent?: ComponentType<{ error?: Error | null; message?: string }>;
};

/**
 * A boundary component for handling multiple queries using React Query.
 *
 * This component:
 * - Displays a loader while any query is loading (or fetching, if `loaderOnFetch` is `true`).
 * - Displays an error component if any query fails.
 * - Passes aggregated results (`queries.map(q => q.data)`) to its children when all succeed.
 *
 * @typeParam TData - The aggregated type of query results passed to `children`.
 *
 * @example
 * ```tsx
 * const query1 = useQuery(...);
 * const query2 = useQuery(...);
 *
 * <CombinedQueryBoundary queries={[query1, query2]} loaderOnFetch>
 *   {([data1, data2]) => (
 *     <MyComponent data1={data1} data2={data2} />
 *   )}
 * </CombinedQueryBoundary>
 * ```
 */
const CombinedQueryBoundary = (params: CombinedQueryBoundaryProps) => {
    const {
        children,
        queries,
        loaderOnFetch = false,
        loaderComponent: Loader = PageLoader,
        errorComponent: ErrorComponent = PageHTTPError,
    } = params;

    const hasNoData = queries.some(q => !q.data);
    const isPending = queries.some((q) => q.isPending);
    const isFetching = queries.some((q) => q.isFetching);
    const isError = queries.some((q) => q.isError);
    const error = queries.find((q) => q.error)?.error ?? null;

    if (isPending || (loaderOnFetch && isFetching && hasNoData)) {
        console.log("Page is loading...")
        return <Loader/>;
    }

    if (isError) {
        console.log("An Error Occurred.");
        return <ErrorComponent error={error}/>;
    }

    const data = queries.map(q => q.data);

    return (
        <>
            {typeof children === "function" ? children(data) : children}
        </>
    );
};

export default CombinedQueryBoundary;
