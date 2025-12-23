import {RouteObject} from "react-router-dom";
import AuthLoader from "@/common/routing/loaders/AuthLoader.ts";
import RoleTypeListPage from "@/pages/roletype/pages/RoleTypeListPage.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";

const routes: RouteObject[] = [
    {
        path: "/admin/roletypes",
        element: <AdminLayout />,
        loader: AuthLoader,
        children: [
            {
                path: "/admin/roletypes/list",
                element: <RoleTypeListPage />,
                errorElement: <ComponentErrorHandler />
            }
        ]
    }
];

export default routes;