import {useQuery, UseQueryResult} from "@tanstack/react-query";
import MovieCreditGroupedRepository from "@/pages/moviecredit/repositories/MovieCreditGroupedRepository.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {MovieCreditDetailsExceptPersonGroupedByRole} from "@/pages/moviecredit/schemas/model/MovieCreditGroup.types.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Parameters for `useGroupCreditsByRole` hook.
 */
type GroupCreditsParams = RequestOptions & {
    /** Unique identifier of the person whose credits are being fetched */
    personID: ObjectId;

    /** Optional React Query configuration overrides */
    options?: UseQueryOptions<MovieCreditDetailsExceptPersonGroupedByRole>;
}

/**
 * React Query hook to fetch movie credits for a specific person,
 * grouped by role type (e.g., Actor, Director, Writer).
 *
 * @param params - Parameters for fetching grouped credits
 * @returns A React Query result object containing the grouped movie credits and query state
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useGroupCreditsByRole({
 *   personID: "64a1f9c5e3f3b1a2b3c4d5e6"
 * });
 * ```
 */
export default function useFetchGroupedMovieCreditsForPerson(
    {personID, options, ...config}: GroupCreditsParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchCredits = useQueryFnHandler({
        action: () => MovieCreditGroupedRepository.getGroupedByRoleForPerson({personID, ...config}),
        errorMessage: "Failed to fetch movie credits. Please try again.",
    });

    return useQuery({
        queryKey: ["movie_credits", "lists", "grouped", "person", {personID, ...config}],
        queryFn: fetchCredits,
        ...useQueryOptionDefaults(options),
    });
}
