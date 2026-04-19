/**
 * @file React Query hook for retrieving movie showings view data.
 * @filename useFetchMovieInfoShowingsData.ts
 */

import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {getShowingsForMovieView} from "@/domains/movies/views/client/repositories/MovieClientViewRepository.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {
    GetShowingsForMovieViewQueryStrings
} from "@/domains/movies/views/client/repositories/MovieClientViewRepository.types.ts";

/**
 * Props for {@link useFetchMovieInfoShowingsData}.
 */
type FetchParams = {
    /** {@link SlugString} used to resolve the specific movie resource. */
    slug: SlugString;

    /** {@link GetShowingsForMovieViewQueryStrings} for filtering and pagination. */
    queries: GetShowingsForMovieViewQueryStrings;

    /** {@link FetchQueryOptions} overrides. */
    options?: FetchQueryOptions<unknown>;
};

/**
 * Fetches showing and movie metadata via {@link getShowingsForMovieView}.
 */
export function useFetchMovieInfoShowingsData(
    {slug, queries, options}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchData = useQueryFnHandler({
        action: () => getShowingsForMovieView({slug, queries}),
        errorMessage: "Failed to fetch showing details for movie."
    });

    return useQuery({
        queryKey: ["movies", "views", "client", "showings", {slug, ...queries}],
        queryFn: fetchData,
        ...useQueryOptionDefaults(options),
    });
}