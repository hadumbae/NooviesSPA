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
    useSubmitForm as useGrantUserAdminRoleForm,
    SubmitForm as GrantUserAdminRoleForm,
};