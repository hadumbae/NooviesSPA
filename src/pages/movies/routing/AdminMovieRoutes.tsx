import BaseLayout from "@/common/layout/BaseLayout.tsx";
import MoviesPage from "@/pages/movies/pages/admin/MoviesPage.tsx";
import MovieCreatePage from "@/pages/movies/pages/admin/MovieCreatePage.tsx";
import MovieEditPage from "@/pages/movies/pages/admin/MovieEditPage.tsx";
import MoviePage from "@/pages/movies/pages/admin/MoviePage.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";

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