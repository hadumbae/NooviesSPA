/**
 * @fileoverview Page component for user registration.
 */

import {ReactElement} from 'react';
import {PageCenter} from "@/views/common/_comp/page";
import {AuthRegisterForm} from "@/views/common/_feat/auth-register-form/AuthRegisterForm.tsx";
import {AuthRegisterPageHeader} from "@/views/common/_pages/auth/register/header.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {AuthRegisterFormView} from "@/views/common/_feat/auth-register-form";
import {SROnly} from "@/views/common/_comp/screen-readers";

/**
 * Renders the registration page containing the AuthRegisterForm within a styled card.
 */
export function AuthRegisterPage(): ReactElement {
    const navigate = useLoggedNavigate();

    const onRegister = () => {
        navigate({
            to: "/auth/login",
            component: AuthRegisterPage.name,
            message: "Navigate to login page after registering.",
        });
    };

    return (
        <PageCenter className="space-y-10">
            <AuthRegisterPageHeader/>

            <section className="w-full md:w-2/3 2xl:w-1/3">
                <SROnly text="Register Form"/>

                <AuthRegisterForm onSubmitConfig={{onSubmitSuccess: onRegister}}>
                    <AuthRegisterFormView/>
                </AuthRegisterForm>
            </section>
        </PageCenter>
    );
}
