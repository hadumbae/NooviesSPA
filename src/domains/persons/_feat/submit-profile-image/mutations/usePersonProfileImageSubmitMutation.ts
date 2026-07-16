/**
 * @fileoverview Mutation hook for uploading a person's profile image.
 */

import {ObjectId} from "@/common/_schemas";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {PersonProfileImageMutationKeys} from "@/domains/persons/_feat/submit-profile-image/mutations/mutationKeys.ts";
import {patchUploadProfileImage, PersonProfileImageFormData} from "@/domains/persons/_feat/submit-profile-image";
import {PersonCRUDQueryKeys} from "@/domains/persons";

/** Parameters for the profile image submission mutation. */
export type ImageSubmitConfig = {
    _id: ObjectId;
};

/** Hook to manage the lifecycle of a profile image upload. */
export function usePersonProfileImageSubmitMutation(
    {_id}: ImageSubmitConfig
): UseMutationResult<void, unknown, PersonProfileImageFormData> {
    const queryClient = useQueryClient();

    const submitAction = async (formValues: PersonProfileImageFormData): Promise<void> => {
        const formData = new FormData();
        formData.append("profileImage", formValues.profileImage);

        await patchUploadProfileImage({_id, data: formData});
    };

    const onSuccess = async () => {
        queryClient.invalidateQueries({queryKey: PersonCRUDQueryKeys.all, exact: false});
    };

    return useMutation<void, unknown, PersonProfileImageFormData>({
        mutationKey: PersonProfileImageMutationKeys.upload({_id}),
        mutationFn: submitAction,
        onSuccess,
    });
}