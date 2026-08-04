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
    typeof UpdateUserAdminRoleFormSchema.shape,
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
    useSubmitForm as useRevokeUserAdminRoleForm,
    SubmitForm as RevokeUserAdminRoleForm,
};