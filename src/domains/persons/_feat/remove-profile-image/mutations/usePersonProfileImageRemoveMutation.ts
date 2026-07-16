/**
 * @fileoverview Mutation hook for removing a person's profile image.
 *
 */

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/_schemas";
import {deleteRemoveProfileImage} from "@/domains/persons/_feat/remove-profile-image/repository";
import {
    PersonRemoveProfileImageMutationKeys
} from "@/domains/persons/_feat/remove-profile-image/mutations/mutationKeys.ts";

/** Parameters for the profile image removal mutation. */
type DeleteValue = {
    _id: ObjectId;
};

/**
 * Hook to handle the deletion of a person's profile image.
 */
export function usePersonProfileImageRemoveMutation() {
    const queryClient = useQueryClient();

    const removeImage = async ({_id}: DeleteValue) => {
        await deleteRemoveProfileImage({_id});
    }

    const onSuccess = async () => {
        queryClient.invalidateQueries({queryKey: ["fetch_single_person"], exact: false})
    }

    return useMutation({
        mutationKey: PersonRemoveProfileImageMutationKeys.remove(),
        mutationFn: removeImage,
        onSuccess,
    });
}