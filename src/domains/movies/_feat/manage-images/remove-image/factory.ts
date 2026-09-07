/**
 * @fileoverview Factory for creating React Query mutations that remove movie poster or banner images.
 */

import {MutationKey, useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/_schemas";
import {Movie, MovieSchema} from "@/domains/movies/_schema/movie";
import {validateData} from "@/common/_feat/validate-data/validateData";
import {MovieCRUDQueryKeys} from "@/domains/movies/_feat/crud-hooks";
import {DeleteMovieImageRouteConfig} from "@/domains/movies/_feat/manage-images/remove-image/repository";
import {FetchRequestReturns} from "@/common/_types";

type FactoryConfig = {
    key: MutationKey;
    removeImage: (params: DeleteMovieImageRouteConfig) => Promise<FetchRequestReturns<Movie>>;
};

/** Parameters required to delete a movie image asset. */
export type DeleteMovieImageConfig = {
    movieID: ObjectId;
};

/**
 * Creates a custom React Query hook for removing and validating movie image assets.
 */
export function createMovieImageDeleteMutations(
    {key, removeImage}: FactoryConfig
): () => UseMutationResult<Movie, unknown, DeleteMovieImageConfig> {
    return (): UseMutationResult<Movie, unknown, DeleteMovieImageConfig> => {
        const queryClient = useQueryClient();

        const deleteImage = async ({movieID}: DeleteMovieImageConfig) => {
            const {result} = await removeImage({movieID})

            const {data: parsedData, error, success} = validateData({
                data: result,
                schema: MovieSchema,
                message: "Invalid returns. Please try again.",
            });

            if (!success) throw error;
            return parsedData;
        };

        const onSuccess = () => {
            queryClient.invalidateQueries({queryKey: MovieCRUDQueryKeys.all, exact: false});
        };

        return useMutation({
            mutationKey: key,
            mutationFn: deleteImage,
            onSuccess,
        });
    }
}