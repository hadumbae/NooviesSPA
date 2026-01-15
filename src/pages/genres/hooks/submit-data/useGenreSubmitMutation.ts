/**
 * @file useGenreSubmitMutation.ts
 *
 * React Query mutation hook for creating or updating `Genre` entities.
 *
 * Always returns fully populated {@link GenreDetails} and integrates:
 * - Schema validation
 * - Form-level error mapping
 * - Toast notifications
 * - Query cache invalidation
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import {UseFormReturn} from "react-hook-form";
import {GenreDetailsSchema} from "@/pages/genres/schema/genre/Genre.schema.ts";
import {toast} from "react-toastify";
import {GenreForm, GenreFormValues} from "@/pages/genres/schema/form/GenreForm.types.ts";
import {GenreDetails} from "@/pages/genres/schema/genre/Genre.types.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {GenreQueryKeys} from "@/pages/genres/utilities/query/GenreQueryKeys.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Parameters for {@link useGenreSubmitMutation}.
 *
 * @remarks
 * - When `editID` is provided, the mutation performs an update
 * - When `editID` is omitted, the mutation performs a create
 */
export type UseGenreSubmitMutationParams =
    MutationOnSubmitParams<GenreDetails> & {
    /** Existing genre identifier (enables update mode). */
    editID?: ObjectId;

    /** React Hook Form instance managing the genre form state. */
    form: UseFormReturn<GenreFormValues>;
};

/**
 * **useGenreSubmitMutation**
 *
 * React Query mutation hook for submitting genre form data.
 *
 * Responsibilities:
 * - Select create vs. update automatically based on `editID`
 * - Always request populated and virtualized genre data
 * - Validate API responses against {@link GenreDetailsSchema}
 * - Map API errors into React Hook Form state
 * - Emit optional success notifications
 * - Invalidate genre list and ID-based query caches
 *
 * @param params - Mutation configuration and lifecycle callbacks.
 *
 * @returns React Query mutation result resolving to {@link GenreDetails}.
 *
 * @example
 * ```ts
 * const mutation = useGenreSubmitMutation({
 *   editID: genreId,
 *   form,
 * });
 *
 * form.handleSubmit(mutation.mutate);
 * ```
 */
export default function useGenreSubmitMutation(
    params: UseGenreSubmitMutationParams
): UseMutationResult<GenreDetails, unknown, GenreForm> {
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
     * Executes the create or update request.
     */
    const submitGenre = async (values: GenreForm): Promise<GenreDetails> => {
        const action = editID
            ? () => GenreRepository.update({_id: editID, data: values, config})
            : () => GenreRepository.create({data: values, config});

        const response = await handleMutationResponse({
            action,
            errorMessage: "Failed to submit genre data.",
        });

        const {success, error, data} = validateData({
            data: response,
            schema: GenreDetailsSchema,
            message: "Invalid genre response data.",
        });

        if (!success) throw error;
        return data;
    };

    /**
     * Handles successful mutation completion.
     */
    const onSuccess = async (genre: GenreDetails) => {
        await invalidateQueries(
            [GenreQueryKeys.ids(), GenreQueryKeys.query(), GenreQueryKeys.paginated()],
            {exact: false},
        );

        if (successMessage) toast.success(successMessage);
        onSubmitSuccess?.(genre);
    };

    /**
     * Handles mutation failure.
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
