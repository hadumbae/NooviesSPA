/**
 * @file High-order component for managing TanStack Query loading and error states.
 * @filename QueryDataLoader.tsx
 */

import {ComponentType, ReactNode} from 'react';
import PageLoader from "@/views/common/_comp/page/PageLoader.tsx";
import {UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Props for the QueryDataLoader component.
 */
type LoaderProps<TData = unknown> = {
    /** A render function that receives the validated data. */
    children: (data: TData) => ReactNode;
    /** The result object from a useQuery or useSuspenseQuery hook. */
    query: UseQueryResult<TData, HttpResponseError>;
    /** Optional custom loader component to override the default PageLoader. */
    loaderComponent?: ComponentType;
};

/**
 * Standardizes the "Loading/Error/Data" pattern across the administrative dashboard.
 * ---
 */
export const QueryDataLoader = <TData = unknown>(params: LoaderProps<TData>) => {
    const {
        children,
        query: {data, isPending, isError, error},
        loaderComponent: Loader = PageLoader,
    } = params;

    if (isPending || !data) return <Loader/>;
    if (isError) throw error;

    return (
        <>{children(data)}</>
    );
};