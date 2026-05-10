/**
 * @fileoverview Mutation hook for removing an image from a Genre.
 */

import {useMutation, type UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {type MutationResponseConfig} from "@/common/features/submit-data";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import {ManageGenreImageMutationKeys, patchRemoveGenreImage} from "@/domains/genres/_feat/manage-image";
import {type Genre, GenreSchema} from "@/domains/genres/schema";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";

/** Configuration for the useRemoveGenreImage hook. */
type RemoveGenreImageConfig = MutationResponseConfig<Genre>;

/** Payload for the remove genre image mutation. */
type RemovePayload = {
    _id: ObjectId;
}

/**
 * Removes the image associated with a specific Genre.
 */
export function useRemoveGenreImage(
    {onSubmit, submitMessage, successMessage, errorMessage, onSubmitSuccess, onSubmitError}: RemoveGenreImageConfig
): UseMutationResult<Genre, unknown, RemovePayload> {
    const invalidateQueries = useInvalidateQueryKeys();

    const removeImage = async ({_id}: RemovePayload) => {
        submitMessage && toast.info(submitMessage);
        onSubmit?.();

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
        invalidateQueries([
            ['genres']
        ], {exact: false});

        successMessage && toast.success(successMessage);
        onSubmitSuccess?.(result);
    };

    const onError = (error: unknown) => {
        errorMessage && toast.error(errorMessage);
        handleMutationResponseError({error});
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ManageGenreImageMutationKeys.remove(),
        mutationFn: removeImage,
        onSuccess,
        onError,
    });
}