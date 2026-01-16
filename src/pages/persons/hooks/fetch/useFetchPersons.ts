/**
 * @file useFetchPersons.ts
 *
 * React Query hook for fetching a filtered list of Person entities.
 *
 * Responsibilities:
 * - Executes list queries via `PersonRepository.query`
 * - Normalizes request errors
 * - Applies shared React Query option defaults
 */

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import PersonRepository from "@/pages/persons/repositories/PersonRepository.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {PersonQueryOptions} from "@/pages/persons/schema/queries/PersonQueryOption.types.ts";
import {OptionQueryParams} from "@/common/type/query/FetchQueryTypes.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Fetches a list of persons using optional query filters.
 *
 * @template TData Expected response data shape.
 *
 * @param params - Query filters, request configuration, and query options.
 * @returns React Query result containing fetched persons or an error.
 *
 * @remarks
 * - Uses `PersonRepository.query` internally.
 * - Previous data may be retained during background refetches.
 */
export default function useFetchPersons<TData = unknown>(
    {queries, config, options}: OptionQueryParams<PersonQueryOptions, TData> = {}
): UseQueryResult<TData, HttpResponseError> {
    const fetchPersons = useQueryFnHandler({
        action: () => PersonRepository.query({ queries, config }),
        errorMessage: "Failed to fetch person(s) data. Please try again.",
    });

    return useQuery({
        queryKey: ["persons", "lists", "query", {...queries, ...config}],
        queryFn: fetchPersons,
        ...useQueryOptionDefaults(options),
    });
}
