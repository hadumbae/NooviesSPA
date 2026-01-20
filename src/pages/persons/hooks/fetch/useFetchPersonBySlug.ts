/**
 * @file useFetchPersonBySlug.ts
 *
 * React Query hook for fetching a single person entity by slug.
 * Encapsulates repository access, error normalization,
 * and query option defaults.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";

import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

import PersonRepository from "@/pages/persons/repositories/PersonRepository.ts";

/**
 * Parameters for {@link useFetchPersonBySlug}.
 */
type FetchParams = {
    /** Unique slug identifier for the person */
    slug: string;

    /** Optional request-level configuration */
    config?: RequestOptions;

    /** Optional React Query options override */
    options?: UseQueryOptions<unknown>;
};

/**
 * Fetch a person by slug.
 *
 * - Delegates data access to {@link PersonRepository.getBySlug}
 * - Normalizes errors via {@link useQueryFnHandler}
 * - Applies default query options using {@link useQueryOptionDefaults}
 *
 * @param params - Query configuration including slug, request options, and query options
 *
 * @returns React Query result containing the person data
 *
 * @remarks
 * - Query key is scoped by `slug` and request configuration
 * - Errors are surfaced as {@link HttpResponseError}
 */
export function useFetchPersonBySlug(
    {slug, config, options}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchPerson = useQueryFnHandler({
        action: () => PersonRepository.getBySlug({slug, config}),
        errorMessage: "Failed to fetch person. Please try again.",
    });

    return useQuery({
        queryKey: ["persons", "slug", {slug, ...config}],
        queryFn: fetchPerson,
        ...useQueryOptionDefaults(options),
    });
}
