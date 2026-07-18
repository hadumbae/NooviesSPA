import {redirect, RouteObject} from "react-router-dom";
import {AuthLoader} from "@/common/_loaders";
import {RoleTypeListPage} from "@/views/admin/role-types/_pages/list-page/page.tsx";
import {ComponentErrorHandler} from "@/views/common/_feat/error/ComponentErrorHandler.tsx";
import AdminLayout from "@/views/common/_layout/admin-layout/AdminLayout.tsx";

/**
 * Admin role type routes.
 *
 * @remarks
 * - Protected by {@link AuthLoader}
 * - Uses {@link AdminLayout} as the layout wrapper
 * - Redirects base path to the role type list view
 */
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
                element: <RoleTypeListPage />,
                errorElement: <ComponentErrorHandler />
            }
        ]
    }
];

export {
    routes as RoleTypeRoutes
}