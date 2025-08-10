import {RequestOptions} from "@/common/type/repositories/EntityRequestParamTypes.ts";
import {MovieFilterQuery} from "@/pages/movies/schema/queries/MovieFilterQuerySchema.ts";
import {PersonQueryFilters} from "@/pages/persons/schema/queries/PersonFilter.types.ts";

export type UseFetchMoviesAndPersonsParams = RequestOptions & {
    personFilters?: PersonQueryFilters;
    movieFilters?: MovieFilterQuery;
}