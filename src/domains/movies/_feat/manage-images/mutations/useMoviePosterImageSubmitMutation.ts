/**
 * @fileoverview Mutation hook for uploading and updating movie poster images via multipart form data.
 */

import {toast} from "react-toastify";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {MutationFormConfig, MutationResponseConfig} from "@/common/features/submit-data";
import {
    ManageMovieImageMutationKeys,
    MoviePosterImageFormData,
    MoviePosterImageFormValues,
    patchUploadPosterImage
} from "@/domains/movies/_feat/manage-images";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {type Movie, MovieSchema} from "@/domains/movies/schema/movie";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";

/** Configuration parameters for the movie poster image submission mutation. */
type ImageSubmitParams =
    MutationResponseConfig<Movie> &
    MutationFormConfig<MoviePosterImageFormValues, MoviePosterImageFormData> & {
    movieID: ObjectId;
};

/**
 * Hook for submitting a movie's poster image and updating the movie record.
 */
export default function useMoviePosterImageSubmitMutation(
    {movieID, form, resetForm, ...onSubmitConfig}: ImageSubmitParams
): UseMutationResult<Movie, unknown, MoviePosterImageFormData> {
    const submitMoviePosterImage = async ({posterImage}: MoviePosterImageFormData) => {
        const formData = new FormData();
        formData.append("posterImage", posterImage);

        const {result} = await patchUploadPosterImage({movieID, data: formData});

        const {data: parsedData, success, error} = validateData({
            data: result,
            schema: MovieSchema,
            message: "Data returned is not a valid movie. Please try again.",
        });

        if (!success) throw error;

        resetForm?.resetOnSubmit && form.reset();

        onSubmitConfig.submitMessage && toast.info(onSubmitConfig.submitMessage);
        onSubmitConfig.onSubmit?.();

        return parsedData;
    };

    const onSuccess = (movie: Movie) => {
        resetForm?.resetOnSuccess && form.reset();

        onSubmitConfig.successMessage && toast.success(onSubmitConfig.successMessage);
        onSubmitConfig.onSubmitSuccess?.(movie);
    };

    const onError = (error: unknown) => {
        resetForm?.resetOnError && form.reset();

        onSubmitConfig.errorMessage && toast.error(onSubmitConfig.errorMessage);
        handleMutationFormError({form, error});
        onSubmitConfig.onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ManageMovieImageMutationKeys.submitPoster(),
        mutationFn: submitMoviePosterImage,
        onSuccess,
        onError,
    });
}
