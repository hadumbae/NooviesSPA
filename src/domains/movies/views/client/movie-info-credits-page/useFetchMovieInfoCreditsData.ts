/**
 * @file React Query hook for fetching movie credits view data.
 * @filename useFetchMovieInfoCreditsData.ts
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {getCreditsForMovieView} from "@/domains/movies/views/client/repositories/MovieClientViewRepository.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";

/**
 * Parameters for fetching movie credits view data.
 */
type FetchParams = {
    /** Movie identifier used for query scoping */
    slug: SlugString;

    /** Optional React Query configuration */
    options?: UseQueryOptions<unknown>;
}

/**
 * Fetches grouped movie credits for the movie info view.
 */
export function useFetchMovieInfoCreditsData(
    {slug, options}: FetchParams,
): UseQueryResult<unknown, HttpResponseError> {
    const fetchData = useQueryFnHandler({
        action: () => getCreditsForMovieView({slug: slug}),
        errorMessage: "Failed to fetch credits."
    });

    return useQuery({
        queryKey: ["movies", "views", "client", "credits", {slug: slug}],
        queryFn: fetchData,
        ...useQueryOptionDefaults(options),
    });
}