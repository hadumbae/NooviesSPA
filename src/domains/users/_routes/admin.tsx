/**
 * @fileoverview Defines the administration route configuration for user management.
 */

import {RouteObject} from "react-router-dom";
import AdminLayout from "@/views/common/_layout/admin-layout/AdminLayout.tsx";
import {ErrorPage} from "@/views/common/_pages";
import {UserIndexPage} from "@/views/admin/users/pages/index-page/page.tsx";
import {ComponentErrorHandler} from "@/views/common/_feat";
import {UserIndexQueryOptionsContextProvider} from "@/domains/users";
import {UserDetailsPage} from "@/views/admin/users/pages/details-page/page.tsx";

/** Route definitions for the user administration module. */
export const AdminUserRoutes: RouteObject[] = [
    {
        path: "/admin/users",
        element: <AdminLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/admin/users",
                errorElement: <ComponentErrorHandler/>,
                element: (
                    <UserIndexQueryOptionsContextProvider>
                        <UserIndexPage/>
                    </UserIndexQueryOptionsContextProvider>
                ),
            },
            {
                path: "/admin/users/:userID",
                element: <UserDetailsPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
        ],
    }
];