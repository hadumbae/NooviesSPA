/**
 * @fileoverview Form component for uploading and updating genre images.
 */

import {ReactElement, ReactNode, useId} from "react";
import {Form} from "@/views/common/_comp/ui/form.tsx";
import {ObjectId} from "@/common/_schemas";
import {MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {
    Genre,
    GenreImageUploadFormData,
    GenreImageUploadFormValues,
    useGenreImageUploadForm,
    useUploadGenreImage
} from "@/domains/genres";
import {handleFormSubmitError, handleMutationCallback} from "@/common/_feat";
import {DefaultValues} from "react-hook-form";

/** Props for the GenreImageUploadForm component. */
type FormProps = MutationResponseConfig<Genre, FormData> & MutationFormResetConfig & {
    resetValues?: DefaultValues<GenreImageUploadFormValues>;
    children: ReactNode;
    _id: ObjectId;
};

/** Form component that handles multipart/form-data submission for genre images. */
export function GenreImageUploadForm(
    {children, _id, resetValues, ...submitConfig}: FormProps
): ReactElement {
    const id = useId();
    const formID = `genre-image-upload-form-${id}`

    const form = useGenreImageUploadForm();

    const {mutateAsync, isPending, isError} = useUploadGenreImage();

    const submitImage = async ({image}: GenreImageUploadFormData) => {
        const formData = new FormData();
        formData.append("image", image);

        try {
            submitConfig.resetOnSubmit && form.reset(resetValues);

            handleMutationCallback({
                message: submitConfig.submitMessage,
                cb: () => submitConfig.onSubmit?.(formData),
            });

            const data = await mutateAsync({_id, formData});
            console.log("Mutation Response:", data);

            submitConfig.resetOnSuccess && form.reset(resetValues);

            handleMutationCallback({
                message: submitConfig.successMessage,
                cb: () => submitConfig.onSubmitSuccess?.(data),
                messageType: "success",
            });
        } catch (error: unknown) {
            handleFormSubmitError({form, error, displayMessage: submitConfig.errorMessage});
            submitConfig.resetOnError && form.reset(resetValues);
            submitConfig.onSubmitError?.(error);
        }
    }

    return (
        <BaseFormContextProvider formID={formID} isPending={isPending} isError={isError}>
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(submitImage)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}