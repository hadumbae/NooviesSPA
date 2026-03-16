/**
 * @file React Query hook for retrieving movie showings view data.
 * @filename useFetchMovieInfoShowingsData.ts
 */

import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {getShowingsForMovieView} from "@/domains/movies/views/client/repositories/MovieClientViewRepository.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {
    GetShowingsForMovieViewQueryStrings
} from "@/domains/movies/views/client/repositories/MovieClientViewRepository.types.ts";

/**
 * Parameters for {@link useFetchMovieInfoShowingsData}.
 */
type FetchParams = {
    /** Movie slug used to identify the resource. */
    slug: SlugString;

    /** Query parameters applied to the request. */
    queries: GetShowingsForMovieViewQueryStrings;

    /** Optional React Query configuration overrides. */
    options?: UseQueryOptions<unknown>;
};

/**
 * Fetches showings data for a movie view.
 */
export function useFetchMovieInfoShowingsData(
    {slug, queries, options}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const {page, perPage} = queries;

    const fetchData = useQueryFnHandler({
        action: () => getShowingsForMovieView({slug, queries}),
        errorMessage: "Failed to fetch showing details for movie."
    });

    return useQuery({
        queryKey: ["movies", "views", "client", "showings", {slug, page, perPage}],
        queryFn: fetchData,
        ...useQueryOptionDefaults(options),
    });
}