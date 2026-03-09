/**
 * @file Composes data queries for the movie reviews page.
 * @filename useMovieInfoReviewsPageQueries.ts
 */

import useFetchMovieBySlug from "@/pages/movies/hooks/queries/useFetchMovieBySlug.ts";
import {useFetchReviewDetailsByMovie} from "@/pages/movies/fetch/movie-reviews/useFetchReviewDetailsByMovie.ts";
import {MovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {QueryDefinition} from "@/common/type/query/loader/MultiQuery.types.ts";
import {
    ReviewDetailsByMovie,
    ReviewDetailsByMovieSchema
} from "@/pages/review/schemas/models/ReviewDetailsByMovieSchema.ts";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";

/**
 * Parameters for useMovieInfoReviewsPageQueries.
 */
type HookParams = {
    /** Movie slug identifier */
    movieSlug: string;

    /** Active review page */
    page: number;

    /** Reviews per page */
    perPage: number;
};

/**
 * Schema-validated data for the Movie Reviews page.
 */
export type MovieInfoReviewsPageData = {
    /** Movie metadata */
    movie: MovieDetails;

    /** Paginated review data with aggregates */
    reviewDetails: ReviewDetailsByMovie;
};

/**
 * Builds the query set required for the Movie Reviews page.
 */
export function useMovieInfoReviewsPageQueries(
    {movieSlug, page, perPage}: HookParams
): QueryDefinition[] {
    const movieQuery = useFetchMovieBySlug({
        slug: movieSlug,
        config: {populate: true, virtuals: true}
    });

    const parsed = MovieDetailsSchema.safeParse(movieQuery.data);
    const movieID = parsed.success ? parsed.data._id : null;

    const reviewQuery = useFetchReviewDetailsByMovie({
        movieID: movieID!,
        page,
        perPage,
        config: {populate: true, virtuals: true},
        options: {enabled: !!movieID},
    });

    return [
        {query: movieQuery, key: "movie", schema: MovieDetailsSchema},
        {query: reviewQuery, key: "reviewDetails", schema: ReviewDetailsByMovieSchema},
    ];
}