import QueryFilters from "@/common/type/QueryFilters.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";
import {UseQueryResult} from "@tanstack/react-query";
import {ShowingArraySchema} from "@/pages/showings/schema/showing/Showing.schema.ts";
import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";
import {ShowingArray} from "@/pages/showings/schema/showing/Showing.types.ts";

/**
 * Custom hook to fetch all showings from the API with optional filters.
 *
 * This hook integrates with a schema-based data fetching system, ensuring
 * the response matches the expected structure defined by `ShowingArraySchema`.
 * It returns the fetched data, loading state, error state, and other query-related utilities.
 *
 * @function useFetchAllShowings
 *
 * @param {object} [params] - Optional parameters for fetching showings.
 * @param {QueryFilters} [params.filters] - Optional filters to apply to the showing query.
 *
 * @returns {UseQueryResult<ShowingArray>} - Query result object containing the fetched showings,
 * loading status, error details, and other utilities from the TanStack Query library.
 */
export default function useFetchAllShowings(
    params?: { populate?: boolean, filters?: QueryFilters }
): UseQueryResult<ShowingArray> {
    const {populate = false, filters = {}} = params || {};
    const filteredQueries = filterEmptyAttributes(filters);

    const queryKey = ["fetch_all_showings", {populate, filters: filteredQueries}];
    const schema = ShowingArraySchema;
    const action = () => ShowingRepository.getAll({filters, populate});

    return useFetchValidatedDataWithRedirect<typeof schema, ShowingArray>({schema, action, queryKey});
}