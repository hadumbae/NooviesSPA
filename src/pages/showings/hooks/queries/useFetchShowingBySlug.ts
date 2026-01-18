/**
 * @file useFetchShowingBySlug.ts
 *
 * React Query hook for fetching a single `Showing` by slug.
 *
 * Wraps {@link ShowingRepository.getBySlug} with standardized
 * error handling and default query option behavior.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";

/**
 * Parameters for fetching a Showing by slug.
 */
type FetchParams = {
    /** Public slug identifier */
    slug: string;

    /** Optional request configuration */
    config?: RequestOptions;

    /** Optional React Query options */
    options?: UseQueryOptions<unknown>;
};

/**
 * Fetches a single Showing by its slug.
 *
 * @param params - Slug, request configuration, and query options.
 *
 * @returns
 * A React Query result containing the Showing data or error state.
 *
 * @example
 * ```tsx
 * const { data, isLoading } = useFetchShowingBySlug({ slug });
 * ```
 */
export default function useFetchShowingBySlug(
    {slug, config, options}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchShowing = useQueryFnHandler({
        action: () => ShowingRepository.getBySlug({slug, config}),
        errorMessage: "Failed to fetch showing.",
    });

    return useQuery({
        queryKey: ["showings", "slug", {slug, ...config}],
        queryFn: fetchShowing,
        ...useQueryOptionDefaults(options),
    });
}
