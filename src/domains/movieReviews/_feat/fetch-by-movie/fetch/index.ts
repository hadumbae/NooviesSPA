import {
    useFetchFeaturedReviewsByMovie
} from "@/domains/movieReviews/_feat/fetch-by-movie/fetch/useFetchFeaturedReviewsByMovie.ts";
import {
    useFetchReviewDetailsByMovie
} from "@/domains/movieReviews/_feat/fetch-by-movie/fetch/useFetchReviewDetailsByMovie.ts";
import {useFetchReviewsByMovie} from "@/domains/movieReviews/_feat/fetch-by-movie/fetch/useFetchReviewsByMovie.ts";
import {FetchByMovieQueryKeys} from "@/domains/movieReviews/_feat/fetch-by-movie/fetch/queryKeys.ts";

export {
    FetchByMovieQueryKeys,
    useFetchFeaturedReviewsByMovie,
    useFetchReviewDetailsByMovie,
    useFetchReviewsByMovie,
}