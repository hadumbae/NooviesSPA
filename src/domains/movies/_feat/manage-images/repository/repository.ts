/**
 * @fileoverview Repository for managing movie poster image upload and removal operations.
 */

import {ManageMovieImagesBaseURL} from "@/domains/movies/_feat/manage-images/repository/baseURL.ts";
import {buildURL} from "@/common/_feat/fetch-api";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import {
    RemovePosterImageConfig,
    UploadPosterImageConfig
} from "@/domains/movies/_feat/manage-images/repository/repository.types.ts";

/** Updates the poster image for a specific movie. */
export function patchUploadPosterImage(params: UploadPosterImageConfig): Promise<RequestReturns> {
    const {movieID, data} = params;

    const url = buildURL({
        baseURL: ManageMovieImagesBaseURL,
        path: `/item/${movieID}/poster-image/update`
    });

    return useFetchAPI({url, method: "PATCH", data});
}

/** Deletes the poster image associated with a specific movie. */
export function deleteRemovePosterImage(params: RemovePosterImageConfig): Promise<RequestReturns> {
    const {movieID} = params;

    const url = buildURL({
        baseURL: ManageMovieImagesBaseURL,
        path: `/item/${movieID}/poster-image/remove`
    });

    return useFetchAPI({url, method: "DELETE"});
}
