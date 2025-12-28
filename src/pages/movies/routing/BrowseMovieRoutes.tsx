/**
 * @file browseMovies.routes.tsx
 * @description
 * Client-side route configuration for movie browsing and movie detail pages.
 *
 * This module defines all `/browse/movies` routes, including:
 * - Movie listing
 * - Movie detail overview
 * - Credits, showings, and reviews sub-pages
 *
 * All routes are wrapped by {@link BaseLayout} and use
 * {@link ComponentErrorHandler} for localized error handling.
 */

import BaseLayout from "@/common/layout/base-layout/BaseLayout.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
import BrowseMoviesPage from "@/pages/movies/pages/client/browse-movies/BrowseMoviesPage.tsx";
import MovieInfoPage from "@/pages/movies/pages/client/movie-info/movie-info/MovieInfoPage.tsx";
import MovieInfoCreditsPage
    from "@/pages/movies/pages/client/movie-info/movie-info-credits/MovieInfoCreditsPage.tsx";
import MovieInfoShowingsPage
    from "@/pages/movies/pages/client/movie-info/movie-info-showings/MovieInfoShowingsPage.tsx";
import MovieInfoReviewsPage
    from "@/pages/movies/pages/client/movie-info/movie-info-reviews/MovieInfoReviewsPage.tsx";

/**
 * Route definitions for movie browsing and movie information pages.
 *
 * @remarks
 * Routes are nested under `/browse` and rendered within {@link BaseLayout}.
 * Each route defines its own {@link ComponentErrorHandler} to ensure
 * isolated error boundaries per page.
 */
export default [
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
