/**
 * @file useFetchPerson.ts
 *
 * React Query hook for fetching a single Person entity by ID.
 *
 * Responsibilities:
 * - Fetches a person record via `PersonRepository.get`
 * - Normalizes request errors
 * - Applies shared React Query option defaults
 */

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import PersonRepository from "@/pages/persons/repositories/PersonRepository.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {IDQueryParams} from "@/common/type/query/FetchQueryTypes.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Fetches a single person by identifier.
 *
 * @param params - Query parameters including the person ID and optional request options.
 * @returns React Query result containing the fetched person or an error.
 *
 * @remarks
 * - Returned data is not schema-validated.
 * - Errors are normalized through `useQueryFnHandler`.
 */
export default function useFetchPerson(
    {_id, config, options}: IDQueryParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchPerson = useQueryFnHandler({
        action: () => PersonRepository.get({ _id, config }),
        errorMessage: "Failed to fetch person. Please try again.",
    });

    return useQuery({
        queryKey: ["persons", "_id", { _id, ...config }],
        queryFn: fetchPerson,
        ...useQueryOptionDefaults(options),
    });
}
