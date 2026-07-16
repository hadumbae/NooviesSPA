/**
 * @fileoverview Defines the routing configuration for movie management within the admin dashboard.
 */

import {RouteObject} from "react-router-dom";
import {ComponentErrorHandler} from "@/common/components/errors/ComponentErrorHandler.tsx";
import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";
import {MovieCreatePage, MovieDetailsPage, MovieEditPage, MovieIndexPage, MoviePeoplePage} from "@/views/admin/movies";

/** Route configuration for movie-related administrative pages. */
export const AdminMovieRoutes: RouteObject[] = [
    {
        path: '/admin/movies',
        element: <AdminLayout/>,
        children: [
            {
                path: "/admin/movies",
                element: <MovieIndexPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/admin/movies/create",
                element: <MovieCreatePage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/admin/movies/get/:slug",
                element: <MovieDetailsPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/admin/movies/edit/:slug",
                element: <MovieEditPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/admin/movies/get/:slug/people/cast",
                element: <MoviePeoplePage department="CAST"/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/admin/movies/get/:slug/people/crew",
                element: <MoviePeoplePage department="CREW"/>,
                errorElement: <ComponentErrorHandler/>,
            }
        ],
    }
];
