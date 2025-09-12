import {ComponentType, ReactNode} from 'react';
import {UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";

/**
 * Props for the {@link CombinedQueryBoundary} component.
 *
 * This component aggregates multiple TanStack Query results and handles:
 * - Displaying a loader while queries are pending,
 * - Showing an error component if any query fails,
 * - Passing the combined query data to children once all queries succeed.
 *
 * @typeParam TData - The type of aggregated data returned to `children`.
 * By default, it is inferred as an array of `.data` values from all queries.
 */
type CombinedQueryBoundaryProps<TData = unknown> = {
    /**
     * Content to render once all queries succeed.
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
     * If true, displays the loader during background refetching (`isFetching`).
     * Defaults to `false`.
     */
    loaderOnFetch?: boolean;

    /**
     * Custom loader component to render while queries are loading.
     * Defaults to {@link PageLoader}.
     *
     * The component receives an optional `className` prop that can be used
     * for styling.
     */
    loaderComponent?: ComponentType<{ className?: string }>;

    /** Optional className applied to the loader component. */
    loaderClassName?: string;

    /**
     * Custom error component to render if any query encounters an error.
     * Defaults to {@link PageHTTPError}.
     *
     * Receives the first encountered error object via `error` prop.
     */
    errorComponent?: ComponentType<{
        error?: Error | null;
        message?: string;
        className?: string;
    }>;

    /** Optional className applied to the error component. */
    errorClassName?: string;
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
        loaderClassName,
        errorComponent: ErrorComponent = PageHTTPError,
        errorClassName,
    } = params;

    const hasNoData = queries.some(q => !q.data);
    const isPending = queries.some((q) => q.isPending);
    const isFetching = queries.some((q) => q.isFetching);
    const isError = queries.some((q) => q.isError);
    const error = queries.find((q) => q.error)?.error ?? null;

    if (isPending || (loaderOnFetch && isFetching && hasNoData)) {
        console.log("Page is loading...")
        return <Loader className={loaderClassName}/>;
    }

    if (isError) {
        console.log("An Error Occurred.");
        return <ErrorComponent error={error} className={errorClassName}/>;
    }

    const data = queries.map(q => q.data);

    return (
        <>
            {typeof children === "function" ? children(data) : children}
        </>
    );
};

export default CombinedQueryBoundary;
