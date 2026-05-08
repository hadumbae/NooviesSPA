/**
 * @fileoverview Form component for uploading and updating genre images.
 */

import {ReactElement, ReactNode} from "react";
import {
    GenreImageUploadFormData,
    useGenreImageUploadForm,
    useUploadGenreImage
} from "@/domains/genres/_feat/manage-image";
import {BaseFormContextProvider} from "@/common/features/generic-form-context";
import {Form} from "@/common/components/ui/form.tsx";
import {MutationResponseConfig} from "@/common/features/submit-data";
import {Genre} from "@/domains/genres/schema";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/** Props for the GenreImageUploadForm component. */
type FormProps = MutationResponseConfig<Genre> & {
    children: ReactNode;
    _id: ObjectId;
    uniqueKey?: string;
    resetOnSuccess?: boolean;
    resetOnError?: boolean;
};

/** Form component that handles multipart/form-data submission for genre images. */
export function GenreImageUploadForm(
    {children, _id, uniqueKey, resetOnSuccess, resetOnError, ...onSubmit}: FormProps
): ReactElement {
    const formKey = `genre-image-upload-${uniqueKey ?? "form"}`
    const form = useGenreImageUploadForm();

    const {mutate, isPending} = useUploadGenreImage({form, resetForm: {resetOnSuccess, resetOnError}, ...onSubmit});

    const submitImage = ({image}: GenreImageUploadFormData) => {
        const formData = new FormData();
        formData.append("image", image);

        mutate({_id, formData});
    }

    return (
        <BaseFormContextProvider formID={formKey} isPending={isPending}>
            <Form {...form}>
                <form id={formKey} onSubmit={form.handleSubmit(submitImage)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}