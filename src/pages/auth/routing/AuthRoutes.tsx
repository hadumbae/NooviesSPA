import AuthLayout from "@/common/layout/AuthLayout.tsx";
import LoginPage from "@/pages/auth/pages/LoginPage.tsx";
import ErrorPage from "@/common/pages/ErrorPage.tsx";
import RegisterPage from "@/pages/auth/pages/RegisterPage.tsx";
import LogoutPage from "@/pages/auth/pages/LogoutPage.tsx";

export default [
    {
        path: "/auth",
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {path: "/auth/register", element: <RegisterPage />},
            {path: "/auth/login", element: <LoginPage />},
            {path: "/auth/logout", element: <LogoutPage />},
        ]
    }
];