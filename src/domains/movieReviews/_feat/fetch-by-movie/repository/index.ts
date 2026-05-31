import {ReviewsByMovieBaseURL} from "@/domains/movieReviews/_feat/fetch-by-movie/repository/baseURL.ts";
import {
    getFetchFeaturedReviewsByMovie,
    getFetchReviewDetailsByMovie,
    getFetchReviewsByMovie
} from "@/domains/movieReviews/_feat/fetch-by-movie/repository/repository.ts";
import {
    FetchPaginatedReviewsByMovieConfig,
    FetchReviewsByMovieConfig
} from "@/domains/movieReviews/_feat/fetch-by-movie/repository/repository.types.ts";

export {
    ReviewsByMovieBaseURL,
    getFetchReviewsByMovie,
    getFetchReviewDetailsByMovie,
    getFetchFeaturedReviewsByMovie,
}

export type {
    FetchReviewsByMovieConfig,
    FetchPaginatedReviewsByMovieConfig,
}