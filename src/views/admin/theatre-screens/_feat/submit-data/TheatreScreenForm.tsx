/**
 * @fileoverview Submission container component for Theatre Screen forms.
 * Provides context and handles the orchestration of form state and persistence.
 */

import {ReactElement, ReactNode} from 'react';
import {
    TheatreScreen,
    TheatreScreenDetails,
    TheatreScreenFormData,
    TheatreScreenFormValues,
    useTheatreScreenSubmitForm,
    useTheatreScreenSubmitMutation
} from "@/domains/theatre-screens";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {Form} from "@/common/components/ui/form.tsx";
import {FormValuesConfig, MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {handleMutationCallback} from "@/common/_feat/handle-mutation-callback";

/**
 * Props for the ScreenSubmitForm component.
 */
type FormProps = MutationResponseConfig<TheatreScreenDetails, TheatreScreenFormValues> & MutationFormResetConfig & {
    formConfig?: FormValuesConfig<TheatreScreenFormValues, TheatreScreen>;
    children: ReactNode;
}

/**
 * Orchestrates the Theatre Screen form submission lifecycle.
 */
export function TheatreScreenForm(
    {children, formConfig, ...submitConfig}: FormProps
): ReactElement {
    const form = useTheatreScreenSubmitForm(formConfig);
    const formKey = `theatre-screen-submit-form`;

    const {mutateAsync, isPending, isError} = useTheatreScreenSubmitMutation();

    const submitScreenData = async (values: TheatreScreenFormData) => {
        try {
            handleMutationCallback({
                cb: () => submitConfig.onSubmit?.(values),
                message: submitConfig.submitMessage,
            });

            const screen = await mutateAsync(values);

            handleMutationCallback({
                cb: () => submitConfig.onSubmitSuccess?.(screen),
                message: submitConfig.successMessage,
                messageType: "success"
            });
        } catch (error: unknown) {
            handleMutationFormError({form, error, displayMessage: submitConfig.errorMessage});
            submitConfig.onSubmitError?.(error);
        }
    };

    return (
        <BaseFormContextProvider
            formID={formKey}
            isPending={isPending}
            isError={isError}
            submitHandler={submitScreenData}
        >
            <Form {...form}>
                <form id={formKey} onSubmit={form.handleSubmit(submitScreenData)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}