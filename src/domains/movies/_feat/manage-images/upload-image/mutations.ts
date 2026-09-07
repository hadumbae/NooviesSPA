/**
 * @fileoverview React Query mutation hooks for submitting movie poster and banner images.
 */

import {ManageMovieImageMutationKeys} from "@/domains/movies/_feat/manage-images/mutationKeys.ts";
import {
    createMovieImageUploadMutation
} from "@/domains/movies/_feat/manage-images/upload-image/factory.ts";
import {
    patchUploadMovieBannerImage,
    patchUploadMoviePosterImage
} from "@/domains/movies/_feat/manage-images/upload-image/repository.ts";

/** Custom React Query hook for submitting and uploading a movie poster image. */
export const useSubmitMoviePosterImage = createMovieImageUploadMutation({
    key: ManageMovieImageMutationKeys.submitPoster(),
    upload: patchUploadMoviePosterImage
});

/** Custom React Query hook for submitting and uploading a movie banner image. */
export const useSubmitMovieBannerImage = createMovieImageUploadMutation({
    key: ManageMovieImageMutationKeys.submitBanner(),
    upload: patchUploadMovieBannerImage
});