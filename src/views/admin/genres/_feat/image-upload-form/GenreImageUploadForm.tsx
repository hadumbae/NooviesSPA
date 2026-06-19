/**
 * @fileoverview Form component for uploading and updating genre images.
 */

import {ReactElement, ReactNode, useId} from "react";
import {Form} from "@/common/components/ui/form.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {Genre, GenreImageUploadFormData, useGenreImageUploadForm, useUploadGenreImage} from "@/domains/genres";

/** Props for the GenreImageUploadForm component. */
type FormProps = {
    children: ReactNode;
    _id: ObjectId;
    onSubmitConfig?: MutationResponseConfig<Genre, FormData>;
    resetConfig?: MutationFormResetConfig,
};

/** Form component that handles multipart/form-data submission for genre images. */
export function GenreImageUploadForm(
    {children, _id, onSubmitConfig, resetConfig}: FormProps
): ReactElement {
    const id = useId();
    const formID = `genre-image-upload-form-${id}`

    const form = useGenreImageUploadForm();

    const {mutate, isPending, isError} = useUploadGenreImage({
        form,
        ...onSubmitConfig,
        ...resetConfig,
    });

    const submitImage = ({image}: GenreImageUploadFormData) => {
        const formData = new FormData();
        formData.append("image", image);

        mutate({_id, formData});
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