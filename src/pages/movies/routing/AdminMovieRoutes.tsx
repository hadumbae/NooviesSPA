import BaseLayout from "@/common/layout/BaseLayout.tsx";
import MoviesPage from "@/pages/movies/pages/admin/MoviesPage.tsx";
import MovieCreatePage from "@/pages/movies/pages/admin/MovieCreatePage.tsx";
import MovieEditPage from "@/pages/movies/pages/admin/MovieEditPage.tsx";
import MoviePage from "@/pages/movies/pages/admin/MoviePage.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
import {RouteObject} from "react-router-dom";
import MoviePeoplePage from "@/pages/movies/pages/admin/credits/MoviePeoplePage.tsx";
import MoviePersonEditPage from "@/pages/movies/pages/admin/credits/MoviePersonEditPage.tsx";

const routes: RouteObject[] = [
    {
        path: '/admin/movies',
        element: <BaseLayout />,
        children: [
            // CRUD Routes

            {
                path: "/admin/movies",
                element: <MoviesPage />,
                errorElement: <ComponentErrorHandler />,
            },
            {
                path: "/admin/movies/create",
                element: <MovieCreatePage />,
                errorElement: <ComponentErrorHandler />,
            },
            {
                path: "/admin/movies/get/:movieID",
                element: <MoviePage />,
                errorElement: <ComponentErrorHandler />,
            },
            {
                path: "/admin/movies/edit/:movieID",
                element: <MovieEditPage />,
                errorElement: <ComponentErrorHandler />,
            },

            // People
            {
                path: "/admin/movies/get/:movieID/people/cast",
                element: <MoviePeoplePage roleType="CAST" />,
                errorElement: <ComponentErrorHandler />,
            },
            {
                path: "/admin/movies/get/:movieID/people/crew",
                element: <MoviePeoplePage roleType="CREW" />,
                errorElement: <ComponentErrorHandler />,
            },
            {
                path: "/admin/movies/get/:movieID/people/edit/:creditID",
                element: <MoviePersonEditPage />,
                errorElement: <ComponentErrorHandler />,
            }
        ],
    }
];

export default routes;