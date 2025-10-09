import { OnDeleteMutationParams } from "@/common/type/form/FormMutationResultParams.ts";
import { ObjectId } from "@/common/schema/strings/IDStringSchema.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import MovieImageRepository from "@/pages/movies/repositories/image-repository/MovieImageRepository.ts";
import { toast } from "react-toastify";
import handleMutationResponseError from "@/common/utility/mutations/handleMutationResponseError.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Values for deleting a movie poster image.
 */
type OnDeleteValues = {
    /** The unique identifier of the movie whose poster image will be deleted. */
    movieID: ObjectId;
};

/**
 * React Query mutation hook for deleting a movie's poster image.
 *
 * @remarks
 * This hook handles the deletion lifecycle of a movie poster image:
 * performing the deletion request, showing toast notifications,
 * handling errors, and invalidating relevant queries to refresh data.
 *
 * @param params - The parameters for the deletion mutation, including optional callbacks and messages.
 * @returns A React Query mutation object for managing or tracking the deletion operation.
 *
 * @example
 * ```ts
 * const mutation = useMoviePosterImageDeleteMutation({
 *   onDeleteSuccess: () => console.log("Deleted successfully!"),
 *   onDeleteError: (error) => console.error(error),
 * });
 *
 * mutation.mutate({ movieID: someMovieID });
 * ```
 */
export default function useMoviePosterImageDeleteMutation(params: OnDeleteMutationParams) {
    const queryClient = useQueryClient();
    const { onDeleteSuccess, onDeleteError, successMessage, errorMessage } = params;

    /** Unique mutation key for React Query caching. */
    const mutationKey = ["submit_movie_poster_image"];

    /**
     * Performs the API request to delete a movie's poster image.
     *
     * @param values - Object containing the movie ID.
     * @throws If the deletion request fails.
     */
    const deleteMoviePosterImage = async ({ movieID }: OnDeleteValues) => {
        await handleMutationResponse({
            action: () => MovieImageRepository.deletePosterImage({ movieID }),
            errorMessage: "Failed to delete poster image. Please try again.",
        });
    };

    /**
     * Handles successful deletion of the poster image.
     */
    const onSuccess = () => {
        toast.success(successMessage ?? "Poster image deleted.");
        onDeleteSuccess?.();
    };

    /**
     * Handles errors during the deletion mutation and displays feedback.
     *
     * @param error - The error thrown during the deletion process.
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
