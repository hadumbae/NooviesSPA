/**
 * @fileoverview Mutation hook for removing a person's profile image.
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {deleteRemoveProfileImage} from "@/domains/persons/_feat/remove-profile-image/repositories/repository.ts";
import {
    PersonRemoveProfileImageMutationKeys
} from "@/domains/persons/_feat/remove-profile-image/mutations/mutationKeys.ts";
import {MutationResponseConfig} from "@/common/features/submit-data";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";

/**
 * Parameters for the profile image removal mutation.
 */
type ImageSubmitParams = {
    _id: ObjectId;
    onDelete: MutationResponseConfig;
};

/**
 * Custom hook to handle the deletion of a person's profile image.
 */
export function usePersonProfileImageRemoveMutation({_id, onDelete}: ImageSubmitParams) {
    const {onSubmitSuccess, onSubmitError, successMessage, errorMessage} = onDelete;
    const queryClient = useQueryClient();

    const removeImage = async () => {
        await deleteRemoveProfileImage({_id});
    }

    const onSuccess = async () => {
        queryClient.invalidateQueries({queryKey: ["fetch_single_person"], exact: false})

        successMessage && toast.success(successMessage);
        onSubmitSuccess?.();
    }

    const onError = (error: unknown) => {
        errorMessage && toast.error(errorMessage);
        handleMutationResponseError({error, displayMessage: "Failed to remove profile image."});
        onSubmitError?.(error);
    }

    return useMutation({
        mutationKey: PersonRemoveProfileImageMutationKeys.remove({_id}),
        mutationFn: removeImage,
        onSuccess,
        onError,
    });
}