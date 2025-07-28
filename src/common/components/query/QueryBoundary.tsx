import {ComponentType, ReactNode} from 'react';
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import {UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Props for the {@link QueryBoundary} component.
 *
 * @template TData - Type of the query's `data` property.
 */
type QueryBoundaryProps<TData = unknown> = {
    /**
     * Content to render when the query succeeds.
     * Can be:
     * - A React node, or
     * - A render function receiving the query's `data`.
     *
     * @example
     * ```tsx
     * <QueryBoundary query={query}>
     *   {(data) => <UserProfile user={data} />}
     * </QueryBoundary>
     * ```
     */
    children: ReactNode | ((data: TData) => ReactNode);

    /**
     * The query result from `useQuery` or similar hook.
     * The error type is expected to be {@link HttpResponseError}.
     */
    query: UseQueryResult<TData, HttpResponseError>;

    /**
     * If `true`, shows the loader during background refetching
     * when no data is currently available.
     * Defaults to `false`.
     */
    loaderOnFetch?: boolean;

    /**
     * Optional custom loader component.
     * Defaults to {@link PageLoader}.
     */
    loaderComponent?: ComponentType;

    /**
     * Optional custom error component.
     * Defaults to {@link PageHTTPError}.
     *
     * The component will receive:
     * - `error`: The {@link HttpResponseError} instance.
     * - `message`: An optional error message.
     */
    errorComponent?: ComponentType<{ error: HttpResponseError; message?: string }>;
};

/**
 * A boundary component for handling loading and error states of a React Query.
 *
 * This component:
 * - Shows a loader while the query is pending (and optionally during background fetch).
 * - Renders an error component if the query fails.
 * - Renders children when the query succeeds.
 *
 * @template TData - Type of the query's `data` property.
 *
 * @param params - See {@link QueryBoundaryProps}.
 *
 * @returns Loader, error component, or children based on the query's status.
 *
 * @example
 * ```tsx
 * const query = useQuery(...);
 *
 * <QueryBoundary query={query} loaderOnFetch>
 *   {(data) => <UserProfile user={data} />}
 * </QueryBoundary>
 * ```
 */
const QueryBoundary = <TData = unknown>(
    params: QueryBoundaryProps<TData>
) => {
    const {
        children,
        query: {data, isPending, isFetching, isError, error},
        loaderOnFetch = false,
        loaderComponent: Loader = PageLoader,
        errorComponent: Error = PageHTTPError
    } = params;

    if (isPending || (loaderOnFetch && isFetching && !data)) {
        console.log("Page is loading...")
        return <Loader/>;
    }

    if (isError) {
        console.log("An Error Occurred.");
        return <Error error={error!}/>;
    }

    return (
        <>
            {typeof children === "function" ? children(data!) : children}
        </>
    );
};

export default QueryBoundary;
