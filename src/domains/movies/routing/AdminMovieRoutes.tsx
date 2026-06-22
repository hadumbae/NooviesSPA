/**
 * @fileoverview Defines the routing configuration for movie management within the admin dashboard.
 */

import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
import {RouteObject} from "react-router-dom";
import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";
import {MovieCreatePage} from "@/views/admin/movies/create-page";
import {MoviePeoplePage} from "@/views/admin/movies/people-page";
import {MovieIndexPage} from "@/views/admin/movies/index-page";
import {MovieEditPage} from "@/views/admin/movies/edit-page";
import {MovieDetailsPage} from "@/views/admin/movies/details-page";

/** Route configuration for movie-related administrative pages. */
export const AdminMovieRoutes: RouteObject[] = [
    {
        path: '/admin/movies',
        element: <AdminLayout />,
        children: [
            {
                path: "/admin/movies",
                element: <MovieIndexPage />,
                errorElement: <ComponentErrorHandler />,
            },
            {
                path: "/admin/movies/create",
                element: <MovieCreatePage />,
                errorElement: <ComponentErrorHandler />,
            },
            {
                path: "/admin/movies/get/:slug",
                element: <MovieDetailsPage />,
                errorElement: <ComponentErrorHandler />,
            },
            {
                path: "/admin/movies/edit/:slug",
                element: <MovieEditPage />,
                errorElement: <ComponentErrorHandler />,
            },
            {
                path: "/admin/movies/get/:slug/people/cast",
                element: <MoviePeoplePage department="CAST" />,
                errorElement: <ComponentErrorHandler />,
            },
            {
                path: "/admin/movies/get/:slug/people/crew",
                element: <MoviePeoplePage department="CREW" />,
                errorElement: <ComponentErrorHandler />,
            }
        ],
    }
];
