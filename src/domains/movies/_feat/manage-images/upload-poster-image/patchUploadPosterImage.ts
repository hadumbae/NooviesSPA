import {ObjectId} from "@/common/_schemas/strings/id-strings/IDStringSchema";
import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns";
import {buildURL} from "@/common/_feat/fetch-api/buildURL";
import {ManageMovieImagesBaseURL} from "@/domains/movies/_feat/manage-images/baseURL";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI";

/** Configuration for uploading a movie poster image. */
export type UploadPosterImageConfig = {
    movieID: ObjectId;
    data: FormData;
}

/** Updates the poster image for a specific movie. */
export function patchUploadPosterImage(params: UploadPosterImageConfig): Promise<FetchRequestReturns> {
    const {movieID, data} = params;

    const url = buildURL({
        baseURL: ManageMovieImagesBaseURL,
        path: `/item/${movieID}/poster-image/update`
    });

    return useFetchAPI({url, method: "PATCH", data});
}