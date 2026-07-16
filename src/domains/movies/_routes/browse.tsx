/**
 * @fileoverview Defines the routing configuration for browsing movies and viewing movie details.
 */

import {RouteObject} from "react-router-dom";
import {BaseLayout} from "@/common/layout/base-layout/BaseLayout.tsx";
import {ComponentErrorHandler} from "@/common/components/errors/ComponentErrorHandler.tsx";
import {
    BrowseMoviesPage,
    MovieInfoCreditsPage,
    MovieInfoPage,
    MovieInfoReviewsPage,
    MovieInfoShowingsPage
} from "@/views/client/movies";

/** Route definitions for the movie browsing domain. */
export const BrowseMovieRoutes: RouteObject[] = [
    {
        path: "/browse",
        element: <BaseLayout/>,
        children: [
            {
                path: "/browse/movies",
                element: <BrowseMoviesPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/browse/movies/:slug",
                element: <MovieInfoPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/browse/movies/:slug/credits",
                element: <MovieInfoCreditsPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/browse/movies/:slug/showings",
                element: <MovieInfoShowingsPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/browse/movies/:slug/reviews",
                element: <MovieInfoReviewsPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
        ],
    },
];

