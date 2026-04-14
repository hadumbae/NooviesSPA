/**
 * @fileoverview Admin genre route configurations.
 * Defines the routing structure for genre management, protected by authentication.
 */

import AuthLoader from "@/common/routing/loaders/AuthLoader.ts";
import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";
import {GenreIndexPage} from "@/views/admin/genres/pages/index-page";
import {GenreDetailsPage} from "@/views/admin/genres/pages/genre-details";

/**
 * Route definitions for the Genre administration module.
 * * These routes are nested under a layout and protected by an AuthLoader
 * to ensure only authorized administrators can access them.
 */
export default [
    {
        path: "/admin/genres",
        element: <AdminLayout/>,
        loader: AuthLoader,
        children: [
            {
                path: "/admin/genres",
                element: <GenreIndexPage/>,
            },
            {
                path: "/admin/genres/get/:slug",
                element: <GenreDetailsPage/>,
            },
        ],
    },
];