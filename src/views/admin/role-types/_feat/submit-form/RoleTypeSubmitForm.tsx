/**
 * @fileoverview Container component for managing the submission logic of RoleType forms.
 */

import {ReactElement, ReactNode, useEffect, useId} from 'react';
import {useRoleTypeSubmitForm} from "@/domains/roletype/_feat/submit-data/form/useRoleTypeSubmitForm.ts";
import {useRoleTypeSubmitMutation} from "@/domains/roletype/_feat/crud-hooks/useRoleTypeSubmitMutation.ts";
import {RoleType} from "@/domains/roletype/schema/model/RoleTypeSchema.ts";
import {RoleTypeFormData, RoleTypeFormValues} from "@/domains/roletype/_feat";
import {FormContainerConfigProps} from "@/common/_feat/submit-data";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {Form} from "@/common/components/ui/form.tsx";

/** Props for the RoleTypeSubmitFormContainer component. */
type SubmitFormProps = FormContainerConfigProps<RoleTypeFormValues, RoleType, RoleTypeFormData, RoleType> & {
    children: ReactNode;
};

/**
 * Orchestrates form state and mutation logic for creating or updating RoleType entities.
 */
export function RoleTypeSubmitForm(
    {children, formConfig, onSubmitConfig, resetConfig}: SubmitFormProps
): ReactElement {
    const id = useId();
    const formID = `role-type-submit-form-${id}`;

    const form = useRoleTypeSubmitForm(formConfig);
    const {mutate, isPending, isError} = useRoleTypeSubmitMutation({
        form,
        ...onSubmitConfig,
        ...resetConfig,
    });

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
