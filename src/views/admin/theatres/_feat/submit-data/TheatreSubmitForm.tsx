/** @fileoverview Container component for the theatre creation and update form. */

import {ReactElement, ReactNode} from 'react';
import {Theatre} from "@/domains/theatres/_schema/theatre/TheatreSchema.ts";
import {TheatreFormValues, useTheatreSubmitForm} from "@/domains/theatres/_feat/submit-data";
import {TheatreFormData} from "@/domains/theatres/_feat/submit-data/schema.ts";
import {FormValuesConfig, MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";
import {useTheatreSubmitMutation} from "@/domains/theatres/_feat/crud-hooks";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {Form} from '@/common/components/ui/form';
import {useGenerateFormID} from "@/common/_feat/generate-form-keys";
import {handleMutationCallback} from "@/common/_feat/handle-mutation-callback";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";

/** Props for the TheatreSubmitForm component. */
type SubmitFormProps = MutationResponseConfig<Theatre, TheatreFormData> & MutationFormResetConfig & {
    children: ReactNode;
    formConfig?: FormValuesConfig<TheatreFormValues, Theatre>;
}

/**
 * Provides form logic and mutation handling for theatre data submission.
 */
export function TheatreSubmitForm(props: SubmitFormProps): ReactElement {
    const {children, formConfig, ...submitConfig} = props;

    const formID = useGenerateFormID("submit-theatre-data-form");

    const form = useTheatreSubmitForm(formConfig);
    const {mutateAsync, isPending, isError} = useTheatreSubmitMutation();

    const submitTheatreData = async (values: TheatreFormData) => {
        try {
            handleMutationCallback({
                cb: () => submitConfig.onSubmit?.(values),
                message: submitConfig.submitMessage,
            });

            const theatre = await mutateAsync(values);

            handleMutationCallback({
                cb: () => submitConfig.onSubmitSuccess?.(theatre),
                message: submitConfig.successMessage,
                messageType: "success",
            });
        } catch (error: unknown) {
            handleMutationResponseError({error, displayMessage: submitConfig.errorMessage});
            submitConfig.onSubmitError?.(error);
        }
    }

    return (
        <BaseFormContextProvider
            formID={formID}
            isPending={isPending}
            isError={isError}
            submitHandler={submitTheatreData}
        >
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(submitTheatreData)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}