import {ManageMovieImagesBaseURL} from "@/domains/movies/_feat/manage-images/repository/baseURL.ts";
import {
    deleteRemovePosterImage,
    patchUploadPosterImage
} from "@/domains/movies/_feat/manage-images/repository/repository.ts";
import {
    RemovePosterImageConfig,
    UploadPosterImageConfig
} from "@/domains/movies/_feat/manage-images/repository/repository.types.ts";

export {
    ManageMovieImagesBaseURL,
    patchUploadPosterImage,
    deleteRemovePosterImage,
}

export type {
    UploadPosterImageConfig,
    RemovePosterImageConfig,
}

