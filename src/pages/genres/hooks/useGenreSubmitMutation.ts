import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import {UseFormReturn} from "react-hook-form";
import {GenreSchema} from "@/pages/genres/schema/genre/Genre.schema.ts";
import {toast} from "react-toastify";
import {GenreForm, GenreFormValues} from "@/pages/genres/schema/form/GenreForm.types.ts";
import {Genre} from "@/pages/genres/schema/genre/Genre.types.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {MutationEditByIDParams, MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Parameters for handling a Genre form submission mutation.
 *
 * Extends {@link MutationOnSubmitParams} (excluding its `onSubmitSuccess`)
 * and {@link MutationEditByIDParams}, with an additional required `form`
 * instance and an optional `onSubmitSuccess` callback specific to `Genre`.
 *
 * This type is designed for use with hooks or utilities that handle
 * creating or updating a `Genre` entity.
 *
 * @remarks
 * - When `isEditing` is `true`, an `_id` must be provided for the `Genre` being updated.
 * - When `isEditing` is `false` or omitted, the mutation will create a new `Genre`.
 *
 * @property form - The React Hook Form instance managing the `GenreFormValues`.
 * @property onSubmitSuccess - Optional callback invoked when the submission
 *                             succeeds, receiving the created or updated `Genre`.
 */
type useGenreSubmitMutationParams = Omit<MutationOnSubmitParams, "onSubmitSuccess">
    & MutationEditByIDParams & {
    form: UseFormReturn<GenreFormValues>;
    onSubmitSuccess?: (genre: Genre) => void;
};

/**
 * React Query mutation hook to submit a Genre form.
 *
 * Supports both creating a new Genre and updating an existing one based on `isEditing`.
 * Handles API interaction, response validation, error handling, toast notifications,
 * and invalidation of related queries.
 *
 * @param {useGenreSubmitMutationParams} params - Parameters controlling the mutation behavior.
 * @returns {UseMutationResult<Genre, Error, GenreForm>} The mutation object to manage state and callbacks.
 */
export default function useGenreSubmitMutation(
    params: useGenreSubmitMutationParams
): UseMutationResult<Genre, Error, GenreForm> {
    const {
        _id,
        form,
        onSubmitSuccess,
        onSubmitError,
        successMessage,
        errorMessage,
        isEditing,
    } = params;

    const queryClient = useQueryClient();

    const submitGenre = async (values: GenreForm) => {
        const action = isEditing
            ? () => GenreRepository.update({_id, data: values})
            : () => GenreRepository.create({data: values})

        const result = await handleMutationResponse({
            action,
            errorMessage: "Failed to submit genre data. Please try again.",
        });

        const {success, error, data: returnData} = validateData({
            data: result,
            schema: GenreSchema,
            message: "Invalid data response. Please try again."
        });

        if (!success) throw error;

        return returnData;
    }

    const onSuccess = async (genre: Genre) => {
        toast.success(successMessage ?? `Genre ${isEditing ? "Updated" : "Created"}`);

        await Promise.all([
            queryClient.invalidateQueries({queryKey: ["fetch_single_genre"], exact: false}),
            queryClient.invalidateQueries({queryKey: ["fetch_genres_by_query"], exact: false}),
        ]);

        onSubmitSuccess && onSubmitSuccess(genre);
    }

    const onError = (error: Error) => {
        handleMutationFormError({form, error, displayMessage: errorMessage});
        onSubmitError && onSubmitError(error);
    }

    return useMutation({
        mutationKey: ['submit_genre_data'],
        mutationFn: submitGenre,
        onSuccess,
        onError,
    })
}