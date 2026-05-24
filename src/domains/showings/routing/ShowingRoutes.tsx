/**
 * @fileoverview Defines the admin routing configuration for showing management.
 */

import {ShowingIndexPage} from "@/views/admin/showings/index-page/page.tsx";
import ShowingCreatePage from "@/views/admin/showings/create-page/ShowingCreatePage.tsx";
import {ShowingEditPage} from "@/views/admin/showings/edit-page/page.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
import {RouteObject} from "react-router-dom";
import {ShowingDetailsPage} from "@/views/admin/showings/details-page/page.tsx";
import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";

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

