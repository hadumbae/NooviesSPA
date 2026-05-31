import {ManageMyReviewsBaseURL} from "@/domains/review/_feat/my-reviews/repository/baseURL.ts";

import {
    deleteRemoveMovieReviewForCurrentUser,
    getFetchMovieReviewsByCurrentUser,
    patchUpdateMovieReviewForCurrentUser,
    postCreateMovieReviewForCurrentUser
} from "@/domains/review/_feat/my-reviews/repository/repository.ts";

import type {
    CreateCurrentUserMovieReviewConfig,
    CurrentUserMovieReviewsConfig,
    UpdateCurrentUserMovieReviewConfig,
} from "@/domains/review/_feat/my-reviews/repository/repository.types.ts";

export {
    ManageMyReviewsBaseURL,
    getFetchMovieReviewsByCurrentUser,
    postCreateMovieReviewForCurrentUser,
    patchUpdateMovieReviewForCurrentUser,
    deleteRemoveMovieReviewForCurrentUser,
}

export type {
    CurrentUserMovieReviewsConfig,
    CreateCurrentUserMovieReviewConfig,
    UpdateCurrentUserMovieReviewConfig,
}



