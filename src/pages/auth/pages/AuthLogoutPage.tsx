import {FC, useEffect} from 'react';
import useAuthLogoutSubmitMutation from "@/pages/auth/hooks/useAuthLogoutSubmitMutation.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";

/**
 * Page component for logging out the current user.
 *
 * This page:
 * - Immediately triggers a logout mutation when mounted.
 * - Displays a full-page loader while the logout request is in progress.
 * - Redirects the user to the homepage upon successful logout.
 *
 * @returns A loader UI while logging out.
 *
 * @example
 * ```tsx
 * import LogoutPage from "@/pages/auth/components/page/LogoutPage";
 *
 * <Route path="/auth/logout" element={<LogoutPage />} />
 * ```
 */
const AuthLogoutPage: FC = () => {
    const navigate = useLoggedNavigate();

    /**
     * Callback invoked when logout succeeds.
     * Redirects the user to the homepage.
     */
    const onLogout = () => {
        navigate({
            to: "/",
            component: AuthLogoutPage.name,
            message: "Navigating to homepage after logging out.",
        });
    };

    // Hook for performing logout mutation
    const {mutate: logout} = useAuthLogoutSubmitMutation({onSubmitSuccess: onLogout});

    // Trigger logout immediately on component mount
    useEffect(() => {
        logout();
    }, [logout]);

    // Show a full-page loader while logout is in progress
    return (
        <PageLoader />
    );
};

export default AuthLogoutPage;
