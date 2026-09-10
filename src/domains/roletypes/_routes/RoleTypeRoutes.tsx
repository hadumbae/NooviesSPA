/**
 * @fileoverview Defines the administrative route configuration for managing role types.
 */

import {redirect, RouteObject} from "react-router-dom";
import {AuthLoader} from "@/common/_loaders";
import {ComponentErrorHandler} from "@/views/common/_feat/error/ComponentErrorHandler.tsx";
import AdminLayout from "@/views/common/_layout/admin-layout/AdminLayout.tsx";

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
                lazy: async () => {
                    const {RoleTypeListPage} = await import("@/views/admin/role-types/_pages/list-page/page.tsx");
                    const {RoleTypeIndexQueryOptionsContextProvider} = await import("@/domains/roletypes/_feat/validate-query-options/roletype-index/RoleTypeIndexQueryOptionsContext.ts");
                    return {
                        Component: () => (
                            <RoleTypeIndexQueryOptionsContextProvider>
                                <RoleTypeListPage />
                            </RoleTypeIndexQueryOptionsContextProvider>
                        ),
                    };
                },
            }
        ]
    }
];

export {
    routes as RoleTypeRoutes
}
