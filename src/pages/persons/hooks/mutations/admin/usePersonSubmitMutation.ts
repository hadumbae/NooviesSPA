import {UseFormReturn} from "react-hook-form";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import PersonRepository from "@/pages/persons/repositories/PersonRepository.ts";
import {PersonSchema} from "@/pages/persons/schema/person/Person.schema.ts";
import {Person} from "@/pages/persons/schema/person/Person.types.ts";
import {PersonForm, PersonFormValues} from "@/pages/persons/schema/forms/PersonForm.types.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {MutationEditByIDParams, MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Parameters for submitting a `Person` form mutation.
 *
 * Extends {@link MutationOnSubmitParams} (excluding `onSubmitSuccess` and `onSubmitError`)
 * and merges with {@link MutationEditByIDParams} to support both create and update workflows.
 */
export type PersonSubmitParams =
    Omit<MutationOnSubmitParams, "onSubmitSuccess" | "onSubmitError"> &
    MutationEditByIDParams &
    {
        /**
         * The `react-hook-form` instance managing the `PersonFormValues` state.
         */
        form: UseFormReturn<PersonFormValues>;

        /**
         * Optional callback invoked when the mutation succeeds.
         *
         * @param person - The successfully created or updated `Person` object.
         */
        onSubmitSuccess?: (person: Person) => void;

        /**
         * Optional callback invoked when the mutation fails.
         *
         * @param error - The error returned from the failed submission.
         */
        onSubmitError?: (error: unknown) => void;
    };

/**
 * React hook for handling `Person` form submissions, supporting both create and update operations.
 *
 * Uses:
 * - **react-query**'s `useMutation` to manage request lifecycle.
 * - **react-hook-form** for form state.
 * - Zod validation (`PersonSchema`) to ensure server responses are valid.
 * - Toast notifications for user feedback.
 *
 * @param params - The mutation parameters including the form instance, editing mode, and optional callbacks/messages.
 *
 * @returns A `UseMutationResult` from `react-query`, typed as:
 *          - `data` → `Person` on success
 *          - `error` → `unknown` on failure
 *          - `variables` → `PersonForm` submitted
 *
 * @example
 * ```ts
 * const mutation = usePersonSubmitMutation({
 *   form,
 *   isEditing: true,
 *   _id: somePersonId,
 *   successMessage: "Person updated!",
 *   onSubmitSuccess: (person) => console.log("Updated:", person),
 * });
 *
 * form.handleSubmit(mutation.mutate);
 * ```
 */
export default function usePersonSubmitMutation(
    params: PersonSubmitParams
): UseMutationResult<Person, unknown, PersonForm> {
    const {
        form,
        _id,
        isEditing,
        onSubmitSuccess,
        onSubmitError,
        successMessage,
        errorMessage,
    } = params;

    const queryClient = useQueryClient();

    const submitPersonData = async (data: PersonForm) => {
        const action = isEditing
            ? () => PersonRepository.update<Person>({_id, data})
            : () => PersonRepository.create<Person>({data});

        const result = await handleMutationResponse({
            action,
            errorMessage: "Failed to submit person data. Please try again.",
        });

        const {data: person, success, error} = validateData({
            data: result,
            schema: PersonSchema,
            message: "Invalid data returned. Please try again."
        });

        if (!success || error) throw error;
        return person;
    }

    const onSuccess = async (person: Person) => {
        const message = `Person ${isEditing ? "updated" : "created"} successfully.`;
        toast.success(successMessage ?? message);

        await Promise.all([
            queryClient.invalidateQueries({queryKey: ["fetch_single_person"], exact: false}),
            queryClient.invalidateQueries({queryKey: ["fetch_person_by_query"], exact: false}),
        ]);

        onSubmitSuccess?.(person);
    }

    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Failed to submit person data. Please try again.";
        handleMutationFormError({form, error, displayMessage});
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ['single_person_submit'],
        mutationFn: submitPersonData,
        onSuccess,
        onError,
    });
}

