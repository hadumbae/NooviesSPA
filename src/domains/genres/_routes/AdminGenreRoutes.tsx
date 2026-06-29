/**
 * @fileoverview Route configurations for the genre management administration area.
 */

import AuthLoader from "@/common/routing/loaders/AuthLoader.ts";
import {RouteObject} from "react-router-dom";
import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";
import {GenreDetailsPage, GenreIndexPage} from "@/views/admin/genres";

/** Route definitions for genre administration, including index and detail views. */
export const AdminGenreRoutes: RouteObject[] = [
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
