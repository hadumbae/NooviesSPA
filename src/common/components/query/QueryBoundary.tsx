import {ComponentType, ReactNode} from 'react';
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import {UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Props for the {@link QueryBoundary} component.
 *
 * @typeParam TData - The type of data returned by the query.
 */
type QueryBoundaryProps<TData = unknown> = {
    /**
     * The children to render when the query is successful.
     * - Can be a React node or a render function that receives the query `data`.
     */
    children: ReactNode | ((data: TData) => ReactNode);

    /**
     * The `UseQueryResult` instance returned from `@tanstack/react-query`.
     * Provides query state (`data`, `isPending`, `isFetching`, `isError`, etc.).
     */
    query: UseQueryResult<TData, HttpResponseError>;

    /**
     * Whether to show the loader while a background fetch is happening (`isFetching`).
     * Defaults to `false`.
     */
    loaderOnFetch?: boolean;

    /**
     * Custom loader component to render when the query is loading.
     * Defaults to {@link PageLoader}.
     */
    loaderComponent?: ComponentType;

    /**
     * Custom error component to render when the query encounters an error.
     * Defaults to {@link PageHTTPError}.
     *
     * The component receives an `error` object and an optional `message`.
     */
    errorComponent?: ComponentType<{ error?: Error | null; message?: string }>;
};

/**
 * A boundary component for handling loading, error, and success states of a React Query request.
 *
 * This component:
 * - Renders a loader while the query is pending (and optionally while fetching).
 * - Renders an error component if the query fails.
 * - Renders children when the query succeeds (children may be a render function or static content).
 *
 * @typeParam TData - The type of data returned by the query.
 *
 * @example
 * ```tsx
 * <QueryBoundary query={useQuery(...)} loaderOnFetch>
 *   {data => <MyComponent data={data} />}
 * </QueryBoundary>
 * ```
 */
const QueryBoundary = <TData = unknown>(params: QueryBoundaryProps<TData>) => {
    const {
        children,
        query: {data, isPending, isFetching, isError, error},
        loaderOnFetch = false,
        loaderComponent: Loader = PageLoader,
        errorComponent: ErrorComponent = PageHTTPError,
    } = params;

    if (isPending || (loaderOnFetch && isFetching && !data)) {
        console.log("Page is loading...")
        return <Loader/>;
    }

    if (isError) {
        console.log("An Error Occurred.");
        return <ErrorComponent error={error}/>;
    }

    return (typeof children === "function" ? children(data!) : children);
};

export default QueryBoundary;
