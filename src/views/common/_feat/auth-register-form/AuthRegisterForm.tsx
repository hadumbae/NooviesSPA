/**
 * @fileoverview Container component for the user registration form.
 */

import {useAuthRegisterForm} from "@/domains/auth/_feat/auth-register-form/hooks/useAuthRegisterForm.ts";
import {
    useAuthRegisterSubmitMutation
} from "@/domains/auth/_feat/auth-register-form/hooks/useAuthRegisterSubmitMutation.ts";
import type {AuthRegisterForm} from "@/domains/auth/_feat/auth-register-form/schema";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {ReactElement, ReactNode, useId} from "react";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {Form} from "@/views/common/_comp/ui/form.tsx";

/** Props for the AuthRegisterForm component. */
type ContainerProps = {
    children: ReactNode;
    onSubmitConfig?: MutationResponseConfig<void, AuthRegisterForm>;
};

/**
 * Provides form logic and mutation handling for user registration.
 */
export function AuthRegisterForm(
    {children, onSubmitConfig}: ContainerProps
): ReactElement {
    const id = useId();
    const formID = `auth-register-form-${id}`;

    const form = useAuthRegisterForm();
    const {mutate, isPending, isError} = useAuthRegisterSubmitMutation({form, ...onSubmitConfig});

    const onSubmit = (values: AuthRegisterForm) => {
        mutate(values);
    };

    return (
        <BaseFormContextProvider
            formID={formID}
            submitHandler={onSubmit}
            isPending={isPending}
            isError={isError}
        >
            <Form {...form}>
                <form
                    id={formID}
                    onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("Auth Register Errors: ", errors))}
                >
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}
