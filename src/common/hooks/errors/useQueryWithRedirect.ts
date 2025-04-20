
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import handleHTTPResponseError from "@/common/handlers/query/handleHTTPResponseError.ts";
import {useLocation, useNavigate} from "react-router-dom";

interface Params<TData> {
    queryKey: string[];
    queryFn: () => Promise<TData>;
}

/**
 * Custom hook that wraps React Query's `useQuery` to fetch data and handle HTTP errors by redirecting when necessary.
 *
 * @template TData - The type of data expected from the query function.
 * @template TError - The type of error that the query function might throw, extending the `Error` class.
 *
 * @param {Object} params - The parameters for configuring the hook.
 * @param {string[]} params.queryKey - An array representing the unique key for the query, used by React Query for caching and state management.
 * @param {() => Promise<TData>} params.queryFn - An asynchronous function that performs the data fetching and returns a promise resolving to the data of type `TData`.
 *
 * @returns {UseQueryResult<TData, TError>} - The result object from React Query's `useQuery`, containing the data, status, and error information.
 */
export default function useQueryWithRedirect<TData, TError extends Error>({queryKey, queryFn}: Params<TData>): UseQueryResult<TData, TError> {
    const navigate = useNavigate();

    const {pathname, search, hash} = useLocation();
    const currentURL = new URL(`${window.origin}${pathname}${search}${hash}`);

    console.log("[useQueryWithRedirect]", currentURL);

    const query = useQuery<TData, TError>({queryKey, queryFn});
    const {isError, error} = query;

    if (isError) {
        handleHTTPResponseError({error, navigate, currentURL});
    }

    return query;
}