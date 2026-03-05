/**
 * @file Aggregated multi-query hook for the Movie Reviews page.
 *
 * useMovieInfoReviewsPageQueries.ts
 */

import useFetchMovieBySlug from "@/pages/movies/hooks/queries/useFetchMovieBySlug.ts";
import { useFetchReviewDetailsByMovie } from "@/pages/movies/fetch/movie-reviews/useFetchReviewDetailsByMovie.ts";
import useParsedPaginationValue from "@/common/hooks/search-params/useParsedPaginationValue.ts";
import { MovieDetailsSchema } from "@/pages/movies/schema/movie/Movie.schema.ts";
import { QueryDefinition } from "@/common/type/query/loader/MultiQuery.types.ts";
import {
    ReviewDetailsByMovie,
    ReviewDetailsByMovieSchema
} from "@/pages/review/schemas/models/ReviewDetailsByMovieSchema.ts";
import { MovieDetails } from "@/pages/movies/schema/movie/Movie.types.ts";

/**
 * Parameters for useMovieInfoReviewsPageQueries.
 */
type HookParams = {
    /**
     * Slug identifier for the movie whose reviews are being displayed.
     */
    movieSlug: string;
};

/**
 * Combined, schema-validated data returned by the Movie Reviews page loader.
 *
 * This represents the fully parsed and type-safe data structure
 * expected after all queries resolve successfully.
 */
export type MovieInfoReviewsPageData = {
    /**
     * Fully populated movie details.
     */
    movie: MovieDetails;

    /**
     * Paginated review details, including aggregate rating
     * and optional user-specific review.
     */
    reviewDetails: ReviewDetailsByMovie;
};

/**
 * Composes the required queries for the Movie Reviews page.
 */
export function useMovieInfoReviewsPageQueries(
    { movieSlug }: HookParams
): QueryDefinition[] {
    const { value: page } = useParsedPaginationValue("page", 1);
    const REVIEWS_PER_PAGE = 20;

    const movieQuery = useFetchMovieBySlug({
        slug: movieSlug,
        config: { populate: true, virtuals: true }
    });

    const parsed = MovieDetailsSchema.safeParse(movieQuery.data);
    const movieID = parsed.success ? parsed.data._id : null;

    const reviewQuery = useFetchReviewDetailsByMovie({
        movieID: movieID!,
        page,
        perPage: REVIEWS_PER_PAGE,
        config: { populate: true, virtuals: true },
        options: { enabled: !!movieID },
    });

    return [
        { query: movieQuery, key: "movie", schema: MovieDetailsSchema },
        { query: reviewQuery, key: "reviewDetails", schema: ReviewDetailsByMovieSchema },
    ];
}