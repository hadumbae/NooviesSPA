import {UseFormReturn} from "react-hook-form";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import {MovieForm, MovieFormValues} from "@/pages/movies/schema/form/MovieForm.types.ts";
import {FormMutationEditingParams, FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {MovieSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {toast} from "react-toastify";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import handleMutationFormError from "@/common/utility/mutations/handleMutationFormError.ts";

/**
 * Parameters for {@link useMovieSubmitMutation}.
 */
export type MovieSubmitParams =
    Omit<FormMutationOnSubmitParams, "onSubmitSuccess" | "onSubmitError"> &
    FormMutationEditingParams & {
    /** React Hook Form instance for the movie form. */
    form: UseFormReturn<MovieFormValues>;
    /** Optional callback executed when the mutation succeeds. */
    onSubmitSuccess?: (movie: Movie) => void;
    /** Optional callback executed when the mutation fails. */
    onSubmitError?: (error: unknown) => void;
};

/**
 * Custom hook for submitting movie data via React Query mutation.
 *
 * Handles both creating and updating a movie depending on `isEditing` flag.
 * Integrates validation using {@link MovieSchema} and error handling with
 * `handleMutationFormError`. Also manages query invalidation for movie lists.
 *
 * @param params - Parameters including the form instance, callbacks, success/error messages, and editing state.
 * @returns A {@link UseMutationResult} for the movie mutation, providing status flags (`isLoading`, `isError`, etc.) and the `mutate` function.
 *
 * @example
 * ```ts
 * const form = useMovieSubmitForm();
 * const mutation = useMovieSubmitMutation({
 *   form,
 *   isEditing: false,
 *   successMessage: "Movie saved!",
 * });
 *
 * // Submitting form
 * const onSubmit = (values: MovieFormValues) => mutation.mutate(values);
 * ```
 */
export default function useMovieSubmitMutation(
    params: MovieSubmitParams
): UseMutationResult<Movie, unknown, MovieForm> {
    const {
        form,
        onSubmitSuccess,
        onSubmitError,
        successMessage,
        errorMessage,
        isEditing,
        _id,
    } = params;

    const queryClient = useQueryClient();

    const submitMovieData = async (data: MovieForm) => {
        const action = isEditing
            ? () => MovieRepository.update({_id, data})
            : () => MovieRepository.create({data});

        const result = await handleMutationResponse({
            action,
            errorMessage: "Failed to submit data. Please try again.",
        });

        const {success, error, data: movie} = validateData({
            data: result,
            schema: MovieSchema,
            message: "Invalid response data. Please try again."
        });

        if (!success) throw error;
        return movie;
    }

    const onSuccess = async (movie: Movie) => {
        toast.success(successMessage ?? "Movie submitted successfully.");
        onSubmitSuccess?.(movie);
    }

    const onError = (error: unknown) => {
        const fallbackMessage = errorMessage ?? "Failed to submit movie data. Please try again.";
        handleMutationFormError({error, form, displayMessage: fallbackMessage})
        onSubmitError?.(error);
    }

    const onSettled = async () => {
        await Promise.all([
            queryClient.invalidateQueries({queryKey: ["fetch_single_movie"], exact: false}),
            queryClient.invalidateQueries({queryKey: ["fetch_movies_by_query"], exact: false}),
        ]);
    }

    return useMutation({
        mutationKey: ["submit_movie_data"],
        mutationFn: submitMovieData,
        onSuccess,
        onError,
        onSettled,
    });
}