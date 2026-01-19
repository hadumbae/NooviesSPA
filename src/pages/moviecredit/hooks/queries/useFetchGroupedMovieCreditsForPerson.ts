import {useQuery, UseQueryResult} from "@tanstack/react-query";
import MovieCreditGroupedRepository from "@/pages/moviecredit/repositories/MovieCreditGroupedRepository.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Parameters for fetching grouped movie credits for a person.
 */
type GroupCreditsParams = {
    /** Target person ObjectId */
    personID: ObjectId;

    /** Optional request configuration */
    config?: RequestOptions;

    /** Optional React Query configuration overrides */
    options?: UseQueryOptions<unknown>;
};

/**
 * Fetch movie credits for a person, grouped by role type.
 *
 * Wraps {@link MovieCreditGroupedRepository.getGroupedByRoleForPerson}
 * in a React Query hook with standardized error handling and defaults.
 *
 * @param params - Person ID, request config, and query options
 * @returns React Query result containing grouped movie credits
 */
export function useFetchGroupedMovieCreditsForPerson(
    {personID, options, config}: GroupCreditsParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchCredits = useQueryFnHandler({
        action: () =>
            MovieCreditGroupedRepository.getGroupedByRoleForPerson({personID, config}),
        errorMessage: "Failed to fetch movie credits. Please try again.",
    });

    return useQuery({
        queryKey: ["movie_credits", "lists", "grouped", "person", {personID, ...config}],
        queryFn: fetchCredits,
        ...useQueryOptionDefaults(options),
    });
}
