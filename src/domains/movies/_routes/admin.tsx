/**
 * @fileoverview Defines the routing configuration for movie management within the admin dashboard.
 */

import {RouteObject} from "react-router-dom";
import {ComponentErrorHandler} from "@/views/common/_feat/error/ComponentErrorHandler.tsx";
import AdminLayout from "@/views/common/_layout/admin-layout/AdminLayout.tsx";

/** Route configuration for movie-related administrative pages. */
export const AdminMovieRoutes: RouteObject[] = [
    {
        path: '/admin/movies',
        element: <AdminLayout/>,
        children: [
            {
                path: "/admin/movies",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {MovieIndexPage} = await import("@/views/admin/movies");
                    const {MovieIndexQueryOptionsContextProvider} = await import("@/domains/movies/_feat/handle-query-options/movie-index");
                    return {
                        Component: () => (
                            <MovieIndexQueryOptionsContextProvider>
                                <MovieIndexPage/>
                            </MovieIndexQueryOptionsContextProvider>
                        ),
                    };
                },
            },
            {
                path: "/admin/movies/create",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {MovieCreatePage} = await import("@/views/admin/movies");
                    return {Component: MovieCreatePage};
                },
            },
            {
                path: "/admin/movies/get/:slug",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {MovieDetailsPage} = await import("@/views/admin/movies");
                    return {Component: MovieDetailsPage};
                },
            },
            {
                path: "/admin/movies/edit/:slug",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {MovieEditPage} = await import("@/views/admin/movies");
                    return {Component: MovieEditPage};
                },
            },
            {
                path: "/admin/movies/get/:slug/people/cast",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {MoviePeoplePage} = await import("@/views/admin/movies");
                    return {Component: () => <MoviePeoplePage department="CAST"/>};
                },
            },
            {
                path: "/admin/movies/get/:slug/people/crew",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {MoviePeoplePage} = await import("@/views/admin/movies");
                    return {Component: () => <MoviePeoplePage department="CREW"/>};
                },
            }
        ],
    }
];
