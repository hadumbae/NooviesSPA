import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import {MovieCreditDetailsArray} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";

/**
 * Result returned when parsing succeeds.
 */
type ValidDataResults = {
    // Indicates successful parsing of all data.
    parseSuccess: true;

    // There is no parse error when parsing is successful.
    parseError: null;

    // Validated and parsed movie and credit data.
    data: {
        movie: Movie;
        crew: MovieCreditDetailsArray;
        cast: MovieCreditDetailsArray;
    };
};

/**
 * Result returned when parsing fails.
 */
type InvalidDataResults = {
    // Indicates that parsing failed for at least one dataset.
    parseSuccess: false;

    // The error encountered during validation, if any.
    parseError: Error | null;

    // Nulls returned for all data when parsing fails.
    data: {
        movie: null;
        crew: null;
        cast: null;
    };
};

/**
 * The return type of `useFetchMovieWithCredits`, representing
 * both query and validation state for movie and credit data.
 */
export type UseFetchMovieWithCreditsReturns = {
    // Any error that occurred during the data-fetching phase (not validation).
    queryError: Error | null;

    // Indicates if any of the underlying queries are still pending.
    isPending: boolean;

    // Indicates if any of the underlying queries resulted in an error.
    isError: boolean;
} & (ValidDataResults | InvalidDataResults);