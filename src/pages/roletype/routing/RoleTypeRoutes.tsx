import {RouteObject} from "react-router-dom";
import BaseLayout from "@/common/layout/base-layout/BaseLayout.tsx";
import AuthLoader from "@/common/routing/loaders/AuthLoader.ts";
import RoleTypeListPage from "@/pages/roletype/pages/RoleTypeListPage.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";

const routes: RouteObject[] = [
    {
        path: "/admin/roletypes",
        element: <BaseLayout />,
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