/**
 * @fileoverview Container component for the authentication login form that integrates form logic with submission mutations.
 */

import {ReactElement, ReactNode, useId} from 'react';
import {User} from "@/domains/users/schemas/user/User.types.ts";
import {AuthLoginFormData} from "@/domains/auth/_feat";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {useAuthLoginForm, useAuthLoginSubmitMutation} from "@/domains/auth/_feat/auth-login-fom/hooks";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {Form} from "@/common/components/ui/form.tsx";

/** Props for the AuthLoginForm component. */
type FormProps = {
    children: ReactNode;
    onSubmitConfig?: MutationResponseConfig<User, AuthLoginFormData>;
}

/**
 * Container component that manages the authentication login form state and submission mutation.
 */
export function AuthLoginForm(
    {children, onSubmitConfig}: FormProps
): ReactElement {
    const id = useId();
    const formID = `auth-login-form-${id}`;

    const form = useAuthLoginForm();
    const {mutate, isPending, isError} = useAuthLoginSubmitMutation({form, ...onSubmitConfig});

    const onSubmit = (values: AuthLoginFormData) => {
        console.log("Logging In...");
        mutate(values);
    };

    return (
        <BaseFormContextProvider formID={formID} submitHandler={onSubmit} isPending={isPending} isError={isError}>
            <Form {...form}>
                <form
                    id={formID}
                    onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("Auth Log In Errors: ", errors))}
                >
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}

