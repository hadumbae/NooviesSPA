/**
 * @fileoverview React Query hook for fetching movie credits view data.
 */
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {getCreditsForMovieView} from "@/domains/movies/_feat/client-view-data/repositories/repository.ts";

/** Parameters for fetching movie credits view data. */
export type FetchParams = {
    slug: SlugString;
    options?: FetchQueryOptions<unknown>;
}

/**
 * Fetches and groups movie credits for the movie info view.
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