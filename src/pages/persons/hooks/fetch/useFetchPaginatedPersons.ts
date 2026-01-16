/**
 * @file useFetchPaginatedPersons.ts
 *
 * React Query hook for fetching paginated Person data.
 *
 * Responsibilities:
 * - Executes paginated queries via `PersonRepository.paginated`
 * - Normalizes request errors
 * - Applies shared React Query option defaults
 */

import {PaginatedQueryParams} from "@/common/type/query/FetchQueryTypes.ts";
import {PersonQueryOptions} from "@/pages/persons/schema/queries/PersonQueryOption.types.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import PersonRepository from "@/pages/persons/repositories/PersonRepository.ts";
import {useQuery} from "@tanstack/react-query";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

type FetchParams = PaginatedQueryParams<PersonQueryOptions, unknown>;

/**
 * Fetches a paginated list of persons.
 *
 * @param params - Pagination values, query filters, and query options.
 * @returns React Query result containing paginated person data.
 */
export function useFetchPaginatedPersons(
    {page, perPage, queries, config, options}: FetchParams,
) {
    const fetchPersons = useQueryFnHandler({
        action: () => PersonRepository.paginated({page, perPage, queries, config}),
        errorMessage: "Failed to fetch person data. Please try again.",
    });

    return useQuery({
        queryKey: ["persons", "lists", "paginated", {page, perPage, ...queries, ...config}],
        queryFn: fetchPersons,
        ...useQueryOptionDefaults(options),
    });
}
