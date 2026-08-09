/**
 * @fileoverview Defines the form component and hook for updating user account suspension status.
 */

import {createForm} from "@/common/_feat";
import {
    useUpdateUserSuspension,
    UseUpdateUserSuspensionConfig
} from "@/domains/users/_feat/manage-user-suspension/mutations";
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
    UseUpdateUserSuspensionConfig
>({
    formName: "admin-update-user-suspension-form",
    schema: UpdateUserSuspensionFormSchema,
    mutation: useUpdateUserSuspension,
    defaultValues: {
        action: "",
        message: "",
        suspend: true,
    },
});

export {
    /** Custom hook for managing state and submission of the user suspension form. */
        useSubmitForm as useUpdateUserSuspensionForm,
    /** React form component for submitting user account suspension updates. */
        SubmitForm as UpdateUserSuspensionForm,
}