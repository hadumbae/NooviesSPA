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
import {
    MutationEditByIDParams,
    MutationOnSubmitParams,
} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Parameters for {@link useGenreSubmitMutation}.
 *
 * @remarks
 * Extends generic mutation submit params with genre-specific
 * form handling and lifecycle callbacks.
 */
export type UseGenreSubmitMutationParams =
    MutationOnSubmitParams<Genre> &
    MutationEditByIDParams & {
    /** React Hook Form instance managing the genre form. */
    form: UseFormReturn<GenreFormValues>;

    /** Enables update mode instead of create mode. */
    isEditing?: boolean;

    /** Optional success toast message override. */
    successMessage?: string;

    /** Optional error toast message override. */
    errorMessage?: string;

    /** Invoked after a successful create or update. */
    onSubmitSuccess?: (genre: Genre) => void;

    /** Invoked when submission fails. */
    onSubmitError?: (error: Error) => void;
};

/**
 * Genre create/update mutation hook.
 *
 * @remarks
 * - Creates or updates a genre based on `isEditing`
 * - Validates API responses against {@link GenreSchema}
 * - Maps server errors to form state
 * - Emits toast notifications
 * - Invalidates relevant genre query caches
 *
 * @param params - Mutation configuration and callbacks.
 *
 * @returns React Query mutation result for genre submission.
 *
 * @example
 * ```ts
 * const mutation = useGenreSubmitMutation({
 *   _id: genreId,
 *   form,
 *   isEditing: true,
 * });
 *
 * form.handleSubmit(mutation.mutate);
 * ```
 */
export default function useGenreSubmitMutation(
    params: UseGenreSubmitMutationParams
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

    /**
     * Executes the genre create or update request.
     */
    const submitGenre = async (values: GenreForm): Promise<Genre> => {
        const action = isEditing
            ? () => GenreRepository.update({_id, data: values})
            : () => GenreRepository.create({data: values});

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
     * Handles successful mutation resolution.
     */
    const onSuccess = (genre: Genre) => {
        toast.success(successMessage ?? `Genre ${isEditing ? "updated" : "created"}`);
        onSubmitSuccess?.(genre);
    };

    /**
     * Handles mutation failure.
     */
    const onError = (error: Error) => {
        handleMutationFormError({
            form,
            error,
            displayMessage: errorMessage,
        });
        onSubmitError?.(error);
    };

    /**
     * Invalidates cached genre queries after mutation settles.
     */
    const onSettled = async () => {
        const queryKeys = [
            "fetch_single_genre",
            "fetch_genres_by_query",
            "fetch_paginated_genres_by_query",
        ];

        await Promise.all(
            queryKeys.map((key) =>
                queryClient.invalidateQueries({queryKey: [key], exact: false}),
            ),
        );
    };

    return useMutation({
        mutationKey: ["submit_genre"],
        mutationFn: submitGenre,
        onSuccess,
        onError,
        onSettled,
    });
}
