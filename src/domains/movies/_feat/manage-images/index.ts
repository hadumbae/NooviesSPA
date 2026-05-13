import {ManageMovieImagesBaseURL} from "@/domains/movies/_feat/manage-images/repository/baseURL.ts";
import {RemovePosterImageConfig, UploadPosterImageConfig} from "./repository/repository.types.ts";
import {deleteRemovePosterImage, patchUploadPosterImage} from "./repository/repository.ts";
import {ManageMovieImageMutationKeys} from "./mutations/mutationKeys.ts";
import {
    MoviePosterImageFormData,
    MoviePosterImageFormSchema,
    MoviePosterImageFormValues
} from "./schema/MoviePosterImageFormSchema.ts";
import {useMoviePosterImageSubmitForm} from "./form/useMoviePosterImageSubmitForm.ts";
import useMoviePosterImageSubmitMutation
    from "./mutations/useMoviePosterImageSubmitMutation.ts";
import useMoviePosterImageDeleteMutation
    from "./mutations/useMoviePosterImageDeleteMutation.ts";


export {
    ManageMovieImagesBaseURL,
    patchUploadPosterImage,
    deleteRemovePosterImage,
    ManageMovieImageMutationKeys,
    MoviePosterImageFormSchema,
    useMoviePosterImageSubmitForm,
    useMoviePosterImageSubmitMutation,
    useMoviePosterImageDeleteMutation,
}

export type {
    UploadPosterImageConfig,
    RemovePosterImageConfig,
    MoviePosterImageFormData,
    MoviePosterImageFormValues,
}