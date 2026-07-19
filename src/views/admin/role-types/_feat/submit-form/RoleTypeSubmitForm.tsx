/**
 * @fileoverview Container component for managing the submission logic of RoleType forms.
 */

import {ReactElement, ReactNode, useEffect, useId} from 'react';
import {Form} from "@/views/common/_comp/ui";
import {FormContainerConfigProps} from "@/common/_feat/submit-data";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";

import {
    RoleType,
    RoleTypeFormData,
    RoleTypeFormValues,
    useRoleTypeSubmitForm,
    useRoleTypeSubmitMutation
} from "@/domains/roletypes";

/** Props for the RoleTypeSubmitFormContainer component. */
type SubmitFormProps = FormContainerConfigProps<RoleTypeFormValues, RoleType, RoleTypeFormData, RoleType> & {
    children: ReactNode;
};

/**
 * Orchestrates form state and mutation logic for creating or updating RoleType entities.
 */
export function RoleTypeSubmitForm(
    {children, formConfig}: SubmitFormProps
): ReactElement {
    const id = useId();
    const formID = `role-type-submit-form-${id}`;

    const form = useRoleTypeSubmitForm(formConfig);
    const {mutate, isPending, isError} = useRoleTypeSubmitMutation();

    const department = form.watch("department");

    useEffect(() => {
        form.resetField("category");
    }, [department]);

    const submitHandler = (values: RoleTypeFormData) => {
        mutate(values as RoleTypeFormData);
    };

    return (
        <BaseFormContextProvider formID={formID} isPending={isPending} isError={isError} submitHandler={submitHandler}>
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(submitHandler)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}
