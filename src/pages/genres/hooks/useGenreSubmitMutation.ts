import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import { UseFormReturn } from "react-hook-form";
import { GenreSchema } from "@/pages/genres/schema/genre/Genre.schema.ts";
import { toast } from "react-toastify";
import { GenreForm, GenreFormValues } from "@/pages/genres/schema/form/GenreForm.types.ts";
import { Genre } from "@/pages/genres/schema/genre/Genre.types.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {
    MutationEditByIDParams,
    MutationOnSubmitParams,
} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Parameters for the {@link useGenreSubmitMutation} hook.
 *
 * Extends generic form submission parameter types with
 * genre-specific form handling and mutation options.
 */
export type useGenreSubmitMutationParams = MutationOnSubmitParams<Genre> &
    MutationEditByIDParams & {
    /**
     * The `react-hook-form` instance that manages the genre form.
     */
    form: UseFormReturn<GenreFormValues>;

    /**
     * Indicates whether the form is being used to edit an existing genre (`true`)
     * or create a new one (`false`).
     */
    isEditing?: boolean;

    /**
     * Optional success message displayed on successful submission.
     * If not provided, a default toast message will be shown.
     */
    successMessage?: string;

    /**
     * Optional error message displayed when the submission fails.
     * If not provided, a default message is used.
     */
    errorMessage?: string;

    /**
     * Optional callback invoked when the submission succeeds.
     * Receives the newly created or updated genre as argument.
     */
    onSubmitSuccess?: (genre: Genre) => void;

    /**
     * Optional callback invoked when the submission fails.
     * Receives the thrown error object.
     */
    onSubmitError?: (error: Error) => void;
};

/**
 * Custom React Query hook for submitting genre data (create or update).
 *
 * This hook abstracts away the mutation logic for genre submission,
 * automatically validating API responses, showing toast notifications,
 * handling form-level errors, and invalidating relevant cache queries.
 *
 * It supports both creation and editing modes, depending on the `isEditing` flag.
 *
 * @param params - Configuration object controlling the mutation behavior.
 *
 * @returns A `UseMutationResult` object providing access to mutation utilities and state:
 * - `mutate(values)` to trigger the mutation.
 * - `isLoading`, `isError`, `isSuccess` to observe status.
 * - `data` and `error` to access mutation results.
 *
 * @example
 * ```tsx
 * const form = useForm<GenreFormValues>();
 *
 * const mutation = useGenreSubmitMutation({
 *   _id: selectedGenreId,
 *   form,
 *   isEditing: !!selectedGenreId,
 *   onSubmitSuccess: (genre) => console.log("Saved:", genre),
 * });
 *
 * const onSubmit = form.handleSubmit((values) => mutation.mutate(values));
 * ```
 *
 * @remarks
 * On successful mutation, this hook invalidates the following query keys:
 * - `"fetch_single_genre"`
 * - `"fetch_genres_by_query"`
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

    /**
     * Handles API submission — either creates a new genre or updates an existing one,
     * based on the `isEditing` flag.
     *
     * @param values - The form values to submit to the API.
     * @throws {Error} Throws if the response is invalid or request fails.
     */
    const submitGenre = async (values: GenreForm) => {
        const action = isEditing
            ? () => GenreRepository.update({ _id, data: values })
            : () => GenreRepository.create({ data: values });

        const result = await handleMutationResponse({
            action,
            errorMessage: "Failed to submit genre data. Please try again.",
        });

        const { success, error, data: returnData } = validateData({
            data: result,
            schema: GenreSchema,
            message: "Invalid data response. Please try again.",
        });

        if (!success) throw error;
        return returnData;
    };

    /**
     * Callback triggered when the mutation succeeds.
     * Displays a toast message and calls `onSubmitSuccess` if provided.
     */
    const onSuccess = async (genre: Genre) => {
        toast.success(successMessage ?? `Genre ${isEditing ? "Updated" : "Created"}`);
        onSubmitSuccess?.(genre);
    };

    /**
     * Callback triggered when the mutation encounters an error.
     * Handles validation errors and shows an error toast message.
     */
    const onError = (error: Error) => {
        handleMutationFormError({ form, error, displayMessage: errorMessage });
        onSubmitError?.(error);
    };

    /**
     * Callback triggered after the mutation settles (either success or failure).
     * Invalidates cached queries to refresh data across the app.
     */
    const onSettled = async () => {
        const keys = ["fetch_single_genre", "fetch_genres_by_query"];
        await Promise.all(
            keys.map((key) => queryClient.invalidateQueries({ queryKey: [key], exact: false }))
        );
    };

    return useMutation({
        mutationKey: ["submit_genre_data"],
        mutationFn: submitGenre,
        onSuccess,
        onError,
        onSettled,
    });
}
