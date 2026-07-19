/**
 * @fileoverview Form container for handling person profile image submissions.
 */

import {ReactElement, ReactNode} from 'react';
import {ObjectId} from "@/common/_schemas";
import {
    PersonProfileImageFormData,
    usePersonProfileImageSubmitForm,
    usePersonProfileImageSubmitMutation
} from "@/domains/persons/_feat/submit-profile-image";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {Form} from "@/views/common/_comp/ui/form.tsx";
import {
    handleSubmitResponseError
} from "@/common/_feat/error-handling/handleSubmitResponseError.ts";
import {handleMutationCallback} from "@/common/_feat/handle-mutation-callback";

/**
 * Props for the UploadPersonProfileImageForm component.
 */
type ContainerProps = MutationResponseConfig<void, PersonProfileImageFormData> & {
    personID: ObjectId;
    className?: string;
    uniqueKey?: string;
    children?: ReactNode;
};

/**
 * Orchestrator for the profile image upload process.
 */
export function UploadPersonProfileImageForm(
    {children, personID, className, uniqueKey, ...mutationConfig}: ContainerProps
): ReactElement {
    const formKey = `upload-person-profile-image-${uniqueKey ?? "form"}`;

    const form = usePersonProfileImageSubmitForm();
    const {mutateAsync, isPending, isError} = usePersonProfileImageSubmitMutation({_id: personID});

    const submitImage = async (values: PersonProfileImageFormData) => {
        try {
            handleMutationCallback({
                message: mutationConfig.submitMessage,
                cb: () => mutationConfig.onSubmit?.(values),
            });

            await mutateAsync(values);

            handleMutationCallback({
                message: mutationConfig.successMessage,
                cb: () => mutationConfig.onSubmitSuccess?.(),
                messageType: "success",
            });
        } catch (error: unknown) {
            handleSubmitResponseError({error, displayMessage: mutationConfig.errorMessage});
            mutationConfig.onSubmitError?.(error);
        }
    };

    return (
        <BaseFormContextProvider formID={formKey} isPending={isPending} isError={isError} submitHandler={submitImage}>
            <Form {...form}>
                <form id={formKey} className={className} onSubmit={form.handleSubmit(submitImage)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}