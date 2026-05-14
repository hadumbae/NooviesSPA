/**
 * @fileoverview Repository for managing movie poster image upload and removal operations.
 */

import {RemovePosterImageConfig, UploadPosterImageConfig} from "./repository.types.ts";
import {ManageMovieImagesBaseURL} from "@/domains/movies/_feat/manage-images/repository/baseURL.ts";
import {buildURL} from "@/common/features/fetch-api";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";

/** Updates the poster image for a specific movie. */
export function patchUploadPosterImage(params: UploadPosterImageConfig): Promise<RequestReturns> {
    const {movieID, data} = params;

    const url = buildURL({
        baseURL: ManageMovieImagesBaseURL,
        path: `/update/${movieID}/poster_image`
    });

    return useFetchAPI({url, method: "PATCH", data});
}

/** Deletes the poster image associated with a specific movie. */
export function deleteRemovePosterImage(params: RemovePosterImageConfig): Promise<RequestReturns> {
    const {movieID} = params;

    const url = buildURL({
        baseURL: ManageMovieImagesBaseURL,
        path: `/delete/${movieID}/poster_image`
    });

    return useFetchAPI({url, method: "DELETE"});
}
