/**
 * @fileoverview React Query mutation hook for creating or updating Person entities.
 * Manages the full submission lifecycle including validation, error mapping,
 * and cache invalidation.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";
import PersonRepository from "@/domains/persons/_feat/crud/PersonRepository.ts";
import {PersonSchema} from "@/domains/persons/schema/person/Person.schema.ts";
import {Person} from "@/domains/persons/schema/person/Person.types.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {PersonFormData, PersonFormValues} from "@/domains/persons/_feat/submit-form/PersonFormSchema.ts";
import {MutationFormConfig, MutationResponseConfig} from "@/common/features/submit-data";
import {PersonCRUDQueryKeys} from "@/domains/persons/_feat/crud-hooks/index.ts";
import {PersonCRUDMutationKeys} from "@/domains/persons/_feat/crud-hooks/PersonCRUDMutationKeys.ts";

/**
 * Configuration parameters for the Person submission mutation.
 */
export type PersonSubmitParams = MutationFormConfig<PersonFormValues, PersonFormData> & {
    onSubmit?: MutationResponseConfig<Person>;
};

/**
 * Hook to handle the creation or update of Person records.
 */
export function useSubmitPersonData(
    params: PersonSubmitParams
): UseMutationResult<Person, unknown, PersonFormData> {
    const {
        form,
        resetForm,
        onSubmit: {
            onSubmitSuccess,
            onSubmitError,
            successMessage,
            errorMessage,
        } = {}
    } = params;

    const invalidateQueries = useInvalidateQueryKeys();

    const submitPersonData = async ({_id, ...data}: PersonFormData) => {
        const action = _id
            ? () => PersonRepository.update({_id, data})
            : () => PersonRepository.create({data});

        const {result} = await action();

        /** Validates the server response against the Person domain schema. */
        const {data: person, success, error} = validateData({
            data: result,
            schema: PersonSchema,
            message: "Invalid data returned. Please try again.",
        });

        if (!success || error) throw error;
        return person;
    };

    const onSuccess = (person: Person) => {
        invalidateQueries([PersonCRUDQueryKeys.all], {exact: false});

        resetForm && form.reset();
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
        mutationKey: PersonCRUDMutationKeys.submit(),
        mutationFn: submitPersonData,
        onSuccess,
        onError,
    });
}