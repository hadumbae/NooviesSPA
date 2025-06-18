import {Person} from "@/pages/persons/schema/PersonSchema.ts";
import {Movie} from "@/pages/movies/schema/model/MovieSchema.ts";
import {RequestOptions} from "@/common/type/repositories/EntityRequestParamTypes.ts";

export type UseFetchMoviesAndPersonsParams = RequestOptions & {
    personFilters?: Partial<Person>;
    movieFilters?: Partial<Movie>;
}