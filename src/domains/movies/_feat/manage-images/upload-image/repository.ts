/**
 * @fileoverview API functions for uploading and updating movie poster and banner images.
 */

import {ObjectId} from "@/common/_schemas/strings/id-strings/IDStringSchema";
import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns";
import {buildURL} from "@/common/_feat/fetch-api/buildURL";
import {ManageMovieImagesBaseURL} from "@/domains/movies/_feat/manage-images/baseURL";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI";
import {Movie} from "@/domains/movies/_schema/movie/MovieSchema.ts";

/** Parameters required to upload a movie poster or banner image. */
export type UploadMovieImageRouteConfig = {
    movieID: ObjectId;
    data: FormData;
}

function createMovieImageUploadRoute(
    key: "poster" | "banner",
): (params: UploadMovieImageRouteConfig) => Promise<FetchRequestReturns<Movie>> {
    return async (
        {movieID, data}: UploadMovieImageRouteConfig
    ): Promise<FetchRequestReturns<Movie>> => {
        const url = buildURL({
            baseURL: ManageMovieImagesBaseURL,
            path: `/item/${movieID}/${key}-image/update`
        });

        return useFetchAPI({url, method: "PATCH", data});
    }
}

/** Uploads or updates the poster image for a movie. */
export const patchUploadMoviePosterImage = createMovieImageUploadRoute("poster");

/** Uploads or updates the banner image for a movie. */
export const patchUploadMovieBannerImage = createMovieImageUploadRoute("banner");