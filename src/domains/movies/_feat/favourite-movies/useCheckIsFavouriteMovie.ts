/**
 * @fileoverview React Query hook to check if a movie is in the user's favourites.
 */

import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { FetchQueryOptions } from "@/common/type/query/FetchQueryOptions.ts";
import { getCheckIsFavouriteMovie } from "@/domains/users/repositories/favourites/UserFavouriteRepository.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {
    IsFavouriteMovieMetadata,
    IsFavouriteMovieSchema
} from "@/domains/users/schemas/favourites/IsFavouriteMovieSchema.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";

/** Parameters for the useCheckIsFavouriteMovie hook. */
type FetchParams = {
    _id: ObjectId;
    options?: FetchQueryOptions<unknown>;
};

/** Queries whether the specified Movie is in the user's favourites. */
export function useCheckIsFavouriteMovie(
    { _id, options }: FetchParams
): UseQueryResult<IsFavouriteMovieMetadata, HttpResponseError> {
    const getCheckMovie = buildQueryFn({
        action: () => getCheckIsFavouriteMovie(_id),
        schema: IsFavouriteMovieSchema,
    });

    return useQuery({
        queryKey: ["profile", "favourites", "check", "movie", { _id }],
        queryFn: getCheckMovie,
        ...useQueryOptionDefaults(options),
    });
}