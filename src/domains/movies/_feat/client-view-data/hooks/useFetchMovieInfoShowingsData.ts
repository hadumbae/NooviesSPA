/**
 * @fileoverview React Query hook for retrieving movie showings view data.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {MovieClientViewDataQueryKeys} from "@/domains/movies/_feat/client-view-data/hooks/queryKeys.ts";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {MovieInfoShowingViewData, MovieInfoShowingViewSchema} from "@/domains/movies/_feat/client-view-data";
import {GetShowingsForMovieViewQueryStrings} from "../repositories/repository.types";
import HttpResponseError from "@/common/errors/HttpResponseError";
import {getShowingsForMovieView} from "@/domains/movies/_feat/client-view-data/repositories/repository.ts";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/** Parameters for the movie showings data fetch hook. */
type FetchParams = {
    slug: SlugString;
    queries: GetShowingsForMovieViewQueryStrings;
    options?: FetchQueryOptions<MovieInfoShowingViewData>;
};

/** Fetches and validates movie showing data for the client view. */
export function useFetchMovieInfoShowingsData(
    {slug, queries, options}: FetchParams
): UseQueryResult<MovieInfoShowingViewData, HttpResponseError> {
    const fetchData = buildQueryFn<MovieInfoShowingViewData>({
        action: () => getShowingsForMovieView({slug, queries}),
        schema: MovieInfoShowingViewSchema,
    });

    return useQuery({
        queryKey: MovieClientViewDataQueryKeys.infoShowings({slug, ...queries}),
        queryFn: fetchData,
        ...useQueryOptionDefaults(options),
    });
}