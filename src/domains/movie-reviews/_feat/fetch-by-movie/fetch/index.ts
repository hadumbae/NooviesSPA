import {
    useFetchFeaturedReviewsByMovie
} from "@/domains/movie-reviews/_feat/fetch-by-movie/fetch/useFetchFeaturedReviewsByMovie.ts";
import {
    useFetchReviewDetailsByMovie
} from "@/domains/movie-reviews/_feat/fetch-by-movie/fetch/useFetchReviewDetailsByMovie.ts";
import {useFetchReviewsByMovie} from "@/domains/movie-reviews/_feat/fetch-by-movie/fetch/useFetchReviewsByMovie.ts";
import {FetchByMovieQueryKeys} from "@/domains/movie-reviews/_feat/fetch-by-movie/fetch/queryKeys.ts";

export {
    FetchByMovieQueryKeys,
    useFetchFeaturedReviewsByMovie,
    useFetchReviewDetailsByMovie,
    useFetchReviewsByMovie,
}