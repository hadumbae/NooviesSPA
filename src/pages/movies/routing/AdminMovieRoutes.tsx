import BaseLayout from "@/common/layout/BaseLayout.tsx";
import MovieIndexPage from "@/pages/movies/pages/admin/MovieIndexPage.tsx";
import MovieCreatePage from "@/pages/movies/pages/admin/MovieCreatePage.tsx";
import MovieDetailsPage from "@/pages/movies/pages/admin/movie-details-page/MovieDetailsPage.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
import {RouteObject} from "react-router-dom";
import MoviePeoplePage from "@/pages/movies/pages/admin/credits/MoviePeoplePage.tsx";

const routes: RouteObject[] = [
    {
        path: '/admin/movies',
        element: <BaseLayout />,
        children: [
            // CRUD Routes

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
                path: "/admin/movies/get/:movieID",
                element: <MovieDetailsPage />,
                errorElement: <ComponentErrorHandler />,
            },

            // People
            {
                path: "/admin/movies/get/:movieID/people/cast",
                element: <MoviePeoplePage department="CAST" />,
                errorElement: <ComponentErrorHandler />,
            },
            {
                path: "/admin/movies/get/:movieID/people/crew",
                element: <MoviePeoplePage department="CREW" />,
                errorElement: <ComponentErrorHandler />,
            }
        ],
    }
];

export default routes;