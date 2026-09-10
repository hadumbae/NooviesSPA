/**
 * @fileoverview Form provider and hooks for handling user login form state and submission.
 */

import {createForm} from "@/common/_feat";
import {User} from "@/domains/users/_schema/user/UserSchema.ts";
import {useAuthLoginSubmitMutation} from "@/domains/auth/_feat/auth-login-fom/hooks/useAuthLoginSubmitMutation.ts";
import {
    AuthLoginFormData,
    AuthLoginFormSchema,
    AuthLoginFormValues
} from "@/domains/auth/_feat/auth-login-fom/schema/AuthLoginFormSchema";

const {SubmitForm, useSubmitForm} = createForm<
    AuthLoginFormValues,
    AuthLoginFormData,
    unknown,
    User
>({
    formName: "auth-login-form",
    schema: AuthLoginFormSchema,
    mutation: useAuthLoginSubmitMutation,
    defaultValues: {
        email: "",
        password: "",
    },
});

export {
    /** Form component provider for authentication login. */
        SubmitForm as AuthLoginForm,
    /** Hook for accessing and managing the authentication login form state. */
        useSubmitForm as useAuthLoginForm,
}