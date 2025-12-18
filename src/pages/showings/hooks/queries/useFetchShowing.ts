/**
 * @file useFetchShowing.ts
 * @description
 * A custom React Query hook for fetching a single showing by its ID.
 * This hook wraps `ShowingRepository.get` with error handling and query option defaults, making it easy
 * to fetch showing data and manage loading, error, and success states in a React component.
 *
 * It uses:
 * - `useQuery` from React Query for caching and state management
 * - `useQueryFnHandler` for standardized error handling
 * - `useQueryOptionDefaults` to apply default query options
 *
 * @example
 * const { data, error, isLoading } = useFetchShowing({ _id: "12345" });
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>{error.message}</div>;
 * return <ShowingDetails data={data} />;
 */

import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import { FetchByIDParams } from "@/common/type/query/FetchByIDParams.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Parameters for `useFetchShowing`.
 *
 * @template TData - The type of the data expected from the showing fetch.
 */
type FetchParams<TData = unknown> = FetchByIDParams & {
    /**
     * Optional React Query options to override defaults.
     */
    options?: UseQueryOptions<TData>;
};

/**
 * Custom hook to fetch a single showing by its ID.
 *
 * @template TData - Type of the returned data (default: `unknown`).
 * @param {FetchParams<TData>} params - Parameters for fetching the showing.
 * @param {string} params._id - The ID of the showing to fetch.
 * @param {UseQueryOptions<TData>} [params.options] - Optional React Query options.
 * @returns {UseQueryResult<TData, HttpResponseError>} React Query result containing data, loading and error states.
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useFetchShowing({ _id: "showing_123" });
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>{error.message}</div>;
 * return <div>{data?.title}</div>;
 * ```
 */
export default function useFetchShowing<TData = unknown>(
    params: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const { _id, options = useQueryOptionDefaults(), ...requestOptions } = params;

    const queryKey = ["fetch_single_showing", _id];

    const fetchShowing = useQueryFnHandler({
        action: () => ShowingRepository.get({ _id, ...requestOptions }),
        errorMessage: "Failed to fetch showing data. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchShowing,
        ...options,
    });
}
