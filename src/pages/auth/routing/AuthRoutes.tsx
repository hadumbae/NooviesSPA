import AdminLayout from "@/common/layout/AdminLayout.tsx";
import AuthLoginPage from "@/pages/auth/pages/AuthLoginPage.tsx";
import ErrorPage from "@/common/pages/ErrorPage.tsx";
import AuthRegisterPage from "@/pages/auth/pages/AuthRegisterPage.tsx";
import AuthLogoutPage from "@/pages/auth/pages/AuthLogoutPage.tsx";

export default [
    {
        path: "/auth",
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        children: [
            {path: "/auth/register", element: <AuthRegisterPage />},
            {path: "/auth/login", element: <AuthLoginPage />},
            {path: "/auth/logout", element: <AuthLogoutPage />},
        ]
    }
];