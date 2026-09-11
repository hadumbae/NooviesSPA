/**
 * @fileoverview Route configurations for the genre management administration area.
 */

import {AuthLoader} from "@/common/_loaders";
import {RouteObject} from "react-router-dom";
import AdminLayout from "@/views/common/_layout/admin-layout/AdminLayout.tsx";

/** Route definitions for genre administration, including index and detail views. */
export const AdminGenreRoutes: RouteObject[] = [
    {
        path: "/admin/genres",
        element: <AdminLayout/>,
        loader: AuthLoader,
        children: [
            {
                path: "/admin/genres",
                lazy: async () => {
                    const {GenreIndexPage} = await import("@/views/admin/genres");
                    const {GenreIndexQueryOptionsContextProvider} = await import("@/domains/genres/_feat/handle-query-options/genre-index/GenreIndexQueryOptionsContext.ts");
                    return {
                        Component: () => (
                            <GenreIndexQueryOptionsContextProvider>
                                <GenreIndexPage/>
                            </GenreIndexQueryOptionsContextProvider>
                        ),
                    };
                },
            },
            {
                path: "/admin/genres/get/:slug",
                lazy: async () => {
                    const {GenreDetailsPage} = await import("@/views/admin/genres");
                    return {Component: GenreDetailsPage};
                },
            },
        ],
    },
];
