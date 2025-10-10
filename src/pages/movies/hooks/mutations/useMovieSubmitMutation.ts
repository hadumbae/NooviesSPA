import {UseFormReturn} from "react-hook-form";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import {MovieForm, MovieFormValues} from "@/pages/movies/schema/form/MovieForm.types.ts";
import {FormMutationResultParams} from "@/common/type/form/FormMutationResultParams.ts";
import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {MovieSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {toast} from "react-toastify";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import handleMutationFormError from "@/common/utility/mutations/handleMutationFormError.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";
import buildStandardLog from "@/common/utility/logger/buildStandardLog.ts";

/**
 * Parameters for the `useMovieSubmitMutation` hook.
 *
 * @template TData - The expected result type of the mutation, extending `Movie`.
 */
export type MovieSubmitParams = FormMutationResultParams<Movie> & {
    /** React Hook Form instance used for managing and validating movie form inputs. */
    form: UseFormReturn<MovieFormValues>;
};

/**
 * Custom React Query mutation hook for submitting or updating movie data.
 *
 * This hook handles:
 * - Submitting a new movie or updating an existing one.
 * - Validating API response data using the `MovieSchema`.
 * - Displaying toast notifications for success or failure.
 * - Handling form field errors via `handleMutationFormError`.
 * - Invalidating cached queries for movie-related data upon completion.
 *
 * @param params - Parameters controlling the mutation behavior.
 * @param params.form - The active React Hook Form instance.
 * @param params.onSubmitSuccess - Optional callback invoked upon successful mutation.
 * @param params.onSubmitError - Optional callback invoked upon mutation error.
 * @param params.successMessage - Optional custom success message for toast.
 * @param params.errorMessage - Optional custom error message for toast.
 * @param params.isEditing - Flag indicating whether the form is editing an existing movie.
 * @param params._id - The movie ID, required when `isEditing` is true.
 *
 * @returns A `UseMutationResult` object from React Query for controlling and observing the mutation lifecycle.
 *
 * @example
 * ```ts
 * const form = useForm<MovieFormValues>();
 * const mutation = useMovieSubmitMutation({
 *   form,
 *   onSubmitSuccess: (movie) => console.log("Created:", movie),
 *   isEditing: false,
 * });
 *
 * form.handleSubmit((data) => mutation.mutate(data));
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

    /**
     * Executes the mutation by creating or updating a movie record.
     * Validates the server response and returns a `Movie` object.
     */
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
    };

    /**
     * Handles successful movie submission by showing a toast and invoking callbacks.
     */
    const onSuccess = async (movie: Movie) => {
        const context = filterEmptyAttributes({
            isEditing: true,
            movie: _id,
        });

        buildStandardLog({
            level: "log",
            msg: "Submitted movie data.",
            type: "INFO",
            context,
        });

        toast.success(successMessage ?? "Movie submitted successfully.");
        onSubmitSuccess?.(movie);
    };

    /**
     * Handles mutation errors, including validation and server-side issues.
     */
    const onError = (error: unknown) => {
        const fallbackMessage = errorMessage ?? "Failed to submit movie data. Please try again.";
        handleMutationFormError({error, form, displayMessage: fallbackMessage});
        onSubmitError?.(error);
    };

    /**
     * Invalidates movie-related queries to ensure updated data is reflected.
     */
    const onSettled = async () => {
        await Promise.all([
            queryClient.invalidateQueries({queryKey: ["fetch_single_movie"], exact: false}),
            queryClient.invalidateQueries({queryKey: ["fetch_movies_by_query"], exact: false}),
        ]);
    };

    return useMutation({
        mutationKey: ["submit_movie_data"],
        mutationFn: submitMovieData,
        onSuccess,
        onError,
        onSettled,
    });
}
