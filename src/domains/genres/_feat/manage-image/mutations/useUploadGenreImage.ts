/**
 * @fileoverview Mutation hook for uploading and updating genre images.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";
import {Genre, GenreSchema} from "@/domains/genres/_schema";
import {ObjectId} from "@/common/_schemas";
import {validateData} from "@/common/_feat/validate-data/validateData.ts";
import {toast} from "react-toastify";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {UseFormReturn} from "react-hook-form";
import {patchUpdateGenreImage} from "@/domains/genres/_feat/manage-image/repository";
import {GenreImageUploadFormData, GenreImageUploadFormValues} from "@/domains/genres/_feat/manage-image/form";
import {ManageGenreImageMutationKeys} from "@/domains/genres/_feat/manage-image/mutations/mutationKeys.ts";

/** Configuration for the genre image upload mutation. */
type UploadConfig = MutationResponseConfig<Genre, FormData> & MutationFormResetConfig & {
    form: UseFormReturn<GenreImageUploadFormValues, unknown, GenreImageUploadFormData>;
};

/** Data required to execute the image upload. */
type UploadData = {
    _id: ObjectId;
    formData: FormData;
}

/** Hook to handle the genre image upload process and form state synchronisation. */
export function useUploadGenreImage(
    {form, resetOnSuccess, resetOnSubmit, resetOnError, ...onSubmitConfig}: UploadConfig
): UseMutationResult<Genre, unknown, UploadData> {
    const queryClient = useQueryClient();

    const uploadImage = async ({_id, formData}: UploadData) => {
        onSubmitConfig.onSubmit?.(formData);

        const {result} = await patchUpdateGenreImage({_id, formData});
        const {data: parsed, success, error} = validateData({
            data: result,
            schema: GenreSchema,
            message: "Invalid data returned on image upload.",
        });

        if (!success) throw error;
        resetOnSubmit && form.reset();
        return parsed;
    }

    const onSuccess = (genre: Genre) => {
        queryClient.invalidateQueries({queryKey: ['genres'], exact: false});

        onSubmitConfig.successMessage && toast.success(onSubmitConfig.successMessage);
        onSubmitConfig.onSubmitSuccess?.(genre);
        resetOnSuccess && form.reset();
    }

    const onError = (error: unknown) => {
        handleMutationFormError({form, error, displayMessage: onSubmitConfig.errorMessage});
        onSubmitConfig.onSubmitError?.(error);
    }

    return useMutation({
        mutationKey: ManageGenreImageMutationKeys.upload(),
        mutationFn: uploadImage,
        onSuccess,
        onError,
    });
}