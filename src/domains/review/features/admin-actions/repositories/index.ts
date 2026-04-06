import {
    patchResetReviewDisplayName, patchResetReviewLikes, patchSetReviewRating,
    patchToggleReviewPublicity
} from "@/domains/review/features/admin-actions/repositories/repository.ts";
import {
    PatchResetReviewDisplayNameConfig, PatchResetReviewLikesConfig, PatchSetReviewRatingConfig,
    PatchToggleReviewPublicityConfig
} from "@/domains/review/features/admin-actions/repositories/repository.types.ts";

export {
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

