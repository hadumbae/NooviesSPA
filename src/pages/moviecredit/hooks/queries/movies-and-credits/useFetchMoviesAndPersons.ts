import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {
    UseFetchMoviesAndPersonsParams
} from "@/pages/moviecredit/hooks/queries/movies-and-credits/useFetchMoviesAndPersonsParams.ts";
import {
    UseFetchMoviesAndPersonsReturns
} from "@/pages/moviecredit/hooks/queries/movies-and-credits/UseFetchMoviesAndPersonsReturns.ts";
import useFetchPersons from "@/pages/persons/hooks/fetch/useFetchPersons.ts";
import useFetchMovies from "@/pages/movies/hooks/queries/useFetchMovies.ts";
import {PersonArraySchema} from "@/pages/persons/schema/person/Person.schema.ts";
import {PersonArray} from "@/pages/persons/schema/person/Person.types.ts";
import {MovieArraySchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {MovieArray} from "@/pages/movies/schema/movie/Movie.types.ts";

export default function useFetchMoviesAndPersons(
    params: UseFetchMoviesAndPersonsParams
): UseFetchMoviesAndPersonsReturns<MovieArray, PersonArray> {
    const {personFilters = {}, movieFilters = {}, populate = false, virtuals = false} = params;

    // Queries

    const movieQuery = useFetchMovies({populate, virtuals, ...movieFilters});
    const personQuery = useFetchPersons({populate, virtuals, ...personFilters});
    const queries = [movieQuery, personQuery];

    const isPending = queries.some(({isPending}) => isPending);
    const isError = queries.some(({isError}) => isError);
    const queryError = queries.find(({isError}) => isError)?.error ?? null;

    // Validation

    const movieValidation = useValidateData({isPending, schema: MovieArraySchema, data: movieQuery.data});
    const personValidation = useValidateData({isPending, schema: PersonArraySchema, data: personQuery.data});

    const parseSuccess = movieValidation.success && personValidation.success;
    const baseReturns = {isPending, isError, queryError};

    if (!parseSuccess) {
        return {
            ...baseReturns,
            parseSuccess: false,
            parseError: movieValidation.error ?? personValidation.error ?? null,
            data: {movies: null, persons: null},
        };
    }

    return {
        ...baseReturns,
        parseSuccess: true,
        parseError: null,
        data: {movies: movieValidation.data, persons: personValidation.data},
    };
}