import {
    patchResetReviewDisplayName,
    patchResetReviewLikes,
    patchSetReviewRating,
    patchToggleReviewPublicity
} from "@/domains/movieReviews/_feat/admin-actions/repositories/repository.ts";
import {
    PatchResetReviewDisplayNameConfig,
    PatchResetReviewLikesConfig,
    PatchSetReviewRatingConfig,
    PatchToggleReviewPublicityConfig
} from "@/domains/movieReviews/_feat/admin-actions/repositories/repository.types.ts";
import {MovieReviewAdminActionsBaseURL} from "@/domains/movieReviews/_feat/admin-actions/repositories/baseURL.ts";

export {
    MovieReviewAdminActionsBaseURL,
    patchToggleReviewPublicity,
    patchResetReviewDisplayName,
    patchResetReviewLikes,
    patchSetReviewRating,
}

export type {
    PatchToggleReviewPublicityConfig,
    PatchResetReviewDisplayNameConfig,
    PatchResetReviewLikesConfig,
    PatchSetReviewRatingConfig,
}

