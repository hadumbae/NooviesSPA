import {ComponentType, ReactNode} from 'react';
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import {UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import PageError from "@/common/components/page/errors/PageError.tsx";

/**
 * Props for the {@link QueryBoundary} component.
 *
 * @template TData - Type of the query's `data` property.
 */
type QueryBoundaryProps<TData = unknown> = {
    /**
     * Children to render.
     * - Can be static `ReactNode`.
     * - Or a render function receiving the query `data`.
     */
    children: ReactNode | ((data: TData) => ReactNode);

    /**
     * The React Query result object.
     * Expected to use `HttpResponseError` as the error type.
     */
    query: UseQueryResult<TData, HttpResponseError>;

    /**
     * Whether to show the loader while fetching *after* initial load.
     * Defaults to `false`.
     */
    loaderOnFetch?: boolean;

    /**
     * Optional loader component to render while the query is pending.
     * Defaults to {@link PageLoader}.
     */
    loaderComponent?: ComponentType;

    /**
     * Optional error component to render when the query fails.
     * If not provided:
     * - `HttpResponseError` will be handled by {@link PageHTTPError}.
     * - All other errors will be handled by {@link PageError}.
     */
    errorComponent?: ComponentType<{ error: HttpResponseError; message?: string }>;
};

/**
 * A boundary component for wrapping React Query results.
 *
 * This component:
 * - Displays a loader while the query is pending (and optionally during refetch).
 * - Renders a provided or default error component if the query fails.
 * - Passes the query `data` to children once available.
 *
 * @template TData - Type of the query's `data` property.
 *
 * @example
 * ```tsx
 * <QueryBoundary query={userQuery}>
 *   {(user) => <UserProfile user={user} />}
 * </QueryBoundary>
 * ```
 *
 * @example
 * ```tsx
 * <QueryBoundary
 *   query={productQuery}
 *   loaderOnFetch
 *   errorComponent={CustomErrorDisplay}
 * >
 *   <ProductDetails />
 * </QueryBoundary>
 * ```
 */
const QueryBoundary = <TData = unknown>(params: QueryBoundaryProps<TData>) => {
    const {
        children,
        query: {data, isPending, isFetching, isError, error},
        loaderOnFetch = false,
        loaderComponent: Loader = PageLoader,
        errorComponent: ErrorComponent,
    } = params;

    if (isPending || (loaderOnFetch && isFetching && !data)) {
        console.log("Page is loading...")
        return <Loader/>;
    }

    if (isError) {
        console.log("An Error Occurred.");

        if (ErrorComponent) return <ErrorComponent error={error}/>;
        if (error instanceof HttpResponseError) return <PageHTTPError error={error}/>;
        return <PageError error={error}/>;
    }

    return (
        <>
            {typeof children === "function" ? children(data!) : children}
        </>
    );
};

export default QueryBoundary;
