import { UseFormReturn } from "react-hook-form";
import { MoviePosterImageForm, MoviePosterImageFormValues } from "@/pages/movies/schema/form/MoviePosterImage.types.ts";
import { Movie } from "@/pages/movies/schema/movie/Movie.types.ts";
import { ObjectId } from "@/common/schema/strings/IDStringSchema.ts";
import { toast } from "react-toastify";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import MovieImageRepository from "@/pages/movies/repositories/image-repository/MovieImageRepository.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import handleMutationFormError from "@/common/utility/mutations/handleMutationFormError.ts";
import { MovieSchema } from "@/pages/movies/schema/movie/Movie.schema.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Parameters for submitting a movie poster image via mutation.
 */
type ImageSubmitParams = MutationOnSubmitParams<Movie> & {
    /** React Hook Form instance managing the poster image form. */
    form: UseFormReturn<MoviePosterImageFormValues>;
    /** The unique identifier of the movie to upload the poster image for. */
    movieID: ObjectId;
};

/**
 * React Query mutation hook for submitting a movie's poster image.
 *
 * @remarks
 * This hook manages the full lifecycle of submitting a movie poster image:
 * 1. Uploads the poster image to the server via the repository.
 * 2. Validates the returned movie data against `MovieSchema`.
 * 3. Shows success or error feedback via toast notifications.
 * 4. Calls optional callback functions for success and error handling.
 * 5. Invalidates related movie queries to refresh data in the UI.
 *
 * @param params - Submission parameters including form instance, movie ID, and optional callbacks/messages.
 * @returns A React Query `UseMutationResult` object for triggering and tracking the mutation.
 *
 * @example
 * ```ts
 * const form = useForm<MoviePosterImageFormValues>();
 *
 * const mutation = useMoviePosterImageSubmitMutation({
 *   form,
 *   movieID: someMovieID,
 *   onSubmitSuccess: (movie) => console.log("Uploaded:", movie),
 *   onSubmitError: (err) => console.error(err),
 * });
 *
 * form.handleSubmit(values => mutation.mutate(values));
 * ```
 */
export default function useMoviePosterImageSubmitMutation(
    params: ImageSubmitParams
): UseMutationResult<Movie, unknown, MoviePosterImageForm> {
    const queryClient = useQueryClient();
    const { movieID, form, onSubmitSuccess, onSubmitError, successMessage, errorMessage } = params;

    /** Unique React Query mutation key for caching and tracking. */
    const mutationKey = ["submit_movie_poster_image"];

    /**
     * Performs the API request to upload a movie poster image.
     *
     * @param values - Form values containing the poster image file.
     * @returns The parsed and validated movie returned from the server.
     * @throws If the upload or validation fails.
     */
    const submitMoviePosterImage = async (values: MoviePosterImageForm) => {
        const { posterImage } = values;

        const formData = new FormData();
        formData.append("posterImage", posterImage);

        const result = await handleMutationResponse({
            action: () => MovieImageRepository.uploadPosterImage({ movieID, data: formData }),
            errorMessage: "Failed to upload movie's poster image. Please try again.",
        });

        const { data: parsedData, success, error } = validateData({
            data: result,
            schema: MovieSchema,
            message: "Data returned is not a valid movie. Please try again.",
        });

        if (!success) throw error;

        return parsedData;
    };

    /**
     * Handles successful mutation.
     *
     * @param movie - The validated movie returned from the API.
     */
    const onSuccess = (movie: Movie) => {
        toast.success(successMessage ?? "Movie Poster Uploaded!");
        onSubmitSuccess?.(movie);
    };

    /**
     * Handles mutation errors and shows form-level feedback.
     *
     * @param error - The error thrown during mutation or validation.
     */
    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Failed to upload movie poster image.";
        handleMutationFormError({ form, error, displayMessage });
        onSubmitError?.(error);
    };

    /**
     * Invalidates related queries after mutation settles to refresh movie data.
     */
    const onSettled = async () => {
        const queryKeys = ["fetch_movies_by_query", "fetch_single_movie"];
        await Promise.all(
            queryKeys.map(queryKey =>
                queryClient.invalidateQueries({ queryKey, exact: false })
            )
        );
    };

    return useMutation({
        mutationKey,
        mutationFn: submitMoviePosterImage,
        onSuccess,
        onError,
        onSettled,
    });
}
