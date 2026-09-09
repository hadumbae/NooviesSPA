/**
 * @fileoverview Defines the admin routing configuration for showing management.
 */

import {RouteObject} from "react-router-dom";
import {ComponentErrorHandler} from "@/views/common/_feat/error/ComponentErrorHandler.tsx";
import AdminLayout from "@/views/common/_layout/admin-layout/AdminLayout.tsx";

/** Route definitions for showing administration pages. */
export const ShowingRoutes: RouteObject[] = [
    {
        path: "/admin/showings",
        element: <AdminLayout/>,
        children: [
            {
                path: "/admin/showings",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {ShowingIndexPage} = await import("@/views/admin/showings/_pages");
                    return {Component: ShowingIndexPage};
                },
            },
            {
                path: "/admin/showings/create",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {ShowingCreatePage} = await import("@/views/admin/showings/_pages");
                    return {Component: ShowingCreatePage};
                },
            },
            {
                path: "/admin/showings/get/:slug",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {ShowingDetailsPage} = await import("@/views/admin/showings/_pages");
                    return {Component: ShowingDetailsPage};
                },
            },
            {
                path: "/admin/showings/edit/:slug",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {ShowingEditPage} = await import("@/views/admin/showings/_pages");
                    return {Component: ShowingEditPage};
                },
            },
        ],
    },
];
