/**
 * @fileoverview Mutation hook for uploading and updating genre images.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {Genre, GenreSchema} from "@/domains/genres/_schema";
import {ObjectId} from "@/common/_schemas";
import {validateData} from "@/common/_feat/validate-data/validateData.ts";
import {patchUpdateGenreImage} from "@/domains/genres/_feat/manage-image/repository";
import {ManageGenreImageMutationKeys} from "@/domains/genres/_feat/manage-image/mutations/mutationKeys.ts";

/** Data required to execute the image upload. */
type UploadData = {
    _id: ObjectId;
    formData: FormData;
}

/** Hook to handle the genre image upload process and form state synchronisation. */
export function useUploadGenreImage(): UseMutationResult<Genre, unknown, UploadData> {
    const queryClient = useQueryClient();

    const uploadImage = async ({_id, formData}: UploadData) => {
        const {result} = await patchUpdateGenreImage({_id, formData});
        const {data: parsed, success, error} = validateData({
            data: result,
            schema: GenreSchema,
            message: "Invalid data returned on image upload.",
        });

        if (!success) throw error;
        return parsed;
    }

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: ['genres'], exact: false});
    }

    return useMutation({
        mutationKey: ManageGenreImageMutationKeys.upload(),
        mutationFn: uploadImage,
        onSuccess,
    });
}