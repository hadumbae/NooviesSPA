import {MovieCreditFormValues} from "@/pages/moviecredit/schemas/form/MovieCreditForm.types.ts";
import useFetchPersons from "@/pages/persons/hooks/fetch/useFetchPersons.ts";
import useFetchRoleTypes from "@/pages/roletype/hooks/fetch/useFetchRoleTypes.ts";
import {ManagedUseQuery} from "@/common/type/query/ManagedUseQuery.ts";
import {MovieArraySchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {PersonArraySchema} from "@/pages/persons/schema/person/Person.schema.ts";
import {RoleTypeArraySchema} from "@/pages/roletype/schema/model/RoleType.schema.ts";
import activeUseQueriesOnly from "@/common/utility/query/activeUseQueriesOnly.ts";
import {MovieQueryFilters} from "@/pages/movies/schema/queries/MovieQueryOption.types.ts";
import {PersonQueryFilters} from "@/pages/persons/schema/queries/PersonQueryOption.types.ts";
import {RoleTypeQueryFilters} from "@/pages/roletype/schema/query-options/RoleTypeQueryOptions.types.ts";
import useFetchMovies from "@/pages/movies/hooks/queries/useFetchMovies.ts";

/**
 * Parameters for {@link useMovieCreditFormDataQueries}.
 *
 * @interface QueryParams
 */
type QueryParams = {
    /**
     * Array of form fields to disable.
     * Disabled fields will prevent their corresponding queries from executing.
     */
    disableFields: (keyof MovieCreditFormValues)[];

    /**
     * Optional filters to apply when fetching movies.
     */
    movieFilters?: MovieQueryFilters;

    /**
     * Optional filters to apply when fetching persons.
     */
    personFilters?: PersonQueryFilters;

    /**
     * Optional filters to apply when fetching role types.
     */
    roleTypeFilters?: RoleTypeQueryFilters;
};

/**
 * Custom hook that fetches data for the movie credit form.
 *
 * Provides queries for movies, persons, and role types.
 * Each query is conditionally enabled based on the `disableFields` array
 * to avoid unnecessary network requests.
 * Returns only the active queries and their validated schemas.
 *
 * @param {QueryParams} params - Parameters including disabled fields and optional query filters.
 *
 * @returns An object containing:
 * - `queries`: Array of active `ManagedUseQuery` objects for movies, persons, and role types.
 * - `validationQueries`: Array of active queries with schema validation applied.
 *
 * @remarks
 * - Uses {@link useFetchMovies}, {@link useFetchPersons}, and {@link useFetchRoleTypes}.
 * - Uses `activeUseQueriesOnly` to filter out disabled queries.
 * - Applies schema validation using {@link MovieArraySchema}, {@link PersonArraySchema}, and {@link RoleTypeArraySchema}.
 *
 * @example
 * ```ts
 * const {queries, validationQueries} = useMovieCreditFormDataQueries({
 *   disableFields: ['roleType'],
 *   movieFilters: { title: 'Inception' },
 *   personFilters: { nationality: 'US' }
 * });
 * ```
 */
export default function useMovieCreditFormDataQueries(params: QueryParams) {
    const {disableFields, movieFilters, personFilters, roleTypeFilters} = params;

    // Conditionally enable queries based on disabled fields
    const enableMovieQuery = !disableFields.includes("movie");
    const enablePersonQuery = !disableFields.includes("person");
    const enableRoleTypeQuery = !disableFields.includes("roleType");

    const movieQuery = useFetchMovies({queries: movieFilters, options: {enabled: enableMovieQuery}});
    const personQuery = useFetchPersons({queries: personFilters, options: {enabled: enablePersonQuery}});
    const roleTypeQuery = useFetchRoleTypes({queries: roleTypeFilters, options: {enabled: enableRoleTypeQuery}});

    const managedQueries: ManagedUseQuery[] = [
        {key: "movies", query: movieQuery, schema: MovieArraySchema, enabled: enableMovieQuery},
        {key: "persons", query: personQuery, schema: PersonArraySchema, enabled: enablePersonQuery},
        {key: "roleTypes", query: roleTypeQuery, schema: RoleTypeArraySchema, enabled: enableRoleTypeQuery},
    ];

    return activeUseQueriesOnly(managedQueries);
}