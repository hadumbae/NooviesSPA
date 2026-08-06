/**
 * @fileoverview Exported form hook and container component generated for revoking administrative roles from users.
 */

import {createForm} from "@/common/_feat";
import {
    useRevokeUserAdminRole,
    UseRevokeUserAdminRoleMutationConfig
} from "@/domains/users/_feat/manage-user-roles/manage-admin-role/mutations";
import {
    UpdateUserAdminRoleFormData,
    UpdateUserAdminRoleFormSchema,
    UpdateUserAdminRoleFormValues,
    UpdateUserAdminRoleReturns
} from "@/domains/users/_feat/manage-user-roles/manage-admin-role/schema";

const {SubmitForm, useSubmitForm} = createForm<
    UpdateUserAdminRoleFormValues,
    UpdateUserAdminRoleFormData,
    unknown,
    UpdateUserAdminRoleReturns,
    UseRevokeUserAdminRoleMutationConfig
>({
    formName: "revoke-user-admin-role-form",
    schema: UpdateUserAdminRoleFormSchema,
    mutation: useRevokeUserAdminRole,
    defaultValues: {
        action: "",
        roles: [],
        message: "",
    },
});

export {
    /** Form validation state hook generated for the revoke administrative role form ecosystem. */
        useSubmitForm as useRevokeUserAdminRoleForm,
    /** Form container component for handling administrative role revocation submission workflows. */
        SubmitForm as RevokeUserAdminRoleForm,
};