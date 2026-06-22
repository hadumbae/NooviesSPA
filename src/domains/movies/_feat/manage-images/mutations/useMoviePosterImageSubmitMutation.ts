/**
 * @fileoverview Mutation hook for uploading and updating movie poster images.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {Movie, MovieSchema} from "@/domains/movies/schema";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {MovieCRUDQueryKeys} from "@/domains/movies/_feat/crud-hooks";
import Logger from "@/common/utility/features/logger/Logger.ts";
import {ManageMovieImageMutationKeys} from "@/domains/movies/_feat/manage-images/mutations/mutationKeys.ts";
import {patchUploadPosterImage} from "@/domains/movies/_feat/manage-images/repository";
import {MoviePosterImageFormData} from "@/domains/movies/_feat/manage-images/form";

/** Configuration parameters for the movie poster image submission mutation. */
type ImageSubmitParams = {
    movieID: ObjectId;
};

/** Hook that provides a mutation for uploading a movie poster image using multipart form data. */
export function useMoviePosterImageSubmitMutation(
    {movieID}: ImageSubmitParams
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

    const onSuccess = (movie: Movie) => {
        Logger.log({type: "INFO", msg: "Movie Poster Updated.", context: {movie: movie._id}});
        queryClient.invalidateQueries({queryKey: MovieCRUDQueryKeys.all, exact: false});
    };

    return useMutation({
        mutationKey: ManageMovieImageMutationKeys.submitPoster(),
        mutationFn: submitMoviePosterImage,
        onSuccess,
    });
}
