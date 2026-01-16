/**
 * @file usePersonSubmitMutation.ts
 *
 * React Query mutation hook for creating or updating `Person` entities.
 *
 * Responsibilities:
 * - Executes create or update requests
 * - Normalizes API errors
 * - Validates responses against `PersonSchema`
 * - Maps server errors into form state
 * - Invalidates relevant person queries on success
 */

import {UseFormReturn} from "react-hook-form";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";
import PersonRepository from "@/pages/persons/repositories/PersonRepository.ts";
import {PersonSchema} from "@/pages/persons/schema/person/Person.schema.ts";
import {Person} from "@/pages/persons/schema/person/Person.types.ts";
import {PersonForm, PersonFormValues} from "@/pages/persons/schema/forms/PersonForm.types.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {PersonQueryKeys} from "@/pages/persons/utiliities/query/PersonQueryKeys.ts";

/**
 * Parameters for submitting `Person` form data.
 */
export type PersonSubmitParams = MutationOnSubmitParams<Person> & {
    /** Form instance controlling the submission. */
    form: UseFormReturn<PersonFormValues>;
    /** Optional ID enabling update mode when present. */
    editID?: ObjectId;
};

/**
 * Handles submission of `Person` form data.
 *
 * Automatically selects create or update behavior based on `editID`.
 */
export default function usePersonSubmitMutation(
    params: PersonSubmitParams
): UseMutationResult<Person, unknown, PersonForm> {
    const {
        form,
        onSubmitSuccess,
        onSubmitError,
        successMessage,
        errorMessage,
        editID,
    } = params;

    const invalidateQueries = useInvalidateQueryKeys();

    const submitPersonData = async (data: PersonForm) => {
        const action = editID
            ? () => PersonRepository.update({_id: editID, data})
            : () => PersonRepository.create({data});

        const result = await handleMutationResponse({
            action,
            errorMessage: "Failed to submit person data. Please try again.",
        });

        const {data: person, success, error} = validateData({
            data: result,
            schema: PersonSchema,
            message: "Invalid data returned. Please try again.",
        });

        if (!success || error) throw error;
        return person;
    };

    const onSuccess = (person: Person) => {
        invalidateQueries(
            [
                PersonQueryKeys.ids(),
                PersonQueryKeys.slugs(),
                PersonQueryKeys.query(),
                PersonQueryKeys.paginated(),
            ],
            {exact: false},
        );

        successMessage && toast.success(successMessage);
        onSubmitSuccess?.(person);
    };

    const onError = (error: unknown) => {
        handleMutationFormError({
            form,
            error,
            displayMessage: errorMessage ?? "An error occurred.",
        });

        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ['single_person_submit'],
        mutationFn: submitPersonData,
        onSuccess,
        onError,
    });
}
