/**
 * @fileoverview Composes data queries for the movie reviews page.
 *
 */

import {useFetchReviewDetailsByMovie} from "@/domains/review/_feat/fetch-by-movie/useFetchReviewDetailsByMovie.ts";
import {QueryDefinition} from "@/common/type/query/loader/MultiQuery.types.ts";
import {MovieDetails, MovieDetailsSchema} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {useFetchMovieBySlug} from "@/domains/movies/_feat/crud-hooks";
import {MovieReviewSummaryData, MovieReviewSummarySchema} from "@/domains/review/schemas/models";

/** Parameters for the useMovieInfoReviewsPageQueries hook. */
type HookParams = {
    movieSlug: string;
    page: number;
    perPage: number;
};

/** Schema-validated data for the Movie Reviews page. */
export type MovieInfoReviewsPageData = {
    movie: MovieDetails;
    reviewDetails: MovieReviewSummaryData;
};

/**
 * Builds the query set required for the Movie Reviews page.
 * Fetches movie metadata and paginated review details based on a slug.
 */
export function useMovieInfoReviewsPageQueries(
    {movieSlug, page, perPage}: HookParams
): QueryDefinition[] {
    const movieQuery = useFetchMovieBySlug({
        schema: MovieDetailsSchema,
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
        {query: reviewQuery, key: "reviewDetails", schema: MovieReviewSummarySchema},
    ];
}