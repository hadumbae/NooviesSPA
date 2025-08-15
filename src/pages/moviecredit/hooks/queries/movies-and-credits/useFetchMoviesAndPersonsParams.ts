import {RequestOptions} from "@/common/type/repositories/EntityRequestParamTypes.ts";
import {PersonQueryFilters} from "@/pages/persons/schema/queries/PersonFilter.types.ts";
import {MovieQueryFilters} from "@/pages/movies/schema/queries/MovieFilter.types.ts";

export type UseFetchMoviesAndPersonsParams = RequestOptions & {
    personFilters?: PersonQueryFilters;
    movieFilters?: MovieQueryFilters;
}