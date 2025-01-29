import BaseLayout from "@/common/layout/BaseLayout.tsx";
import MoviesPage from "@/pages/movies/pages/MoviesPage.tsx";
import MovieCreatePage from "@/pages/movies/pages/MovieCreatePage.tsx";
import MovieEditPage from "@/pages/movies/pages/MovieEditPage.tsx";
import MoviePage from "@/pages/movies/pages/MoviePage.tsx";
import ComponentErrorHandler from "@/common/handlers/component/ComponentErrorHandler.tsx";

export default [
    {
        path: '/admin/movies',
        element: <BaseLayout />,
        children: [
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
        ],
    }
];