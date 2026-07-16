/**
 * @fileoverview Mutation hook for removing an image from a Genre.
 */

import {useMutation, type UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {type MutationResponseConfig} from "@/common/_feat/submit-data";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import {patchRemoveGenreImage} from "@/domains/genres/_feat/manage-image/repository";
import {ManageGenreImageMutationKeys} from "@/domains/genres/_feat/manage-image/mutations/mutationKeys.ts";
import {type Genre, GenreSchema} from "@/domains/genres/_schema";
import {validateData} from "@/common/_feat/validate-data/validateData.ts";
import {ObjectId} from "@/common/_schemas";

/** Payload for the remove genre image mutation. */
type RemovePayload = {
    _id: ObjectId;
}

/**
 * Removes the image associated with a specific Genre.
 */
export function useRemoveGenreImage(
    onSubmitConfig: MutationResponseConfig<Genre, RemovePayload> = {}
): UseMutationResult<Genre, unknown, RemovePayload> {
    const queryClient = useQueryClient();

    const removeImage = async ({_id}: RemovePayload) => {
        onSubmitConfig.submitMessage && toast.info(onSubmitConfig.submitMessage);
        onSubmitConfig.onSubmit?.({_id});

        const {result} = await patchRemoveGenreImage({_id});

        const {success, error, data: parsed} = validateData({
            data: result,
            schema: GenreSchema,
            message: "Invalid genre data received from server.",
        });

        if (!success) throw error;

        return parsed;
    };

    const onSuccess = (result: Genre) => {
        queryClient.invalidateQueries({queryKey: ['genres'], exact: false});

        onSubmitConfig.successMessage && toast.success(onSubmitConfig.successMessage);
        onSubmitConfig.onSubmitSuccess?.(result);
    };

    const onError = (error: unknown) => {
        onSubmitConfig.errorMessage && toast.error(onSubmitConfig.errorMessage);
        handleMutationResponseError({error});
        onSubmitConfig.onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ManageGenreImageMutationKeys.remove(),
        mutationFn: removeImage,
        onSuccess,
        onError,
    });
}