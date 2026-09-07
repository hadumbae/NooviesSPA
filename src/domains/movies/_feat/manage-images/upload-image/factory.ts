/**
 * @fileoverview Factory for creating React Query mutations that upload movie poster or banner images.
 */

import {MutationKey, useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/_schemas";
import {Movie, MovieSchema} from "@/domains/movies/_schema";
import {validateData} from "@/common/_feat/validate-data/validateData.ts";
import {MovieCRUDQueryKeys} from "@/domains/movies/_feat/crud-hooks";
import {MovieImageFormData} from "@/domains/movies/_feat/manage-images/formSchema.ts";
import {UploadMovieImageRouteConfig} from "@/domains/movies/_feat/manage-images/upload-image/repository";
import {FetchRequestReturns} from "@/common/_types";

type FactoryConfig = {
    key: MutationKey;
    upload: (params: UploadMovieImageRouteConfig) => Promise<FetchRequestReturns<Movie>>;
}

/** Parameters required to initialise a movie image upload mutation hook. */
export type SubmitMovieImageConfig = {
    movieID: ObjectId;
};

/**
 * Creates a custom React Query hook for uploading and validating movie image assets.
 */
export function createMovieImageUploadMutation(
    {key, upload}: FactoryConfig
): (params: SubmitMovieImageConfig) => UseMutationResult<Movie, unknown, MovieImageFormData> {
    return (
        {movieID}: SubmitMovieImageConfig
    ): UseMutationResult<Movie, unknown, MovieImageFormData> => {
        const queryClient = useQueryClient();

        const submitImage = async ({image}: MovieImageFormData) => {
            const formData = new FormData();
            formData.append("image", image);

            const {result} = await upload({movieID, data: formData});

            const {data: parsedData, success, error} = validateData({
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
            mutationFn: submitImage,
            onSuccess,
        });
    }
}