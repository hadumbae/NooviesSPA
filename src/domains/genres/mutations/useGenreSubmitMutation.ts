/**
 * @file React Query mutation hook for managing Genre creation and updates.
 * @filename useGenreSubmitMutation.ts
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import GenreRepository from "@/domains/genres/repositories/GenreRepository.ts";
import {UseFormReturn} from "react-hook-form";
import {toast} from "react-toastify";
import {GenreForm, GenreFormValues} from "@/domains/genres/schema/form/GenreForm.types.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {GenreQueryKeys} from "@/domains/genres/utilities/query/GenreQueryKeys.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

import {Genre, GenreSchema} from "@/domains/genres/schema/genre/GenreSchema.ts";

/**
 * Parameters for the {@link useGenreSubmitMutation} hook.
 */
export type UseGenreSubmitMutationParams =
    MutationOnSubmitParams<Genre> & {
    /** The ID of the genre to update; if omitted, a new genre is created. */
    editID?: ObjectId;
    /** The React Hook Form controller for the genre submission form. */
    form: UseFormReturn<GenreFormValues>;
};

/**
 * Handles the submission lifecycle for Genre entities, including validation and cache invalidation.
 * @param params - Configuration including lifecycle callbacks and form state.
 */
export default function useGenreSubmitMutation(
    params: UseGenreSubmitMutationParams
): UseMutationResult<Genre, unknown, GenreForm> {
    const {
        editID,
        form,
        onSubmitSuccess,
        onSubmitError,
        successMessage,
        errorMessage,
    } = params;

    const config = {populate: true, virtuals: true};
    const invalidateQueries = useInvalidateQueryKeys();

    /**
     * Internal execution logic for the mutation.
     * @param values - The validated form data to be persisted.
     */
    const submitGenre = async (values: GenreForm): Promise<Genre> => {
        const action = editID
            ? () => GenreRepository.update({_id: editID, data: values, config})
            : () => GenreRepository.create({data: values, config});

        const response = await handleMutationResponse({
            action,
            errorMessage: "Failed to submit genre data.",
        });

        const {success, error, data} = validateData({
            data: response,
            schema: GenreSchema,
            message: "Invalid genre response data.",
        });

        if (!success) throw error;
        return data;
    };

    /**
     * Post-success side effects: UI notifications and cache cleanup.
     */
    const onSuccess = async (genre: Genre) => {
        await invalidateQueries(
            [GenreQueryKeys.ids(), GenreQueryKeys.query(), GenreQueryKeys.paginated()],
            {exact: false},
        );

        if (successMessage) toast.success(successMessage);
        onSubmitSuccess?.(genre);
    };

    /**
     * Post-error side effects: Mapping errors to form state.
     */
    const onError = (error: unknown) => {
        handleMutationFormError({
            form,
            error,
            displayMessage: errorMessage,
        });

        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ["submit_genre"],
        mutationFn: submitGenre,
        onSuccess,
        onError,
    });
}