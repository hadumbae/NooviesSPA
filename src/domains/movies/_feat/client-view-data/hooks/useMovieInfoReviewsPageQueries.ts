/**
 * @fileoverview Composes and validates data queries for the movie reviews page.
 */

import {QueryDefinition} from "@/common/type/query/loader/MultiQuery.types.ts";
import {useFetchMovieBySlug} from "@/domains/movies/_feat/crud-hooks";
import {MovieDetails, MovieDetailsSchema} from "@/domains/movies/_schema/movie";
import {
    MovieReviewSummaryData,
    MovieReviewSummarySchema,
    useFetchReviewDetailsByMovie
} from "@/domains/movie-reviews/_feat/fetch-by-movie";

/** Props for the useMovieInfoReviewsPageQueries hook. */
type HookParams = {
    movieSlug: string;
    page: number;
    perPage: number;
};

/** Validated data structure for the movie reviews page. */
export type MovieInfoReviewsPageData = {
    movie: MovieDetails;
    reviewDetails: MovieReviewSummaryData;
};

/**
 * Hook that prepares query definitions for movie details and associated reviews.
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