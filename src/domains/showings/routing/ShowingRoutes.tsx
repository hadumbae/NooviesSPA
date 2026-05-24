/**
 * @fileoverview Defines the admin routing configuration for showing management.
 */

import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
import {RouteObject} from "react-router-dom";
import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";
import {ShowingIndexPage} from "@/views/admin/showings/index-page";
import {ShowingCreatePage} from "@/views/admin/showings/create-page/page.tsx";
import {ShowingEditPage} from "@/views/admin/showings/edit-page";
import {ShowingDetailsPage} from "@/views/admin/showings/details-page";

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

