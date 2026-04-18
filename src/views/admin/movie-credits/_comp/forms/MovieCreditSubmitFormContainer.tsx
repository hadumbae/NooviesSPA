/**
 * @file MovieCreditSubmitFormContainer.tsx
 *
 * Data container for the movie credit submission form.
 * Handles queries, mutations, and form orchestration.
 */

import useMovieCreditSubmitForm from "@/domains/moviecredit/_feat/submit-data/useMovieCreditSubmitForm.ts";
import useMovieCreditSubmitMutation from "@/domains/moviecredit/_feat/crud/useMovieCreditSubmitMutation.ts";
import {MovieQueryFilters} from "@/domains/movies/schema/queries/MovieQueryOption.types.ts";
import {MovieCreditForm, MovieCreditFormValues} from "@/domains/moviecredit/_feat/submit-data/MovieCreditForm.types.ts";
import {Loader} from "lucide-react";
import ErrorMessageDisplay from "@/common/components/errors/ErrorMessageDisplay.tsx";
import CombinedValidatedQueryBoundary from "@/common/components/query/combined/CombinedValidatedQueryBoundary.tsx";
import CombinedQueryBoundary from "@/common/components/query/combined/CombinedQueryBoundary.tsx";
import MovieCreditSubmitFormView from "@/views/admin/movie-credits/_comp/forms/MovieCreditSubmitFormView.tsx";
import {FormContainerProps} from "@/common/type/form/HookFormProps.ts";
import {PersonArray} from "@/domains/persons/schema/person/Person.types.ts";
import {PersonQueryFilters} from "@/domains/persons/schema/query-options/PersonQueryOption.types.ts";
import {RoleTypeQueryFilters} from "@/domains/roletype/schema/query-options/RoleTypeQueryOptions.types.ts";
import {RoleTypeArray} from "@/domains/roletype/schema/model/RoleType.types.ts";
import {RoleTypeDepartment} from "@/domains/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import useMovieCreditFormDataQueries from "@/domains/moviecredit/_feat/submit-data/useMovieCreditFormDataQueries.ts";
import {MovieArray} from "@/domains/movies/schema/movie/MovieArraySchema.ts";
import {MovieCredit} from "@/domains/moviecredit/schemas/model/MovieCreditSchema.ts";
import {
    MovieCreditDetails
} from "@/domains/moviecredit/schemas/model/MovieCreditDetailsSchema.ts";

type ContainerProps = FormContainerProps<MovieCreditDetails, MovieCredit, MovieCreditFormValues> & {
    /** Optional filters for movie lookup */
    movieFilters?: MovieQueryFilters;

    /** Optional filters for person lookup */
    personFilters?: PersonQueryFilters;

    /** Optional filters for role type lookup */
    roleTypeFilters?: RoleTypeQueryFilters;
};

/**
 * Container component for submitting movie credits.
 *
 * Responsibilities:
 * - Initializes form state
 * - Fetches related reference data
 * - Handles create/update mutation lifecycle
 * - Manages query loading and validation boundaries
 *
 * @remarks
 * - Query execution is automatically disabled for fields listed in `disableFields`
 * - Role types are dynamically filtered by selected department
 *
 * @returns Form view wrapped in query boundaries
 */
const MovieCreditSubmitFormContainer = (props: ContainerProps) => {
    const {
        presetValues,
        disableFields,
        editEntity,
        movieFilters,
        personFilters,
        roleTypeFilters,
        onSubmitSuccess,
        ...mutationProps
    } = props;

    // Initialize the form state with preset values or entity data
    const form = useMovieCreditSubmitForm({presetValues, credit: editEntity});

    const resetOnSuccess = (credit: MovieCreditDetails) => {
        form.reset();
        onSubmitSuccess?.(credit);
    }

    const mutation = useMovieCreditSubmitMutation({
        form,
        onSubmitSuccess: resetOnSuccess,
        editID: editEntity?._id,
        ...mutationProps
    });

    // Filter role types by selected department if available
    const formDepartment = form.watch("department") as (RoleTypeDepartment | undefined);
    const roleTypeQueries = {...roleTypeFilters, ...(formDepartment && {department: formDepartment})};

    const {queries, validationQueries} = useMovieCreditFormDataQueries({
        movieFilters,
        personFilters,
        roleTypeFilters: roleTypeQueries,
        disableFields: disableFields ?? [],
    });

    // Form submission handler
    const handleSubmit = (values: MovieCreditFormValues) => {
        console.log("Movie Credit Form Values:", values);
        mutation.mutate(values as MovieCreditForm);
    };

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

export default MovieCreditSubmitFormContainer;
