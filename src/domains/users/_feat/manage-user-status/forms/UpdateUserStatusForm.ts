/**
 * @fileoverview Defines the form component and hook for updating user status using form utilities.
 */

import {createForm} from "@/common/_feat";
import {useUpdateUserStatus, UseUpdateUserStatusConfig} from "@/domains/users/_feat/manage-user-status/mutations";
import {
    UpdateUserStatusFormData,
    UpdateUserStatusFormSchema,
    UpdateUserStatusFormValues,
    UpdateUserStatusReturns
} from "@/domains/users/_feat/manage-user-status/schema";

const {SubmitForm, useSubmitForm} = createForm<
    UpdateUserStatusFormValues,
    UpdateUserStatusFormData,
    unknown,
    UpdateUserStatusReturns,
    UseUpdateUserStatusConfig
>({
    formName: "update-user-status-form",
    schema: UpdateUserStatusFormSchema,
    mutation: useUpdateUserStatus,
    defaultValues: {
        action: "",
        message: "",
        status: "",
    },
});

export {
    /** React form component for submitting user status updates. */
        SubmitForm as UpdateUserStatusForm,
    /** Custom hook for managing state and submission of the user status update form. */
        useSubmitForm as useUpdateUserStatusForm,
}