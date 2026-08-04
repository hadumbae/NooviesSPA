/**
 * @fileoverview Exported form hook and container component generated for granting administrative roles to users.
 */

import {createForm} from "@/common/_feat";
import {
    useGrantUserAdminRole,
    UseGrantUserAdminRoleMutationConfig
} from "@/domains/users/_feat/manage-user-roles/manage-admin-role/mutations";
import {
    UpdateUserAdminRoleFormData,
    UpdateUserAdminRoleFormSchema,
    UpdateUserAdminRoleFormValues,
    UpdateUserAdminRoleReturns
} from "@/domains/users/_feat/manage-user-roles/manage-admin-role/schema";

const {SubmitForm, useSubmitForm} = createForm<
    typeof UpdateUserAdminRoleFormSchema.shape,
    UpdateUserAdminRoleFormValues,
    UpdateUserAdminRoleFormData,
    unknown,
    UpdateUserAdminRoleReturns,
    UseGrantUserAdminRoleMutationConfig
>({
    formName: "grant-user-admin-role-form",
    schema: UpdateUserAdminRoleFormSchema,
    mutation: useGrantUserAdminRole,
    defaultValues: {
        action: "",
        roles: [],
        message: "",
    },
});

export {
    /** Form validation state hook generated for the grant administrative role form ecosystem. */
        useSubmitForm as useGrantUserAdminRoleForm,
    /** Form container component for handling administrative role grant submission workflows. */
        SubmitForm as GrantUserAdminRoleForm,
};