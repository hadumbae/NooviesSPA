/**
 * @fileoverview Submission container component for Theatre Screen forms.
 * Provides context and handles the orchestration of form state and persistence.
 */

import {ReactElement} from 'react';
import {TheatreScreen} from "@/domains/theatre-screens/schema/model";
import {
    TheatreScreenFormData,
    TheatreScreenFormValues,
    useTheatreScreenSubmitForm
} from "@/domains/theatre-screens/_feat/submit-data";
import {useTheatreScreenSubmitMutation} from "@/domains/theatre-screens/_feat/crud-hooks";
import {BaseFormContextProvider} from "@/common/features/generic-form-context";
import {Form} from "@/common/components/ui/form.tsx";
import {FormConfigProps} from "@/common/features/submit-data";
import {TheatreScreenDetails} from "@/domains/theatre-screens/schema/model/TheatreScreenDetailsSchema.ts";

/**
 * Props for the ScreenSubmitForm component.
 */
type ContainerProps = FormConfigProps<TheatreScreenFormValues, TheatreScreen, TheatreScreenDetails>;

/**
 * Orchestrates the Theatre Screen form submission lifecycle.
 */
export function TheatreScreenSubmitForm(
    {children, presetValues, editEntity, uniqueKey, ...mutationOptions}: ContainerProps
): ReactElement {
    const form = useTheatreScreenSubmitForm({presetValues, screen: editEntity});
    const formKey = `theatre-screen-submit-${uniqueKey ?? "form"}`;

    const mutation = useTheatreScreenSubmitMutation({form, ...mutationOptions});

    const submitScreenData = (values: TheatreScreenFormData) => {
        mutation.mutate(values);
    };

    return (
        <BaseFormContextProvider formID={formKey} isPending={mutation.isPending}>
            <Form {...form}>
                <form id={formKey} onSubmit={form.handleSubmit(submitScreenData)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}