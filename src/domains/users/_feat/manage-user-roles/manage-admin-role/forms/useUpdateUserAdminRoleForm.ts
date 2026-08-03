/**
 * @fileoverview Custom React Hook for initializing and validating the user administrative role update form.
 */

import {createFormHook} from "@/common/_feat";
import {
    UpdateUserAdminRoleFormData,
    UpdateUserAdminRoleFormSchema,
    UpdateUserAdminRoleFormValues
} from "@/domains/users/_feat/manage-user-roles/manage-admin-role/schema";

/** Form validation state hook generated for the administrative role management form ecosystem. */
export const useUpdateUserAdminRoleForm = createFormHook<
    typeof UpdateUserAdminRoleFormSchema.shape,
    UpdateUserAdminRoleFormValues,
    UpdateUserAdminRoleFormData
>({
    schema: UpdateUserAdminRoleFormSchema,
    defaultValues: {
        action: "",
        roles: [],
        message: "",
    },
});