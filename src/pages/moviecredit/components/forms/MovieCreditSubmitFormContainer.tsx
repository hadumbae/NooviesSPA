import {FC} from 'react';
import useMovieCreditSubmitForm from "@/pages/moviecredit/hooks/forms/useMovieCreditSubmitForm.ts";
import useMovieCreditSubmitMutation from "@/pages/moviecredit/hooks/mutations/useMovieCreditSubmitMutation.ts";
import {MovieCredit} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import {MovieQueryFilters} from "@/pages/movies/schema/queries/MovieFilter.types.ts";
import {MovieCreditForm, MovieCreditFormValues} from "@/pages/moviecredit/schemas/form/MovieCreditForm.types.ts";
import {Loader} from "lucide-react";
import ErrorMessageDisplay from "@/common/components/errors/ErrorMessageDisplay.tsx";
import CombinedValidatedQueryBoundary from "@/common/components/query/combined/CombinedValidatedQueryBoundary.tsx";
import CombinedQueryBoundary from "@/common/components/query/combined/CombinedQueryBoundary.tsx";
import MovieCreditSubmitFormView from "@/pages/moviecredit/components/forms/MovieCreditSubmitFormView.tsx";
import {FormContainerProps} from "@/common/type/form/HookFormProps.ts";
import {MovieArray} from "@/pages/movies/schema/movie/Movie.types.ts";
import {PersonArray} from "@/pages/persons/schema/person/Person.types.ts";
import {PersonQueryFilters} from "@/pages/persons/schema/queries/PersonFilter.types.ts";
import {RoleTypeQueryFilters} from "@/pages/roletype/schema/query-options/RoleTypeQueryOptions.types.ts";
import {RoleTypeArray} from "@/pages/roletype/schema/model/RoleType.types.ts";
import {RoleTypeDepartment} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import {FormMutationEditingParams} from "@/common/type/form/FormMutationResultParams.ts";
import useMovieCreditFormDataQueries from "@/pages/moviecredit/hooks/forms/useMovieCreditFormDataQueries.ts";

/**
 * Props for {@link MovieCreditSubmitFormContainer}.
 *
 * Extends {@link FormContainerProps} for managing form state, preset values, and submission.
 * Optionally accepts filters for movies, persons, and role types to pre-populate select fields.
 *
 * All filter props and `disableFields` are optional, and the component handles undefined values gracefully.
 *
 * @template TData - The type of the entity managed by the form (here {@link MovieCredit}).
 */
type ContainerProps = FormContainerProps<MovieCredit, MovieCredit, MovieCreditFormValues> & {
    /** Optional filters to apply when fetching movies for the form */
    movieFilters?: MovieQueryFilters;

    /** Optional filters to apply when fetching persons for the form */
    personFilters?: PersonQueryFilters;

    /** Optional filters to apply when fetching role types for the form */
    roleTypeFilters?: RoleTypeQueryFilters;
}

/**
 * Container component for submitting a movie credit.
 *
 * Handles:
 * - Fetching related movies, persons, and role types.
 * - Managing form state with {@link useMovieCreditSubmitForm}.
 * - Handling create/update submissions via {@link useMovieCreditSubmitMutation}.
 * - Managing loading, error, and schema validation states using
 *   {@link CombinedQueryBoundary} and {@link CombinedValidatedQueryBoundary}.
 *
 * @param props - {@link ContainerProps} including optional preset values, editing state, filters, and mutation callbacks.
 *
 * @returns A React functional component rendering {@link MovieCreditSubmitFormView} once
 * queries are loaded and validated.
 *
 * @remarks
 * - Uses {@link useMovieCreditFormDataQueries} to aggregate and validate movie, person, and role type queries.
 * - All optional props (`movieFilters`, `personFilters`, `roleTypeFilters`, `disableFields`) are handled safely; the component works correctly if any are undefined.
 * - Dynamically disables queries for fields listed in `disableFields` to avoid unnecessary network requests.
 *
 * @example
 * ```tsx
 * <MovieCreditSubmitFormContainer
 *   presetValues={{ role: "Lead Actor" }}
 *   disableFields={['department']}
 *   isEditing={false}
 *   entity={undefined}
 *   movieFilters={{ title: "Inception" }}
 *   personFilters={{ nationality: "US" }}
 *   roleTypeFilters={{ department: "Acting" }}
 *   onSubmitSuccess={(data) => console.log("Submitted:", data)}
 * />
 * ```
 */
const MovieCreditSubmitFormContainer: FC<ContainerProps> = (props) => {
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

    // Initialize the form state with preset values or entity data
    const form = useMovieCreditSubmitForm({presetValues, credit: entity});

    // Prepare mutation params for create or edit
    const mutationParams: FormMutationEditingParams = isEditing === true
        ? {isEditing: true, _id: entity._id, ...mutationProps}
        : {isEditing: false, ...mutationProps};

    const mutation = useMovieCreditSubmitMutation({form, ...mutationParams});

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
        form.reset();
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
