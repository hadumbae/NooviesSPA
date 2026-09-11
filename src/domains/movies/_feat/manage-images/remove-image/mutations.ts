/**
 * @fileoverview React Query mutation hooks for removing movie poster and banner images.
 */

import {createMovieImageDeleteMutations} from "@/domains/movies/_feat/manage-images/remove-image/factory.ts";
import {ManageMovieImageMutationKeys} from "@/domains/movies/_feat/manage-images/mutationKeys.ts";
import {patchRemoveBannerImage, patchRemovePosterImage} from "@/domains/movies/_feat/manage-images/remove-image/repository.ts";

/** Custom React Query hook for removing a movie poster image. */
export const useDeleteMoviePosterImage = createMovieImageDeleteMutations({
    key: ManageMovieImageMutationKeys.removePoster(),
    removeImage: patchRemovePosterImage,
});

/** Custom React Query hook for removing a movie banner image. */
export const useDeleteMovieBannerImage = createMovieImageDeleteMutations({
    key: ManageMovieImageMutationKeys.removeBanner(),
    removeImage: patchRemoveBannerImage,
});