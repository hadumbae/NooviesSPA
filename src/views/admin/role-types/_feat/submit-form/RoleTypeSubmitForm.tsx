/**
 * @fileoverview Defines the form component and hook for submitting role type data.
 */

import {createForm} from "@/common/_feat";
import {RoleTypeFormSchema, useRoleTypeSubmitMutation} from "@/domains/roletypes";

const {SubmitForm, useSubmitForm} = createForm({
    formName: "role-type-form-schema",
    schema: RoleTypeFormSchema,
    mutation: useRoleTypeSubmitMutation,
    defaultValues: {
        roleName: "",
        department: "",
        category: "",
        description: "",
    },
});

export {
    /** Form component for submitting role type creation and update forms. */
        SubmitForm as RoleTypeSubmitForm,
    /** Custom hook for managing the role type submit form state and mutation handler. */
        useSubmitForm as useRoleTypeSubmitForm,
}