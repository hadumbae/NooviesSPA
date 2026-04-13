/**
 * @file Authentication login page component.
 * @filename AuthLoginPage.tsx
 */

import {useEffect} from "react";
import AuthLoginFormContainer from "@/domains/auth/components/form/login/AuthLoginFormContainer.tsx";
import {useLocation} from "react-router-dom";
import {toast} from "react-toastify";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {PageCenter} from "@/views/common/_comp/page";

/**
 * Renders the primary login interface and manages post-authentication redirection logic.
 */
const AuthLoginPage = () => {
    const navigate = useLoggedNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.showLoginError) {
            toast.error("An error occurred. Please log in.");
        }
    }, [location.state]);

    const onSubmitSuccess = () => {
        const path = sessionStorage.getItem("redirectPath");
        if (path) sessionStorage.removeItem("redirectPath");

        navigate({
            to: path ?? "/",
            component: AuthLoginPage.name,
            message: "Navigate on login success.",
        });
    };

    return (
        <PageCenter className="space-y-10">
            <h1 className="primary-text uppercase text-3xl font-extrabold">
                Login
            </h1>

            <AuthLoginFormContainer
                onSubmitSuccess={onSubmitSuccess}
                className="w-full md:w-2/3 2xl:w-1/3"
            />
        </PageCenter>
    );
};

export default AuthLoginPage;