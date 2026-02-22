/**
 * @file React Query hook for favourite Movie status.
 * useCheckIsFavouriteMovie.ts
 */

import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import { getCheckIsFavouriteMovie } from "@/pages/users/repositories/favourites/UserFavouriteRepository.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Parameters for the `useCheckIsFavouriteMovie` hook.
 */
type FetchParams = {
    _id: ObjectId;
    options?: UseQueryOptions<unknown>;
};

/**
 * Queries whether the specified Movie is in the user's favourites.
 *
 * @param params - Movie identifier and query options
 */
export function useCheckIsFavouriteMovie(
    { _id, options }: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const getCheckMovie = useQueryFnHandler({
        action: () => getCheckIsFavouriteMovie(_id),
        errorMessage: "Failed to check favourite status.",
    });

    return useQuery({
        queryKey: ["profile", "favourites", "check", "movie", { _id }],
        queryFn: getCheckMovie,
        ...useQueryOptionDefaults(options),
    });
}