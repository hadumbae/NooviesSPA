/**
 * @fileoverview Custom React Hook for initializing and validating the user suspension status form.
 */

import {createForm} from "@/common/_feat";
import {useSuspendUser, UseSuspendUserConfig} from "@/domains/users/_feat/manage-user-suspension/mutations";
import {
    UpdateUserSuspensionFormData,
    UpdateUserSuspensionFormSchema,
    UpdateUserSuspensionFormValues,
    UpdateUserSuspensionReturns
} from "@/domains/users/_feat/manage-user-suspension/schema";

const {useSubmitForm, SubmitForm} = createForm<
    typeof UpdateUserSuspensionFormSchema.shape,
    UpdateUserSuspensionFormValues,
    UpdateUserSuspensionFormData,
    unknown,
    UpdateUserSuspensionReturns,
    UseSuspendUserConfig
>({
    formName: "admin-suspend-user-form",
    schema: UpdateUserSuspensionFormSchema,
    mutation: useSuspendUser,
    defaultValues: {
        action: "",
        message: "",
        suspend: ""
    },
});

export {
    useSubmitForm as useSuspendUserForm,
    SubmitForm as SuspendUserForm,
}