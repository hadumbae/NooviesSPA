/**
 * @fileoverview Defines the administrative route configuration for managing role types.
 */

import {redirect, RouteObject} from "react-router-dom";
import {AuthLoader} from "@/common/_loaders";
import {RoleTypeListPage} from "@/views/admin/role-types/_pages/list-page/page.tsx";
import {ComponentErrorHandler} from "@/views/common/_feat/error/ComponentErrorHandler.tsx";
import AdminLayout from "@/views/common/_layout/admin-layout/AdminLayout.tsx";
import {RoleTypeIndexQueryOptionsContextProvider} from "@/domains/roletypes";

/** Route configurations for administrative role type pages. */
const routes: RouteObject[] = [
    {
        path: "/admin/roletypes",
        element: <AdminLayout />,
        loader: AuthLoader,
        children: [
            {
                path: "/admin/roletypes",
                loader: () => redirect("/admin/roletypes/list"),
            },
            {
                path: "/admin/roletypes/list",
                errorElement: <ComponentErrorHandler />,
                element: (
                    <RoleTypeIndexQueryOptionsContextProvider>
                        <RoleTypeListPage />
                    </RoleTypeIndexQueryOptionsContextProvider>
                ),
            }
        ]
    }
];

export {
    routes as RoleTypeRoutes
}