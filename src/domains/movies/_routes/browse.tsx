/**
 * @fileoverview Defines the routing configuration for browsing movies and viewing movie details.
 */

import {RouteObject} from "react-router-dom";
import {BaseLayout} from "@/views/common/_layout/base-layout/BaseLayout.tsx";
import {ComponentErrorHandler} from "@/views/common/_feat/error/ComponentErrorHandler.tsx";

/** Route definitions for the movie browsing domain. */
export const BrowseMovieRoutes: RouteObject[] = [
    {
        path: "/browse",
        element: <BaseLayout/>,
        children: [
            {
                path: "/browse/movies",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {BrowseMoviesPage} = await import("@/views/client/movies");
                    return {Component: BrowseMoviesPage};
                },
            },
            {
                path: "/browse/movies/:slug",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {MovieInfoPage} = await import("@/views/client/movies");
                    return {Component: MovieInfoPage};
                },
            },
            {
                path: "/browse/movies/:slug/credits",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {MovieInfoCreditsPage} = await import("@/views/client/movies");
                    return {Component: MovieInfoCreditsPage};
                },
            },
            {
                path: "/browse/movies/:slug/showings",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {MovieInfoShowingsPage} = await import("@/views/client/movies");
                    return {Component: MovieInfoShowingsPage};
                },
            },
            {
                path: "/browse/movies/:slug/reviews",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {MovieInfoReviewsPage} = await import("@/views/client/movies");
                    return {Component: MovieInfoReviewsPage};
                },
            },
        ],
    },
];
