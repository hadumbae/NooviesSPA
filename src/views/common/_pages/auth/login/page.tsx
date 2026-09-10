/**
 * @file Authentication login page component.
 * @filename AuthLoginPage.tsx
 */

import Cookies from "js-cookie";
import {DateTime} from "luxon";
import {ReactElement, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {clearRedirectPath} from "@/common/_feat";
import {PageCenter} from "@/views/common/_comp/page";
import {AuthLoginPageHeader} from "@/views/common/_pages";
import {AuthLoginFormView} from "@/views/common/_feat";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {User} from "@/domains/users/_schema/user/UserSchema.ts";
import {setAuthExpireBy, useSetAuthUser} from "@/domains/auth/_feat/manage-auth-user-data/storage";
import {AuthLoginForm} from "@/views/common/_feat/auth-login-form/AuthLoginForm.tsx";

/**
 * Renders the primary login interface and manages post-authentication redirection logic.
 */
export function AuthLoginPage(): ReactElement {
    const navigate = useNavigate();
    const location = useLocation();
    const setAuthUser = useSetAuthUser();

    useEffect(() => {
        if (location.state?.showLoginError) {
            toast.error(
                location.state?.loginErrorMessage ??
                "An error occurred. Please log in."
            );
        }
    }, [location.state?.showLoginError]);

    const onSubmitSuccess = (user: User) => {
        const refreshByDate = Cookies.get("refreshBy");
        const refreshDate = refreshByDate ? DateTime.fromISO(refreshByDate) : DateTime.now();

        setAuthUser(user);
        setAuthExpireBy(refreshDate);

        const path = clearRedirectPath() ?? "/";
        navigate(path);
    };

    return (
        <PageCenter className="space-y-10">
            <AuthLoginPageHeader/>

            <section className="w-full md:w-2/3 2xl:w-1/3">
                <SROnly text="Login Form"/>

                <AuthLoginForm onSubmitSuccess={onSubmitSuccess} successMessage="Logged in!">
                    <AuthLoginFormView/>
                </AuthLoginForm>
            </section>
        </PageCenter>
    );
}
