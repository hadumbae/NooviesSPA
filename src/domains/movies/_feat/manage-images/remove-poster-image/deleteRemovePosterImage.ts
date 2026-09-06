import {ObjectId} from "@/common/_schemas";
import {FetchRequestReturns} from "@/common/_types";
import {buildURL, useFetchAPI} from "@/common/_feat";
import {ManageMovieImagesBaseURL} from "@/domains/movies/_feat/manage-images/baseURL.ts";

/** Configuration for removing a movie poster image. */
export type RemovePosterImageConfig = {
    movieID: ObjectId;
}

/** Deletes the poster image associated with a specific movie. */
export function deleteRemovePosterImage(params: RemovePosterImageConfig): Promise<FetchRequestReturns> {
    const {movieID} = params;

    const url = buildURL({
        baseURL: ManageMovieImagesBaseURL,
        path: `/item/${movieID}/poster-image/remove`
    });

    return useFetchAPI({url, method: "DELETE"});
}