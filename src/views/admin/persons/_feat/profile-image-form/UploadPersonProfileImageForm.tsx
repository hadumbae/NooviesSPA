/**
 * @fileoverview Form container for handling person profile image submissions.
 * Orchestrates the form state, validation, and mutation lifecycle.
 */

import {ReactElement, ReactNode} from 'react';
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {
    PersonProfileImageFormData,
    usePersonProfileImageSubmitForm,
    usePersonProfileImageSubmitMutation
} from "@/domains/persons/_feat/submit-profile-image";
import {MutationResponseConfig} from "@/common/features/submit-data";
import {BaseFormContextProvider} from "@/common/features/generic-form-context";
import {Form} from "@/common/components/ui/form.tsx";

/**
 * Props for the UploadPersonProfileImageForm component.
 */
type ContainerProps = MutationResponseConfig & {
    personID: ObjectId;
    className?: string;
    uniqueKey?: string;
    children?: ReactNode;
};

/**
 * Orchestrator for the profile image upload process.
 */
export function UploadPersonProfileImageForm(
    {children, personID, className, uniqueKey, ...mutationProps}: ContainerProps
): ReactElement {
    const formKey = `upload-person-profile-image-${uniqueKey ?? "form"}`;

    const form = usePersonProfileImageSubmitForm();

    const mutation = usePersonProfileImageSubmitMutation({
        _id: personID,
        form,
        onSubmit: mutationProps,
    });

    const submitImage = (values: PersonProfileImageFormData) => {
        mutation.mutate(values);
    };

    return (
        <BaseFormContextProvider formID={formKey} isPending={mutation.isPending}>
            <Form {...form}>
                <form
                    id={formKey}
                    className={className}
                    onSubmit={form.handleSubmit(submitImage)}
                >
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}