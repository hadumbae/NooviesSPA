/**
 * @file Movie info overview page query composition.
 * useMovieInfoOverviewPageQueries.ts
 */

import useFetchMovieBySlug from "@/domains/movies/hooks/queries/useFetchMovieBySlug.ts";
import {useFetchMovieCredits} from "@/domains/moviecredit/_feat/crud-hooks/useFetchMovieCredits.ts";
import {QueryDefinition} from "@/common/type/query/loader/MultiQuery.types.ts";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {useFetchReviewDetailsByMovie} from "@/domains/movies/fetch/movie-reviews/useFetchReviewDetailsByMovie.ts";
import {MovieReviewViewDataSchema} from "@/domains/review/schemas/models/MovieReviewViewDataSchema.ts";
import {MovieDetailsSchema} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {
    MovieCreditDetailsArraySchema
} from "@/domains/moviecredit/schemas/model/MovieCreditDetailsArraySchema.ts";

/**
 * Parameters for overview page queries.
 */
type QueryParams = {
    slug: SlugString;
}

/**
 * Composes overview page queries for movie, credits,
 * and review details.
 */
export function useMovieInfoOverviewPageQueries(
    {slug}: QueryParams,
): QueryDefinition[] {
    const movieQuery = useFetchMovieBySlug({
        slug,
        config: {virtuals: true, populate: true},
    });

    const creditQuery = useFetchMovieCredits({
        queries: {movieSlug: slug},
        config: {populate: true, virtuals: true},
    });

    const parsed = MovieDetailsSchema.safeParse(movieQuery.data);
    const movieID = parsed.success ? parsed.data._id : null;

    const reviewQuery = useFetchReviewDetailsByMovie({
        movieID: movieID!,
        page: 1,
        perPage: 3,
        config: {populate: true, virtuals: true},
        options: {enabled: !!movieID},
    });

    return [
        {query: movieQuery, key: "movie", schema: MovieDetailsSchema},
        {query: creditQuery, key: "credits", schema: MovieCreditDetailsArraySchema},
        {query: reviewQuery, key: "reviewDetails", schema: MovieReviewViewDataSchema},
    ];
}