import {RequestOptions} from "@/common/type/repositories/EntityRequestParamTypes.ts";
import {PersonFilterQuery} from "@/pages/persons/schema/queries/PersonFilterQuerySchema.ts";
import {MovieFilterQuery} from "@/pages/movies/schema/queries/MovieFilterQuerySchema.ts";

export type UseFetchMoviesAndPersonsParams = RequestOptions & {
    personFilters?: PersonFilterQuery;
    movieFilters?: MovieFilterQuery;
}