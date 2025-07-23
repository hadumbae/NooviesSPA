import {FC, PropsWithChildren} from 'react';
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import {UseQueryResult} from "@tanstack/react-query";

/**
 * Props for the {@link QueryBoundary} component.
 *
 * @template TData - Type of the data returned by the query.
 * @template TError - Type of the error returned by the query.
 */
type QueryBoundaryProps<TData = unknown, TError = Error> = {
    /**
     * The query result object from `useQuery` or similar, containing
     * loading, error, and data state.
     */
    query: UseQueryResult<TData, TError>;
};

/**
 * A boundary component that handles loading and error states of a React Query.
 *
 * This component renders:
 * - a {@link PageLoader} if the query is still loading (`isPending`)
 * - a {@link PageHTTPError} if the query errored (`isError`)
 * - the `children` only if the query succeeded
 *
 * Useful to wrap a section of a page that depends on an async query.
 *
 * @example
 * ```tsx
 * <QueryBoundary query={query}>
 *   <YourContent data={query.data} />
 * </QueryBoundary>
 * ```
 *
 * @template TData - Type of the data returned by the query.
 * @template TError - Type of the error returned by the query.
 */
const QueryBoundary: FC<PropsWithChildren<QueryBoundaryProps>> = (params) => {
    const {children, query} = params;
    const {isPending, isError, error} = query;

    console.log("Query Data: ", {isPending, isError, error});

    if (isPending) {
        console.log("Page is loading...")
        return <PageLoader/>;
    }

    if (isError) {
        console.log("An Error Occurred.");
        return <PageHTTPError error={error}/>;
    }

    return (
        <>
            {children}
        </>
    );
};

export default QueryBoundary;
