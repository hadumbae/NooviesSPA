/**
 * Authentication login page.
 *
 * Renders the login form and handles post-login navigation and
 * redirected error messaging.
 */
import {useEffect} from "react";
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
 * @remarks
 * - Displays an error toast when redirected with `showLoginError`
 * - Delegates authentication logic to {@link AuthLoginFormContainer}
 * - Redirects the user after successful login
 */
const AuthLoginPage = () => {
    // --- HOOKS ---

    const navigate = useLoggedNavigate();
    const location = useLocation();

    /**
     * Displays an error toast when redirected from a failed auth flow.
     */
    useEffect(() => {
        if (location.state?.showLoginError) {
            toast.error("An error occurred. Please log in.");
        }
    }, [location.state]);

    // --- CALLBACKS ---

    /**
     * Handles post-login navigation.
     *
     * @remarks
     * - Redirects to the stored `redirectPath` if present
     * - Falls back to `/`
     * - Cleans up session storage
     */
    const onSubmitSuccess = () => {
        const path = sessionStorage.getItem("redirectPath");

        if (path) {
            sessionStorage.removeItem("redirectPath");
        }

        navigate({
            to: path ?? "/",
            component: AuthLoginPage.name,
            message: "Navigate on login success.",
        });
    };

    // --- RENDER ---

    return (
        <PageFlexWrapper>
            <header>
                <HeaderTitle>Login</HeaderTitle>
                <HeaderDescription>
                    Enter your credentials to login.
                </HeaderDescription>
            </header>

            <section className="flex justify-center">
                <SectionHeader srOnly>
                    Login Form
                </SectionHeader>

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
