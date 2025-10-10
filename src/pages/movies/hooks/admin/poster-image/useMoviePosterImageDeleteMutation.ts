import { OnDeleteMutationParams } from "@/common/type/form/FormMutationResultParams.ts";
import { ObjectId } from "@/common/schema/strings/IDStringSchema.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import MovieImageRepository from "@/pages/movies/repositories/image-repository/MovieImageRepository.ts";
import { toast } from "react-toastify";
import handleMutationResponseError from "@/common/utility/mutations/handleMutationResponseError.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Movie } from "@/pages/movies/schema/movie/Movie.types.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import { MovieSchema } from "@/pages/movies/schema/movie/Movie.schema.ts";
import buildStandardLog from "@/common/utility/logger/buildStandardLog.ts";

/**
 * Values required to delete a movie poster image.
 */
type OnDeleteValues = {
    /** The unique identifier of the movie whose poster image will be deleted. */
    movieID: ObjectId;
};

/**
 * Parameters for the `useMoviePosterImageDeleteMutation` hook.
 */
type OnPosterDeleteParams = Omit<OnDeleteMutationParams, "onDeleteSuccess"> & {
    /** Optional callback invoked after successful deletion of the poster image. */
    onDeleteSuccess?: (movie: Movie) => void;
};

/**
 * Custom React Query mutation hook for deleting a movie's poster image.
 *
 * @remarks
 * This hook manages the full deletion lifecycle:
 * - Executes the API request to remove the poster image.
 * - Validates the returned movie data against `MovieSchema`.
 * - Handles success and error feedback via `react-toastify`.
 * - Invokes optional `onDeleteSuccess` and `onDeleteError` callbacks.
 * - Invalidates relevant React Query caches to refresh movie data.
 *
 * @param params - Configuration and callbacks for the deletion mutation.
 * @param params.onDeleteSuccess - Optional callback invoked on successful deletion.
 * @param params.onDeleteError - Optional callback invoked on deletion error.
 * @param params.successMessage - Optional custom success message for toast.
 * @param params.errorMessage - Optional custom error message for toast.
 *
 * @returns A `UseMutationResult` object from React Query for managing the deletion lifecycle.
 *
 * @example
 * ```ts
 * const mutation = useMoviePosterImageDeleteMutation({
 *   onDeleteSuccess: (movie) => console.log("Deleted successfully!", movie),
 *   onDeleteError: (error) => console.error(error),
 * });
 *
 * mutation.mutate({ movieID: someMovieID });
 * ```
 */
export default function useMoviePosterImageDeleteMutation(params: OnPosterDeleteParams = {}) {
    const queryClient = useQueryClient();
    const { onDeleteSuccess, onDeleteError, successMessage, errorMessage } = params;

    /** Unique mutation key for React Query caching. */
    const mutationKey = ["submit_movie_poster_image"];

    /**
     * Executes the API call to delete a movie's poster image.
     *
     * @param values - Object containing the movie ID.
     * @returns The updated `Movie` object after deletion.
     * @throws If the deletion or validation fails.
     */
    const deleteMoviePosterImage = async ({ movieID }: OnDeleteValues) => {
        const result = await handleMutationResponse({
            action: () => MovieImageRepository.deletePosterImage({ movieID }),
            errorMessage: "Failed to delete poster image. Please try again.",
        });

        const { data: parsedData, error, success } = validateData({
            data: result,
            schema: MovieSchema,
            message: "Invalid data returned after poster deletion. Please try again.",
        });

        if (!success) throw error;

        return parsedData;
    };

    /**
     * Handles successful deletion of the poster image.
     *
     * @param movie - The movie object returned after deletion.
     */
    const onSuccess = (movie: Movie) => {
        buildStandardLog({
            level: "log",
            type: "INFO",
            msg: "Removed poster image from movie.",
            context: {movie: movie._id},
        });

        toast.success(successMessage ?? "Poster image deleted.");
        onDeleteSuccess?.(movie);
    };

    /**
     * Handles errors during the deletion process.
     *
     * @param error - The error thrown during the mutation.
     */
    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Failed to delete poster image. Please try again.";
        handleMutationResponseError({ error, displayMessage });
        onDeleteError?.(error);
    };

    /**
     * Invalidates related queries after the mutation settles to refresh movie data.
     */
    const onSettled = async () => {
        const queryKeys = ["fetch_movies_by_query", "fetch_single_movie"];
        await Promise.all(queryKeys.map(queryKey =>
            queryClient.invalidateQueries({ queryKey, exact: false })
        ));
    };

    return useMutation({
        mutationKey,
        mutationFn: deleteMoviePosterImage,
        onSuccess,
        onError,
        onSettled,
    });
}
