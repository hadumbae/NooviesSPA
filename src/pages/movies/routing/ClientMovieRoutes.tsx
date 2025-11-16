import BaseLayout from "@/common/layout/base-layout/BaseLayout.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
import MoviesByGenreClientPage from "@/pages/movies/pages/client/movies/MoviesByGenreClientPage.tsx";
import MovieDetailsClientPage from "@/pages/movies/pages/client/movie/MovieDetailsClientPage.tsx";

export default [
    {
        path: "/browse",
        element: <BaseLayout/>,
        children: [
            {
                path: "/browse/movies",
                element: <MoviesByGenreClientPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/browse/movies/:movieID",
                element: <MovieDetailsClientPage />,
                errorElement: <ComponentErrorHandler/>,
            }
        ]
    }
];