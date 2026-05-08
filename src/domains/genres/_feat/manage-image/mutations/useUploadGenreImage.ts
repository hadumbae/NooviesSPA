/**
 * @fileoverview Mutation hook for uploading and updating genre images.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {
    GenreImageUploadFormData,
    ManageGenreImageMutationKeys,
    patchUpdateGenreImage
} from "@/domains/genres/_feat/manage-image";
import {MutationFormConfig, MutationResponseConfig} from "@/common/features/submit-data";
import {Genre, GenreSchema} from "@/domains/genres/schema";
import {
    GenreImageUploadFormStarterValues
} from "@/domains/genres/_feat/manage-image/form/GenreImageUploadFormStarterValues.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {toast} from "react-toastify";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";

/** Configuration for the genre image upload mutation. */
type UploadConfig =
    MutationResponseConfig<Genre> & MutationFormConfig<GenreImageUploadFormStarterValues, GenreImageUploadFormData>;

/** Data required to execute the image upload. */
type UploadData = {
    _id: ObjectId;
    formData: FormData;
}

/** Hook to handle the genre image upload process and form state synchronisation. */
export function useUploadGenreImage(
    {form, resetForm, ...onSubmit}: UploadConfig
): UseMutationResult<Genre, unknown, UploadData> {
    const uploadImage = async ({_id, formData}: UploadData) => {
        const {result} = await patchUpdateGenreImage({_id, formData});
        const {data: parsed, success, error} = validateData({
            data: result,
            schema: GenreSchema,
            message: "Invalid data returned on image upload.",
        });

        if (!success) throw error;
        resetForm?.resetOnSubmit && form.reset();
        return parsed;
    }

    const onSuccess = (genre: Genre) => {
        onSubmit.onSubmitSuccess?.(genre);
        onSubmit.successMessage && toast.success(onSubmit.successMessage);
        resetForm?.resetOnSuccess && form.reset();
    }

    const onError = (error: unknown) => {
        onSubmit.errorMessage && toast.error(onSubmit.errorMessage);
        handleMutationFormError({form, error});
        onSubmit.onSubmitError?.(error);
    }

    return useMutation({
        mutationKey: ManageGenreImageMutationKeys.upload(),
        mutationFn: uploadImage,
        onSuccess,
        onError,
    });
}