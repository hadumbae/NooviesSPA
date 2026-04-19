/**
 * @fileoverview Mutation hook for uploading a person's profile image.
 * Handles multipart/form-data construction, cache invalidation, and UI feedback.
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {UseFormReturn} from "react-hook-form";
import {MutationResponseConfig} from "@/common/features/submit-data";
import {PersonProfileImageMutationKeys} from "@/domains/persons/_feat/submit-profile-image/mutations/mutationKeys.ts";
import {
    patchUploadProfileImage,
    PersonProfileImageFormData,
    PersonProfileImageFormValues
} from "@/domains/persons/_feat/submit-profile-image";

/**
 * Parameters for the profile image submission mutation.
 */
type ImageSubmitParams = {
    _id: ObjectId;
    onSubmit?: MutationResponseConfig;
    form: UseFormReturn<PersonProfileImageFormValues, unknown, PersonProfileImageFormData>;
};

/**
 * Custom hook to manage the lifecycle of a profile image upload.
 */
export function usePersonProfileImageSubmitMutation(
    {_id, form, onSubmit}: ImageSubmitParams
): UseMutationResult<void, unknown, PersonProfileImageFormData> {
    const queryClient = useQueryClient();
    const {onSubmitSuccess, onSubmitError, successMessage, errorMessage} = onSubmit || {};

    const submitAction = async (formValues: PersonProfileImageFormData): Promise<void> => {
        const formData = new FormData();
        formData.append("profileImage", formValues.profileImage);

        await patchUploadProfileImage({_id, data: formData});
    };

    const onSuccess = async () => {
        await Promise.all([
            queryClient.invalidateQueries({queryKey: ["fetch_single_person"], exact: false}),
            queryClient.invalidateQueries({queryKey: ["fetch_person_by_query"], exact: false}),
        ]);

        successMessage && toast.success(successMessage);
        onSubmitSuccess?.();
    };

    const onError = (error: unknown) => {
        errorMessage && toast.error(errorMessage);
        handleMutationFormError({displayMessage: "Failed to upload profile image.", form, error});
        onSubmitError?.(error);
    };

    return useMutation<void, unknown, PersonProfileImageFormData>({
        mutationKey: PersonProfileImageMutationKeys.upload({_id}),
        mutationFn: submitAction,
        onSuccess,
        onError,
    });
}