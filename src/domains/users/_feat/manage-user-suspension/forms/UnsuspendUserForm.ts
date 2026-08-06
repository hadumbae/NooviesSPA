/**
 * @fileoverview Exported form hook and container component generated for unsuspending user accounts.
 */

import {createForm} from "@/common/_feat";
import {useUnsuspendUser, UseUnsuspendUserConfig} from "@/domains/users/_feat/manage-user-suspension/mutations";
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
    UseUnsuspendUserConfig
>({
    formName: "admin-suspend-user-form",
    schema: UpdateUserSuspensionFormSchema,
    mutation: useUnsuspendUser,
    defaultValues: {
        action: "",
        message: "",
        suspend: false,
    },
});

export {
    /** Form validation state hook generated for the user unsuspension form ecosystem. */
        useSubmitForm as useUnsuspendUserForm,
    /** Form container component for handling user unsuspension submission workflows. */
        SubmitForm as UnsuspendUserForm,
}