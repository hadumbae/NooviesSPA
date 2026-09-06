/**
 * @fileoverview Mutation hook for uploading and updating movie poster images.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/_schemas";
import {Movie, MovieSchema} from "@/domains/movies/_schema";
import {validateData} from "@/common/_feat/validate-data/validateData.ts";
import {MovieCRUDQueryKeys} from "@/domains/movies/_feat/crud-hooks";
import {ManageMovieImageMutationKeys} from "@/domains/movies/_feat/manage-images/mutationKeys.ts";
import {MoviePosterImageFormData} from "@/domains/movies/_feat/manage-images/upload-poster-image/MoviePosterImageFormSchema.ts";
import {patchUploadPosterImage} from "@/domains/movies/_feat/manage-images/upload-poster-image/patchUploadPosterImage";

/** Configuration parameters for the movie poster image submission mutation. */
export type UseSubmitMoviePosterImageConfig = {
    movieID: ObjectId;
};

/** Hook that provides a mutation for uploading a movie poster image using multipart form data. */
export function useMoviePosterImageSubmitMutation(
    {movieID}: UseSubmitMoviePosterImageConfig
): UseMutationResult<Movie, unknown, MoviePosterImageFormData> {
    const queryClient = useQueryClient();

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
        return parsedData;
    };

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: MovieCRUDQueryKeys.all, exact: false});
    };

    return useMutation({
        mutationKey: ManageMovieImageMutationKeys.submitPoster(),
        mutationFn: submitMoviePosterImage,
        onSuccess,
    });
}
