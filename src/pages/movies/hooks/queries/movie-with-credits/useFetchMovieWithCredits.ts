import useFetchMovie from "@/pages/movies/hooks/queries/useFetchMovie.ts";
import useFetchAllMovieCredits from "@/pages/moviecredit/hooks/queries/useFetchAllMovieCredits.ts";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {MovieSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {
    useFetchMovieWithCreditsParams
} from "@/pages/movies/hooks/queries/movie-with-credits/useFetchMovieWithCreditsParams.ts";
import {
    UseFetchMovieWithCreditsReturns
} from "@/pages/movies/hooks/queries/movie-with-credits/useFetchMovieWithCreditsReturns.ts";
import {MovieCreditDetailsArraySchema} from "@/pages/moviecredit/schemas/model/MovieCredit.schema.ts";

/**
 * Fetches a movie and its associated crew and cast data, then validates each using defined Zod schemas.
 *
 * @param params - Parameters including the movie ID, whether to populate the movie document,
 * and any filters to apply to credit queries.
 *
 * @returns An object containing:
 * - `data`: The parsed and validated movie, crew, and cast data (or `null`s if validation failed).
 * - `parseSuccess`: Whether all data was successfully validated.
 * - `parseError`: Any validation error encountered.
 * - `queryError`: Any error encountered during the query phase.
 * - `isPending`: Whether any query is still loading.
 * - `isError`: Whether any query encountered an error.
 */
export default function useFetchMovieWithCredits(params: useFetchMovieWithCreditsParams): UseFetchMovieWithCreditsReturns {
    const {movieID, populateMovie = false, creditFilters = {}} = params;
    const filterQuery = {...creditFilters, movie: movieID};

    // Queries

    const movieQuery = useFetchMovie({_id: movieID, populate: populateMovie, virtuals: false});
    const crewQuery = useFetchAllMovieCredits({populate: true, filters: {...filterQuery, roleType: "CREW"}});
    const castQuery = useFetchAllMovieCredits({populate: true, filters: {...filterQuery, roleType: "CAST"}});
    const queries = [movieQuery, crewQuery, castQuery];

    const isPending = queries.some((q) => q.isPending);
    const isError = queries.some((q) => q.isError);
    const queryError = queries.find((q) => q.isError)?.error ?? null;

    // Validations

    const movieValidation = useValidateData({data: movieQuery.data, schema: MovieSchema, isPending});
    const crewValidation = useValidateData({data: crewQuery.data, schema: MovieCreditDetailsArraySchema, isPending});
    const castValidation = useValidateData({data: castQuery.data, schema: MovieCreditDetailsArraySchema, isPending});
    const validations = [movieValidation, crewValidation, castValidation];

    const parseSuccess = movieValidation.success && crewValidation.success && castValidation.success;
    const baseReturns = {queryError, isPending, isError};

    if (!parseSuccess) {
        return {
            ...baseReturns,
            parseSuccess: false,
            data: {movie: null, crew: null, cast: null},
            parseError: validations.find(v => v.error)?.error || null,
        };
    }

    return {
        ...baseReturns,
        parseSuccess: true,
        data: {movie: movieValidation.data, crew: crewValidation.data, cast: castValidation.data},
        parseError: null,
    };
}