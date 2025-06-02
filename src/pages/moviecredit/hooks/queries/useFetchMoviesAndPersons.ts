import useFetchAllPersons from "@/pages/persons/hooks/useFetchAllPersons.ts";
import QueryFilters from "@/common/type/QueryFilters.ts";
import useValidateData from "@/common/hooks/validation/useValidateData.ts";
import {PersonArraySchema} from "@/pages/persons/schema/PersonArraySchema.ts";
import useFetchAllMovies from "@/pages/movies/hooks/queries/useFetchAllMovies.ts";
import {MovieArraySchema} from "@/pages/movies/schema/model/MovieArraySchema.ts";

type FetchParams = {
    populate?: boolean;
    virtuals?: boolean;
    personFilters?: QueryFilters;
    movieFilters?: QueryFilters;
}

export default function useFetchMoviesAndPersons(params: FetchParams) {
    const {personFilters = {}, movieFilters = {}, populate = false, virtuals = false} = params;

    const movieQuery = useFetchAllMovies({populate, virtuals, filters: movieFilters});
    const personQuery = useFetchAllPersons({populate, virtuals, filters: personFilters});

    const queries = [movieQuery, personQuery];

    const isPending = queries.some(({isPending}) => isPending);
    const isError = queries.some(({isError}) => isError);
    const queryError = queries.find(({isError}) => isError)?.error ?? null;

    const movieValidation = useValidateData({isPending, schema: MovieArraySchema, data: movieQuery.data});
    const personValidation = useValidateData({isPending, schema: PersonArraySchema, data: personQuery.data});

    const parseError = movieValidation.error ?? personValidation.error ?? null;

    return {
        data: {movies: movieValidation.data, persons: personValidation.data},
        isPending,
        isError,
        queryError,
        parseError,
    };
}