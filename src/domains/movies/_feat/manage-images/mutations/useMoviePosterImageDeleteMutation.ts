/**
 * @fileoverview Mutation hook for deleting a movie's poster image and updating the cache.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {Movie, MovieSchema} from "@/domains/movies/schema/movie";
import validateData from "@/common/hooks/validation/validate-data/validateData";
import Logger from "@/common/utility/features/logger/Logger.ts";
import {MovieCRUDQueryKeys} from "@/domains/movies/_feat/crud-hooks";
import {deleteRemovePosterImage} from "@/domains/movies/_feat/manage-images/repository";
import {ManageMovieImageMutationKeys} from "@/domains/movies/_feat/manage-images/mutations/mutationKeys.ts";

/** Input parameters for the movie poster deletion mutation. */
type OnDeleteValues = {
    movieID: ObjectId;
};

/** Hook that provides a mutation to remove a movie poster and invalidates related movie queries. */
export function useMoviePosterImageDeleteMutation(): UseMutationResult<Movie, unknown, OnDeleteValues> {
    const queryClient = useQueryClient();

    const deleteMoviePosterImage = async ({movieID}: OnDeleteValues) => {
        const {result} = await deleteRemovePosterImage({movieID})

        const {data: parsedData, error, success} = validateData({
            data: result,
            schema: MovieSchema,
            message: "Invalid data returned after poster deletion. Please try again.",
        });

        if (!success) throw error;
        return parsedData;
    };

    const onSuccess = (movie: Movie) => {
        Logger.log({type: "INFO", msg: "Movie Poster Removed.", context: {movie: movie._id}});
        queryClient.invalidateQueries({queryKey: MovieCRUDQueryKeys.all, exact: false});
    };

    return useMutation({
        mutationKey: ManageMovieImageMutationKeys.removePoster(),
        mutationFn: deleteMoviePosterImage,
        onSuccess,
    });
}
