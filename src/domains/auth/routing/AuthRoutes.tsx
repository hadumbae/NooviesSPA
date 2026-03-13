import AuthLoginPage from "@/domains/auth/pages/AuthLoginPage.tsx";
import ErrorPage from "@/common/pages/ErrorPage.tsx";
import AuthRegisterPage from "@/domains/auth/pages/AuthRegisterPage.tsx";
import AuthLogoutPage from "@/domains/auth/pages/AuthLogoutPage.tsx";
import BaseLayout from "@/common/layout/base-layout/BaseLayout.tsx";

export default [
    {
        path: "/auth",
        element: <BaseLayout />,
        errorElement: <ErrorPage />,
        children: [
            {path: "/auth/register", element: <AuthRegisterPage />},
            {path: "/auth/login", element: <AuthLoginPage />},
            {path: "/auth/logout", element: <AuthLogoutPage />},
        ]
    }
];