/** @fileoverview Container component for the theatre creation and update form. */

import {ReactElement} from 'react';
import {Theatre} from "@/domains/theatres/schema/theatre/TheatreSchema.ts";
import {TheatreFormStarterValues, useTheatreSubmitForm} from "@/domains/theatres/_feat/submit-data";
import {TheatreFormData} from "@/domains/theatres/_feat/submit-data/TheatreForm.schema.ts";
import {FormConfigProps} from "@/common/_feat/submit-data";
import {useTheatreSubmitMutation} from "@/domains/theatres/_feat/crud-hooks";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {Form} from '@/common/components/ui/form';

/** Props for the TheatreSubmitForm component. */
type SubmitFormProps = FormConfigProps<TheatreFormStarterValues, Theatre, Theatre>;

/**
 * Provides form logic and mutation handling for theatre data submission.
 */
export function TheatreSubmitForm(props: SubmitFormProps): ReactElement {
    const {children, presetValues, editEntity, uniqueKey, resetOnSuccess, resetOnError, ...mutationProps} = props;

    const formID = `submit-theatre-data-${uniqueKey ?? "form"}`;

    const form = useTheatreSubmitForm({theatre: editEntity, presetValues});
    const mutation = useTheatreSubmitMutation({form, resetOnSubmit: true, ...mutationProps});

    const submitTheatreData = (values: TheatreFormData) => mutation.mutate(values);

    return (
        <BaseFormContextProvider formID={formID}>
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(submitTheatreData)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}