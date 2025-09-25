import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import AuthRegisterFormContainer from "@/pages/auth/components/form/register/AuthRegisterFormContainer.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import RegisterHeader from "@/pages/auth/components/headers/RegisterHeader.tsx";
import useLoggedNavigate from "@/common/hooks/useLoggedNavigate.ts";

/**
 * Page component for user registration.
 *
 * This page:
 * - Displays a header with registration context (`RegisterHeader`).
 * - Wraps the registration form in a styled `Card`.
 * - Uses `AuthRegisterFormContainer` to handle form logic and API integration.
 * - Redirects the user to the login page upon successful registration.
 *
 * @returns The rendered registration page UI.
 *
 * @example
 * ```tsx
 * import AuthRegisterPage from "@/pages/auth/components/page/AuthRegisterPage";
 *
 * <Route path="/auth/register" element={<AuthRegisterPage />} />
 * ```
 */
const AuthRegisterPage: FC = () => {
    const navigate = useLoggedNavigate();

    /**
     * Handles navigation after successful registration.
     *
     * Redirects the user to the login page.
     */
    const onRegister = () => {
        navigate({
            to: "/auth/login",
            component: AuthRegisterPage.name,
            message: "Navigate to login page after registering.",
        });
    };

    return (
        <PageFlexWrapper>
            <RegisterHeader />

            <section>
                <Card>
                    <CardContent className="p-3">
                        <AuthRegisterFormContainer
                            onSubmitSuccess={onRegister}
                        />
                    </CardContent>
                </Card>
            </section>
        </PageFlexWrapper>
    );
};

export default AuthRegisterPage;
