/**
 * @fileoverview Container component for Person entity management.
 * Orchestrates the relationship between form state, server-side mutations,
 * and the presentational view.
 */

import {ReactElement, ReactNode} from 'react';
import {Person} from "@/domains/persons/schema/person/Person.types.ts";
import {
    PersonFormData,
    PersonFormValues,
    usePersonSubmitForm,
} from "@/domains/persons/_feat/submit-form";
import {useSubmitPersonData} from "@/domains/persons/_feat/crud-hooks";
import {BaseFormContextProvider} from "@/common/features/generic-form-context";
import {FormOptions, MutationResponseConfig} from "@/common/features/submit-data";
import {Form} from "@/common/components/ui/form.tsx";

/**
 * Props for the PersonSubmitForm component.
 */
type SubmitFormParams = FormOptions<PersonFormValues, Person> & MutationResponseConfig<Person> & {
    children: ReactNode;
    uniqueKey?: string;
};

/**
 * Logic-heavy container for the Person submission flow (Create/Update).
 */
export function PersonSubmitForm(
    params: SubmitFormParams
): ReactElement {
    const {
        children,
        uniqueKey,
        presetValues,
        resetOnSuccess,
        resetOnError,
        editEntity,
        ...onSubmitParams
    } = params;

    const formKey = `submit-person-data-${uniqueKey ?? "form"}`;

    const form = usePersonSubmitForm({person: editEntity, presetValues});

    const mutation = useSubmitPersonData({
        form,
        onSubmit: onSubmitParams,
        resetForm: {
            onSuccess: resetOnSuccess,
            onError: resetOnError,
        },
    });

    const submitPerson = (values: PersonFormData) => {
        mutation.mutate(values);
    };

    return (
        <BaseFormContextProvider formID={formKey} isPending={mutation.isPending}>
            <Form {...form}>
                <form id={formKey} onSubmit={form.handleSubmit(submitPerson)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}