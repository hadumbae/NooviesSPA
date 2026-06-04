/**
 * @file Authentication login page component.
 * @filename AuthLoginPage.tsx
 */

import {ReactElement, useEffect} from "react";
import {AuthLoginForm} from "@/views/common/_feat/auth-login-form/AuthLoginForm.tsx";
import {useLocation} from "react-router-dom";
import {toast} from "react-toastify";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {PageCenter} from "@/views/common/_comp/page";
import {AuthLoginPageHeader} from "@/views/common/_pages";
import {clearRedirectPath} from "@/common/_feat/manage-redirect-path/clearRedirectPath.ts";
import {AuthLoginFormView} from "@/views/common/_feat";
import {SROnly} from "@/views/common/_comp/screen-readers";

/**
 * Renders the primary login interface and manages post-authentication redirection logic.
 */
export function AuthLoginPage(): ReactElement {
    const navigate = useLoggedNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.showLoginError) {
            toast.error(
                location.state?.loginErrorMessage ??
                "An error occurred. Please log in."
            );
        }
    }, [location.state?.showLoginError]);

    const onSubmitSuccess = () => {
        const path = clearRedirectPath() ?? "/";

        navigate({
            to: path,
            component: AuthLoginPage.name,
            message: "Navigate on login success.",
        });
    };

    return (
        <PageCenter className="space-y-10">
            <AuthLoginPageHeader/>

            <section className="w-full md:w-2/3 2xl:w-1/3">
                <SROnly text="Login Form" />

                <AuthLoginForm onSubmitConfig={{onSubmitSuccess, successMessage: "Logged in!"}}>
                    <AuthLoginFormView/>
                </AuthLoginForm>
            </section>
        </PageCenter>
    );
}
