import BaseLayout from "@/common/layout/base-layout/BaseLayout.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
import BrowseMoviesPage from "@/pages/movies/pages/client/browse-movies/BrowseMoviesPage.tsx";
import MovieInfoPage from "@/pages/movies/pages/client/movie-info/MovieInfoPage.tsx";

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
                path: "/browse/movies/:movieID",
                element: <MovieInfoPage />,
                errorElement: <ComponentErrorHandler/>,
            }
        ]
    }
];