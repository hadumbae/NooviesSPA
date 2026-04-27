/** @fileoverview High-order component for managing TanStack Query loading and error states. */

import {ComponentType, ReactElement, ReactNode} from 'react';
import {PageLoader} from "@/views/common/_comp/page";
import {UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/** Props for the QueryDataLoader component. */
type LoaderProps<TData = unknown> = {
    children: (data: TData) => ReactNode;
    query: UseQueryResult<TData, HttpResponseError>;
    loaderComponent?: ComponentType;
};

/** Standardizes the loading, error, and data display patterns for asynchronous queries. */
export function QueryDataLoader<TData = unknown>(
    {children, query: {data, isPending, isError, error}, loaderComponent: Loader = PageLoader}: LoaderProps<TData>
): ReactElement {

    if (isPending || !data) return <Loader/>;
    if (isError) throw error;

    return (
        <>
            {children(data)}
        </>
    );
}
