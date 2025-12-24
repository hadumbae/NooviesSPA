import {redirect, RouteObject} from "react-router-dom";
import AuthLoader from "@/common/routing/loaders/AuthLoader.ts";
import RoleTypeListPage from "@/pages/roletype/pages/RoleTypeListPage.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";

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

export default routes;
