import {useQuery, UseQueryResult} from "@tanstack/react-query";
import MovieCreditGroupedRepository from "@/pages/moviecredit/repositories/MovieCreditGroupedRepository.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {UseQueryOptions} from "@/common/type/UseQueryOptions.ts";
import {MovieCreditDetailsExceptPersonGroupedByRole} from "@/pages/moviecredit/schemas/model/MovieCreditGroup.types.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {RequestOptions} from "@/common/type/repositories/EntityRequestParamTypes.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

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
export default function useFetchGroupedMovieCreditsForPerson(params: GroupCreditsParams): UseQueryResult<unknown, HttpResponseError> {
    const {personID, limit, options = {}} = params;

    const {
        enabled = true,
        staleTime = 1000 * 60, // 1 minute
        placeholderData = (prev) => prev,
        initialData,
    } = options;

    // Unique key to identify this query in React Query cache
    const queryKey = ["fetch_movie_credits_grouped_by_role_for_person", params];

    // Wrap the repository fetch function with error handling
    const fetchCredits = useQueryFnHandler({
        action: () => MovieCreditGroupedRepository.getGroupedByRoleForPerson({personID, limit}),
        errorMessage: "Failed to fetch movie credits. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchCredits,
        enabled,
        staleTime,
        placeholderData,
        initialData,
    });
}
