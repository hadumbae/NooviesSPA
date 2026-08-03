/**
 * @fileoverview Custom React Hook for initializing and validating the user suspension status form.
 */

import {createFormHook} from "@/common/_feat";
import {
    UpdateUserSuspensionFormData,
    UpdateUserSuspensionFormSchema,
    UpdateUserSuspensionFormValues
} from "@/domains/users/_feat/manage-user-suspension/schema";

/** Form validation state hook generated for the user suspension management form ecosystem. */
export const useUpdateUserSuspensionForm = createFormHook<
    typeof UpdateUserSuspensionFormSchema.shape,
    UpdateUserSuspensionFormValues,
    UpdateUserSuspensionFormData
>({
    schema: UpdateUserSuspensionFormSchema,
    defaultValues: {
        action: "",
        message: "",
        suspend: ""
    },
});