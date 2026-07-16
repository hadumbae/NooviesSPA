/**
 * @fileoverview Defines the admin routing configuration for showing management.
 */

import {RouteObject} from "react-router-dom";
import {ComponentErrorHandler} from "@/common/components/errors/ComponentErrorHandler.tsx";
import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";
import {ShowingCreatePage, ShowingDetailsPage, ShowingEditPage, ShowingIndexPage} from "@/views/admin/showings/_pages";

/** Route definitions for showing administration pages. */
export const ShowingRoutes: RouteObject[] = [
    {
        path: "/admin/showings",
        element: <AdminLayout/>,
        children: [
            {
                path: "/admin/showings",
                element: <ShowingIndexPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/admin/showings/create",
                element: <ShowingCreatePage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/admin/showings/get/:slug",
                element: <ShowingDetailsPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/admin/showings/edit/:slug",
                element: <ShowingEditPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
        ],
    },
];

