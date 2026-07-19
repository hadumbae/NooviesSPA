/**
 * @fileoverview Form component for updating a user's password.
 */

import {ReactElement, useId} from 'react';
import {ObjectId} from "@/common/_schemas";
import {MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {Form} from "@/views/common/_comp/ui";
import {
    UserPasswordUpdateFormData,
    UserPasswordUpdateFormValues,
    useUpdateUserPasswordForm,
    useUpdateUserPasswordSubmitMutation
} from "@/domains/users";

/** Props for the UpdateUserPasswordForm component. */
type FormProps = {
    children: ReactElement;
    userID: ObjectId;
    onSubmitConfig?: MutationResponseConfig<void, UserPasswordUpdateFormValues>;
    resetConfig?: MutationFormResetConfig;
}

/** Form wrapper that manages the state and submission for updating user passwords. */
export function UpdateUserPasswordForm(
    {children, userID, onSubmitConfig, resetConfig}: FormProps
): ReactElement {
    const id = useId();
    const formID = `update-user-password-form-${id}`;

    const form = useUpdateUserPasswordForm();
    const {mutate, isPending, isError} = useUpdateUserPasswordSubmitMutation({
        form,
        userID,
        ...onSubmitConfig,
        ...resetConfig,
    });

    const submitHandler = (values: UserPasswordUpdateFormData) => {
        console.log("[UpdateUserPasswordForm] Values: ", values);
        mutate(values);
    }

    return (
        <BaseFormContextProvider formID={formID} submitHandler={submitHandler} isPending={isPending} isError={isError}>
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(submitHandler)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}
