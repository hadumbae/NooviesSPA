import {UseFormReturn} from "react-hook-form";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import {MovieForm, MovieFormValues} from "@/pages/movies/schema/form/MovieForm.types.ts";
import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {MovieSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {toast} from "react-toastify";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import handleMutationFormError from "@/common/utility/mutations/handleMutationFormError.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";
import buildStandardLog from "@/common/utility/logger/buildStandardLog.ts";
import {
    MutationEditByIDParams,
    MutationOnSubmitParams
} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Parameters used for submitting or editing a movie entry.
 *
 * Extends the base mutation parameters with form context and editing options.
 */
export type MovieSubmitParams = MutationOnSubmitParams<Movie> & MutationEditByIDParams & {
    /** React Hook Form instance for the movie form. */
    form: UseFormReturn<MovieFormValues>;
};

/**
 * React Query mutation hook for creating or updating a movie entry.
 *
 * This hook:
 * - Validates form data and sends it to the backend.
 * - Handles both creation and update operations transparently.
 * - Displays user-friendly success/error toasts.
 * - Invalidates relevant movie queries upon completion.
 *
 * @param params - Mutation configuration and form context.
 * @returns A `UseMutationResult` object exposing mutation methods and state.
 *
 * @example
 * ```ts
 * const mutation = useMovieSubmitMutation({
 *   form,
 *   isEditing: !!movieId,
 *   _id: movieId,
 *   onSubmitSuccess: (movie) => console.log("Saved:", movie),
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
     * Executes the actual mutation — either creates or updates a movie record.
     *
     * Validates the server response against the `MovieSchema` before returning.
     *
     * @param data - Form data to be submitted.
     * @throws Will throw an error if the response fails schema validation.
     * @returns The validated `Movie` object from the backend.
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
     * Handles a successful submission.
     *
     * Displays a toast message, logs the event, and triggers any success callback.
     *
     * @param movie - The successfully submitted `Movie` entity.
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
     * Handles submission errors.
     *
     * Maps server validation errors back to the form fields where possible,
     * and shows a fallback error toast if the cause is unknown.
     *
     * @param error - The caught error instance.
     */
    const onError = (error: unknown) => {
        const fallbackMessage = errorMessage ?? "Failed to submit movie data. Please try again.";
        handleMutationFormError({error, form, displayMessage: fallbackMessage});
        onSubmitError?.(error);
    };

    /**
     * Invalidates related queries after mutation completion to refresh movie data.
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
