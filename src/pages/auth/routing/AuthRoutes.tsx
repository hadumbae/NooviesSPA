import AuthLayout from "@/common/layout/AuthLayout.tsx";
import LoginPage from "@/pages/auth/pages/LoginPage.tsx";
import ErrorPage from "@/common/pages/ErrorPage.tsx";
import RegisterPage from "@/pages/auth/pages/RegisterPage.tsx";

export default [
    {
        path: "/auth",
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {path: "/auth/login", element: <LoginPage />},
            {path: "/auth/register", element: <RegisterPage />}
        ]
    }
];