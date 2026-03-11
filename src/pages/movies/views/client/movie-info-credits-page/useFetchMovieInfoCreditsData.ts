/**
 * @file React Query hook for fetching movie credits view data.
 * @filename useFetchMovieInfoCreditsData.ts
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {getCreditsForMovieView} from "@/pages/movies/views/client/repositories/MovieClientViewRepository.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Parameters for fetching movie credits view data.
 */
type FetchParams = {
    /** Movie identifier used for query scoping */
    movieID: ObjectId;

    /** Optional React Query configuration */
    options?: UseQueryOptions<unknown>;
}

/**
 * Fetches grouped movie credits for the movie info view.
 */
export function useFetchMovieInfoCreditsData(
    {movieID, options}: FetchParams,
): UseQueryResult<unknown, HttpResponseError> {
    const fetchData = useQueryFnHandler({
        action: () => getCreditsForMovieView({movieID}),
        errorMessage: "Failed to fetch credits."
    });

    return useQuery({
        queryKey: ["movies", "views", "client", "credits", {movieID}],
        queryFn: fetchData,
        ...useQueryOptionDefaults(options),
    });
}