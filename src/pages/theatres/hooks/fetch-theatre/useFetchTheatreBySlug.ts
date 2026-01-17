/**
 * @file useFetchTheatreBySlug.ts
 *
 * React Query hook for fetching a single theatre by slug.
 *
 * Integrates:
 * - **TheatreRepository** for data access
 * - **useQueryFnHandler** for standardized error handling
 * - **useQueryOptionDefaults** for consistent query options
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Parameters for fetching a theatre by slug.
 */
type FetchParams = {
    /** Theatre slug identifier */
    slug: string;

    /** Optional request configuration */
    config?: RequestOptions;

    /** Optional React Query options override */
    options?: UseQueryOptions<unknown>;
};

/**
 * Fetches a theatre entity by its slug.
 *
 * @param slug - Theatre slug
 * @param config - Optional request options
 * @param options - Optional query configuration
 * @returns React Query result for the theatre fetch
 */
export default function useFetchTheatreBySlug(
    {slug, config, options}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchTheatre = useQueryFnHandler({
        action: () => TheatreRepository.getBySlug({slug, config}),
        errorMessage: "Failed to fetch theatre.",
    });

    return useQuery({
        queryKey: ["theatres", "slug", {slug, ...config}],
        queryFn: fetchTheatre,
        ...useQueryOptionDefaults(options),
    });
}
