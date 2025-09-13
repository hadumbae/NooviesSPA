import {FC} from 'react';
import useMovieCreditSubmitForm from "@/pages/moviecredit/hooks/forms/useMovieCreditSubmitForm.ts";
import useMovieCreditSubmitMutation from "@/pages/moviecredit/hooks/mutations/useMovieCreditSubmitMutation.ts";
import {MovieCredit} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import {MovieQueryFilters} from "@/pages/movies/schema/queries/MovieFilter.types.ts";
import {MovieCreditForm, MovieCreditFormValues} from "@/pages/moviecredit/schemas/form/MovieCreditForm.types.ts";
import useFetchMovies from "@/pages/movies/hooks/queries/useFetchMovies.ts";
import useFetchPersons from "@/pages/persons/hooks/fetch/useFetchPersons.ts";
import {MovieArraySchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {PersonArraySchema} from "@/pages/persons/schema/person/Person.schema.ts";
import {Loader} from "lucide-react";
import ErrorMessageDisplay from "@/common/components/errors/ErrorMessageDisplay.tsx";
import CombinedValidatedQueryBoundary from "@/common/components/query/combined/CombinedValidatedQueryBoundary.tsx";
import CombinedQueryBoundary from "@/common/components/query/combined/CombinedQueryBoundary.tsx";
import MovieCreditSubmitFormView from "@/pages/moviecredit/components/forms/MovieCreditSubmitFormView.tsx";
import {FormContainerProps} from "@/common/type/form/HookFormProps.ts";
import {MovieArray} from "@/pages/movies/schema/movie/Movie.types.ts";
import {PersonArray} from "@/pages/persons/schema/person/Person.types.ts";
import {PersonQueryFilters} from "@/pages/persons/schema/queries/PersonFilter.types.ts";
import useFetchRoleTypes from "@/pages/roletype/hooks/fetch/useFetchRoleTypes.ts";
import {RoleTypeQueryFilters} from "@/pages/roletype/schema/query-options/RoleTypeQueryOptions.types.ts";
import {RoleTypeArraySchema} from "@/pages/roletype/schema/model/RoleType.schema.ts";
import {RoleTypeArray} from "@/pages/roletype/schema/model/RoleType.types.ts";
import {RoleTypeDepartment} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import {ManagedUseQuery} from "@/common/type/query/ManagedUseQuery.ts";
import activeUseQueriesOnly from "@/common/utility/activeUseQueriesOnly.ts";

/**
 * Props for `MoviePersonSubmitFormContainer`.
 *
 * Extends {@link FormContainerProps} for managing form state, preset values, and submission.
 * Optionally accepts filters for movies and persons to pre-populate select fields.
 *
 * @template TData - The type of the entity managed by the form (here {@link MovieCredit}).
 */
type ContainerProps = FormContainerProps<MovieCredit, MovieCredit, MovieCreditFormValues> & {
    /** Optional filters to apply when fetching movies for the form */
    movieFilters?: MovieQueryFilters;
    /** Optional filters to apply when fetching persons for the form */
    personFilters?: PersonQueryFilters;
    roleTypeFilters?: RoleTypeQueryFilters;
};

/**
 * Container component for submitting a movie credit.
 *
 * Handles fetching related movies and persons, manages the form state, and handles
 * submission via {@link useMovieCreditSubmitMutation}. Utilizes
 * {@link CombinedQueryBoundary} and {@link CombinedValidatedQueryBoundary} to manage
 * loading, error, and schema validation states.
 *
 * @param props - {@link ContainerProps} including preset values, editing state, filters, and mutation callbacks.
 *
 * @returns A React functional component rendering {@link MovieCreditSubmitFormView} once
 * queries are loaded and validated.
 *
 * @remarks
 * - Uses {@link useMovieCreditSubmitForm} to manage form state and validation.
 * - Uses {@link useMovieCreditSubmitMutation} to handle create/update operations with success/error handling.
 * - Fetches movies via {@link useFetchMovies} and persons via {@link useFetchPersons}.
 * - Supports combined query boundaries for loading and error states using {@link CombinedQueryBoundary} and {@link CombinedValidatedQueryBoundary}.
 *
 * @example
 * ```tsx
 * <MoviePersonSubmitFormContainer
 *   presetValues={{ title: "", role: "" }}
 *   disableFields={false}
 *   isEditing={false}
 *   entity={undefined}
 *   movieFilters={{ title: "Inception" }}
 *   personFilters={{ nationality: "US" }}
 *   onSubmitSuccess={(data) => console.log("Submitted:", data)}
 * />
 * ```
 */
const MoviePersonSubmitFormContainer: FC<ContainerProps> = (props) => {
    const {
        presetValues,
        disableFields,
        isEditing,
        entity,
        movieFilters,
        personFilters,
        roleTypeFilters,
        ...mutationProps
    } = props;

    const form = useMovieCreditSubmitForm({presetValues, credit: entity});

    console.log("FOrm:", form.formState.errors);

    const mutation = useMovieCreditSubmitMutation({form, ...mutationProps});
    const handleSubmit = (values: MovieCreditFormValues) => {
        console.log("Movie Credit Form Values : ", values);
        mutation.mutate(values as MovieCreditForm);
    }

    const department = form.watch("department") as (RoleTypeDepartment | undefined);
    const roleTypeQueries = {
        ...roleTypeFilters,
        ...(department && {department}),
    };

    const enableMovieQuery = !disableFields?.includes("movie");
    const enablePersonQuery = !disableFields?.includes("person");
    const enableRoleTypeQuery = !disableFields?.includes("roleType");

    const movieQuery = useFetchMovies({queries: movieFilters, options: {enabled: enableMovieQuery}});
    const personQuery = useFetchPersons({queries: personFilters, options: {enabled: enablePersonQuery}});
    const roleTypeQuery = useFetchRoleTypes({queries: roleTypeQueries, options: {enabled: enableRoleTypeQuery}});

    const managedQueries: ManagedUseQuery[] = [
        {key: "movies", query: movieQuery, schema: MovieArraySchema, enabled: enableMovieQuery},
        {key: "persons", query: personQuery, schema: PersonArraySchema, enabled: enablePersonQuery},
        {key: "roleTypes", query: roleTypeQuery, schema: RoleTypeArraySchema, enabled: enableRoleTypeQuery},
    ]

    const {queries, validationQueries} = activeUseQueriesOnly(managedQueries);

    return (
        <CombinedQueryBoundary
            queries={queries}
            loaderComponent={Loader}
            loaderClassName={"animate-spin"}
            errorComponent={ErrorMessageDisplay}
        >
            <CombinedValidatedQueryBoundary
                queries={validationQueries}
                loaderComponent={Loader}
                loaderClassName={"animate-spin"}
                errorComponent={ErrorMessageDisplay}
            >
                {(data) => {
                    const {movies = [], persons = [], roleTypes = []} = data as {
                        movies?: MovieArray;
                        persons?: PersonArray;
                        roleTypes?: RoleTypeArray;
                    };

                    return (
                        <MovieCreditSubmitFormView
                            form={form}
                            submitHandler={handleSubmit}
                            mutation={mutation}
                            movies={movies}
                            persons={persons}
                            roleTypes={roleTypes}
                            disableFields={disableFields}
                        />
                    );
                }}
            </CombinedValidatedQueryBoundary>
        </CombinedQueryBoundary>
    );
};

export default MoviePersonSubmitFormContainer;
