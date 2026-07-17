/**
 * @fileoverview Defines the routing configuration for authentication-related pages.
 */

import {AuthLoginPage} from "@/views/common/_pages/auth/login/page.tsx";
import {ErrorPage} from "@/views/common/_pages/error/ErrorPage.tsx";
import {AuthRegisterPage} from "@/views/common/_pages/auth/register/page.tsx";
import {AuthLogoutPage} from "@/views/common/_pages/auth/logout/page.tsx";
import {BaseLayout} from "@/views/common/_layout/base-layout/BaseLayout.tsx";

/** Route definitions for registration, login, and logout views. */
export const AuthRoutes = [
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