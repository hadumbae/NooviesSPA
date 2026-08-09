/**
 * @fileoverview Defines the form component and hook for updating user admin roles using form utilities.
 */

import {createForm} from "@/common/_feat";
import {
    UpdateUserAdminRoleFormData,
    UpdateUserAdminRoleFormSchema,
    UpdateUserAdminRoleFormValues,
    UpdateUserAdminRoleReturns
} from "@/domains/users/_feat/manage-user-roles/manage-admin-role/schema";
import {
    useUpdateUserAdminRole,
    UseUpdateUserAdminRoleMutationConfig
} from "@/domains/users/_feat/manage-user-roles/manage-admin-role/mutations";

const {SubmitForm, useSubmitForm} = createForm<
    UpdateUserAdminRoleFormValues,
    UpdateUserAdminRoleFormData,
    unknown,
    UpdateUserAdminRoleReturns,
    UseUpdateUserAdminRoleMutationConfig
>({
    formName: "update-user-admin-role-form",
    schema: UpdateUserAdminRoleFormSchema,
    mutation: useUpdateUserAdminRole,
    defaultValues: {
        action: "",
        roles: [],
        message: "",
    },
});

export {
    /** React form component for submitting user admin role updates. */
        useSubmitForm as useUpdateUserAdminRoleForm,
    /** Custom hook for managing state and submission of the user admin role form. */
        SubmitForm as UpdateUserAdminRoleForm,
};