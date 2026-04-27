/**
 * @fileoverview Orchestrates data fetching for the Movie Credit administrative form.
 * Aggregates multiple domain queries (Movies, Persons, RoleTypes) and provides
 * a centralized loading state management through conditional execution.
 */

import useFetchRoleTypes from "@/domains/roletype/hooks/fetch/useFetchRoleTypes.ts";
import {ManagedUseQuery} from "@/common/type/query/ManagedUseQuery.ts";
import {PersonArraySchema} from "@/domains/persons/schema/person/Person.schema.ts";
import {RoleTypeArraySchema} from "@/domains/roletype/schema/model/RoleType.schema.ts";
import activeUseQueriesOnly from "@/common/utility/query/activeUseQueriesOnly.ts";
import {MovieQueryFilters} from "@/domains/movies/schema/queries/MovieQueryOption.types.ts";
import {PersonQueryFilters} from "@/domains/persons/schema/query-options/PersonQueryOption.types.ts";
import {RoleTypeQueryFilters} from "@/domains/roletype/schema/query-options/RoleTypeQueryOptions.types.ts";
import useFetchMovies from "@/domains/movies/hooks/queries/useFetchMovies.ts";
import {MovieArraySchema} from "@/domains/movies/schema/movie/MovieArraySchema.ts";
import {useFetchPersons} from "@/domains/persons/_feat/crud-hooks";

import {MovieCreditFormValues} from "@/domains/moviecredit/_feat/submit-data/schemas/MovieCreditFormValuesSchema.ts";

/**
 * Parameters for the {@link useMovieCreditFormDataQueries} hook.
 */
type QueryParams = {
    disableFields: (keyof MovieCreditFormValues)[];
    movieFilters?: MovieQueryFilters;
    personFilters?: PersonQueryFilters;
    roleTypeFilters?: RoleTypeQueryFilters;
};

/**
 * Custom hook to aggregate and manage the lifecycle of form-related data queries.
 */
export default function useMovieCreditFormDataQueries(params: QueryParams) {
    const {disableFields, movieFilters, personFilters, roleTypeFilters} = params;

    const enableMovieQuery = !disableFields.includes("movie");
    const enablePersonQuery = !disableFields.includes("person");
    const enableRoleTypeQuery = !disableFields.includes("roleType");

    const movieQuery = useFetchMovies({
        queries: movieFilters,
        options: {enabled: enableMovieQuery}
    });

    const roleTypeQuery = useFetchRoleTypes({
        queries: roleTypeFilters,
        options: {enabled: enableRoleTypeQuery}
    });

    const personQuery = useFetchPersons({
        schema: PersonArraySchema,
        queries: personFilters,
        options: {enabled: enablePersonQuery}
    });

    const managedQueries: ManagedUseQuery[] = [
        {key: "movies", query: movieQuery, schema: MovieArraySchema, enabled: enableMovieQuery},
        {key: "persons", query: personQuery, schema: PersonArraySchema, enabled: enablePersonQuery},
        {key: "roleTypes", query: roleTypeQuery, schema: RoleTypeArraySchema, enabled: enableRoleTypeQuery},
    ];

    return activeUseQueriesOnly(managedQueries);
}