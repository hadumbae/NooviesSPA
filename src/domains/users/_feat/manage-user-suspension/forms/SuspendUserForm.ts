/**
 * @fileoverview Exported form hook and container component generated for suspending user accounts.
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
        suspend: true,
    },
});

export {
    /** Form validation state hook generated for the user suspension form ecosystem. */
        useSubmitForm as useSuspendUserForm,
    /** Form container component for handling user suspension submission workflows. */
        SubmitForm as SuspendUserForm,
}