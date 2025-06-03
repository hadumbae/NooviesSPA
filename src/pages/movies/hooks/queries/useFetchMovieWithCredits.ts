import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import useFetchMovie from "@/pages/movies/hooks/queries/useFetchMovie.ts";
import useFetchAllMovieCredits from "@/pages/moviecredit/hooks/queries/useFetchAllMovieCredits.ts";
import QueryFilters from "@/common/type/QueryFilters.ts";
import useValidateData from "@/common/hooks/validation/useValidateData.ts";
import {Movie, MovieSchema} from "@/pages/movies/schema/model/MovieSchema.ts";
import {
    MovieCreditPopulatedArraySchema, PopulatedMovieCreditArray
} from "@/pages/moviecredit/schemas/model/references/MovieCreditPopulatedArraySchema.ts";

type FetchParams = {
    movieID: ObjectId;
    populateMovie?: boolean,
    creditFilters?: QueryFilters
}

type FetchHookReturns = {
    data: { movie: Movie | null, crew: PopulatedMovieCreditArray | null, cast: PopulatedMovieCreditArray | null },
    errors: { query: Error | null, parse: Error | null },
    isPending: boolean,
    isError: boolean,
}

export default function useFetchMovieWithCredits(params: FetchParams): FetchHookReturns {
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
    const crewValidation = useValidateData({data: crewQuery.data, schema: MovieCreditPopulatedArraySchema, isPending});
    const castValidation = useValidateData({data: castQuery.data, schema: MovieCreditPopulatedArraySchema, isPending});
    const validations = [movieValidation, crewValidation, castValidation];

    const parseError = validations.find(v => v.error)?.error ?? null;

    return {
        data: {movie: movieValidation.data, crew: crewValidation.data, cast: castValidation.data},
        errors: {query: queryError, parse: parseError},
        isPending,
        isError,
    };
}