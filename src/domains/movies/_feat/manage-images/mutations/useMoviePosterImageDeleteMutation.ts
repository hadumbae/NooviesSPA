/**
 * @fileoverview Mutation hook for deleting a movie's poster image and updating the movie record.
 */


import {toast} from "react-toastify";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {MutationResponseConfig} from "@/common/features/submit-data";
import {Movie, MovieSchema} from "@/domains/movies/schema/movie";
import {deleteRemovePosterImage, ManageMovieImageMutationKeys} from "@/domains/movies/_feat/manage-images";
import validateData from "@/common/hooks/validation/validate-data/validateData";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";

/** Input values required to delete a movie poster image. */
type OnDeleteValues = {
    movieID: ObjectId;
};

/**
 * React Query mutation hook for deleting a movie's poster image.
 */
export default function useMoviePosterImageDeleteMutation(
    onSubmitConfig: MutationResponseConfig<Movie> = {}
): UseMutationResult<Movie, unknown, OnDeleteValues> {

    const deleteMoviePosterImage = async ({movieID}: OnDeleteValues) => {
        const {result} = await deleteRemovePosterImage({movieID})

        const {data: parsedData, error, success} = validateData({
            data: result,
            schema: MovieSchema,
            message: "Invalid data returned after poster deletion. Please try again.",
        });

        if (!success) throw error;

        onSubmitConfig.submitMessage && toast.info(onSubmitConfig.submitMessage);
        onSubmitConfig.onSubmit?.();

        return parsedData;
    };

    const onSuccess = (movie: Movie) => {
        onSubmitConfig.successMessage && toast.info(onSubmitConfig.successMessage);
        onSubmitConfig.onSubmitSuccess?.(movie);
    };

    const onError = (error: unknown) => {
        const displayMessage = onSubmitConfig.errorMessage ?? "Failed to remove poster image. Please try again.";
        handleMutationResponseError({error, displayMessage});
        onSubmitConfig.onSubmitError?.(error);
    };


    return useMutation({
        mutationKey: ManageMovieImageMutationKeys.removePoster(),
        mutationFn: deleteMoviePosterImage,
        onSuccess,
        onError,
    });
}
