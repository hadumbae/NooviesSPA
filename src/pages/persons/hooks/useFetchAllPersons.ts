import PersonRepository from "@/pages/persons/repositories/PersonRepository.ts";
import QueryFilters from "@/common/type/QueryFilters.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {PersonArray} from "@/pages/persons/schema/PersonArraySchema.ts";

/**
 * Parameters for fetching a list of persons from the repository.
 */
type FetchParams = {
    /**
     * Optional filters to apply when querying the person records.
     * Can include any supported query parameters by the backend.
     */
    filters?: QueryFilters;

    /**
     * Whether to populate reference fields in the person records (e.g., related entities).
     * Defaults to `false`.
     */
    populate?: boolean;

    /**
     * Whether to include virtual fields defined on the person model.
     * Currently unused in this hook, but can be added if needed.
     */
    virtuals?: boolean;
};

/**
 * React hook to fetch all persons using React Query.
 *
 * Uses the `PersonRepository.getAll` method to retrieve data and wraps it with
 * caching and lifecycle management via `useQuery`.
 *
 * @param params - Optional parameters to customize the fetch behavior.
 * @returns A React Query result containing the list of persons and query state.
 *
 * @example
 * ```ts
 * const { data: persons, isLoading, error } = useFetchAllPersons({
 *   filters: { nationality: "Swedish" },
 *   populate: true,
 * });
 * ```
 */
export default function useFetchAllPersons(params?: FetchParams): UseQueryResult<PersonArray> {
    const {filters = {}, populate = false} = params || {};

    const queryKey = ['fetch_all_persons', {filters, populate}];

    const fetchPersons = async () => {
        const {response, result} = await PersonRepository.getAll({filters, populate});
        if (!response.ok) throw new HttpResponseError({response, message: "Failed To Fetch Persons."});
        return result;
    }

    return useQuery({
        queryKey,
        queryFn: fetchPersons,
    });
}