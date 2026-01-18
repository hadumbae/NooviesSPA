/**
 * @file useFetchShowing.ts
 *
 * React Query hook for fetching a single `Showing` by ID.
 *
 * Wraps {@link ShowingRepository.get} with:
 * - Standardized query error handling
 * - Default query option application
 * - Typed React Query result state
 */

import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";

/**
 * Parameters for fetching a single Showing.
 */
type FetchParams = {
    /** Showing identifier */
    _id: ObjectId;

    /** Optional request configuration */
    config?: RequestOptions;

    /** Optional React Query options */
    options?: UseQueryOptions<unknown>;
};

/**
 * Fetches a single Showing by its ID.
 *
 * @param params - Fetch parameters and query options.
 *
 * @returns
 * A React Query result containing the Showing data or error state.
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useFetchShowing({ _id });
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage />;
 * return <ShowingDetails showing={data} />;
 * ```
 */
export default function useFetchShowing(
    {_id, options, config}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchShowing = useQueryFnHandler({
        action: () => ShowingRepository.get({_id, config}),
        errorMessage: "Failed to fetch showing data.",
    });

    return useQuery({
        queryKey: ["showings", "_id", {_id, ...config}],
        queryFn: fetchShowing,
        ...useQueryOptionDefaults(options),
    });
}
