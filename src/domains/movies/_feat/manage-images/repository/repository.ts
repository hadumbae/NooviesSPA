/**
 * @fileoverview Repository for managing movie poster image upload and removal operations.
 */

import {RemovePosterImageConfig, UploadPosterImageConfig} from "./repository.types.ts";
import {ManageMovieImagesBaseURL} from "@/domains/movies/_feat/manage-images/repository/baseURL.ts";
import {buildURL} from "@/common/_feat/fetch-api";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";

/** Updates the poster image for a specific movie. */
export function patchUploadPosterImage(params: UploadPosterImageConfig): Promise<RequestReturns> {
    const {movieID, data} = params;

    const url = buildURL({
        baseURL: ManageMovieImagesBaseURL,
        path: `/item/${movieID}/poster_image/update`
    });

    return useFetchAPI({url, method: "PATCH", data});
}

/** Deletes the poster image associated with a specific movie. */
export function deleteRemovePosterImage(params: RemovePosterImageConfig): Promise<RequestReturns> {
    const {movieID} = params;

    const url = buildURL({
        baseURL: ManageMovieImagesBaseURL,
        path: `/item/${movieID}/poster_image/remove`
    });

    return useFetchAPI({url, method: "DELETE"});
}
