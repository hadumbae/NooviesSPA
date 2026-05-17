/**
 * @fileoverview Defines the routing configuration for browsing movies and viewing movie details.
 */

import BaseLayout from "@/common/layout/base-layout/BaseLayout.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
import MovieInfoShowingsPage
    from "@/views/client/movies/pages/movie-info-showings/MovieInfoShowingsPage.tsx";
import MovieInfoReviewsPage
    from "@/views/client/movies/pages/movie-info-reviews/MovieInfoReviewsPage.tsx";
import {BrowseMoviesPage} from "@/views/client/movies/pages/browse-movies";
import {MovieInfoPage} from "@/views/client/movies/pages/movie-info";
import {MovieInfoCreditsPage} from "@/views/client/movies/pages/movie-info-credits";

/** Route definitions for the movie browsing domain. */
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
