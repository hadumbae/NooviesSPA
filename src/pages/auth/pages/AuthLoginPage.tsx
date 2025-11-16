import {FC, useEffect} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import AuthLoginFormContainer from "@/pages/auth/components/form/login/AuthLoginFormContainer.tsx";
import {useLocation} from "react-router-dom";
import {toast} from "react-toastify";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";

/**
 * Login page component.
 *
 * Renders the login form with a title and description. Handles navigation
 * after successful login and displays login error messages if redirected
 * with `showLoginError` state.
 *
 * @remarks
 * - Uses `AuthLoginFormContainer` for the login form.
 * - Uses `useLoggedNavigate` for programmatic navigation.
 * - Reads optional `redirectPath` from sessionStorage to redirect after login.
 */
const AuthLoginPage: FC = () => {
    const navigate = useLoggedNavigate();
    const location = useLocation();

    /**
     * Display an error toast if redirected with `showLoginError` in location state.
     */
    useEffect(() => {
        if (location.state?.showLoginError) {
            toast.error("An error occurred. Please log in.");
        }
    }, [location.state]);

    /**
     * Callback executed after a successful login.
     *
     * - Redirects the user to the `redirectPath` saved in sessionStorage, or to `/` if none.
     * - Cleans up the stored redirect path.
     */
    const onSubmitSuccess = () => {
        const path = sessionStorage.getItem("redirectPath");
        path && sessionStorage.removeItem("redirectPath");

        navigate({
            to: path ?? "/",
            component: AuthLoginPage.name,
            message: "Navigate on login success."
        });
    };

    return (
        <PageFlexWrapper>
            <header>
                <HeaderTitle>Login</HeaderTitle>
                <HeaderDescription>Enter your credentials to login.</HeaderDescription>
            </header>

            <section className="flex justify-center">
                <SectionHeader srOnly={true}>Login Form</SectionHeader>

                <Card className="w-full md:w-5/6 lg:w-2/3 xl:w-1/2">
                    <CardContent className="p-3">
                        <AuthLoginFormContainer
                            onSubmitSuccess={onSubmitSuccess}
                        />
                    </CardContent>
                </Card>
            </section>
        </PageFlexWrapper>
    );
};

export default AuthLoginPage;
