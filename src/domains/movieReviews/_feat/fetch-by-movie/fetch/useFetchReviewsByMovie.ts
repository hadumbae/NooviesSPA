/**
 * @fileoverview React Query hook for fetching paginated reviews by movie ID.
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {getFetchReviewsByMovie} from "@/domains/movieReviews/_feat/fetch-by-movie/repository";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {FetchByMovieQueryKeys} from "@/domains/movieReviews/_feat";

/** Parameters required to fetch paginated reviews for a specific movie. */
type FetchParams = PaginationValues & {
    movieID: ObjectId;
    config?: Omit<RequestOptions, "limit">;
    options?: FetchQueryOptions<unknown>;
};

/** Fetches paginated reviews for a given movie. */
export function useFetchReviewsByMovie(
    {movieID, page, perPage, config, options}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchReviews = useQueryFnHandler({
        action: () => getFetchReviewsByMovie({movieID, page, perPage, config}),
        errorMessage: "Failed to fetch reviews. Please try again.",
    });

    return useQuery({
        queryKey: FetchByMovieQueryKeys.movie({...config, movieID}),
        queryFn: fetchReviews,
        ...useQueryOptionDefaults(options),
    });
}