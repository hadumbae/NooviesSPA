import MovieIndexPage from "@/features/admin/movies/index-page/MovieIndexPage.tsx";
import MovieCreatePage from "@/features/admin/movies/create-page/MovieCreatePage.tsx";
import MovieDetailsPage from "@/features/admin/movies/details-page/MovieDetailsPage.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
import {RouteObject} from "react-router-dom";
import MoviePeoplePage from "@/features/admin/movies/credits-page/MoviePeoplePage.tsx";
import MovieEditPage from "@/features/admin/movies/edit-page/MovieEditPage.tsx";
import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";

const routes: RouteObject[] = [
    {
        path: '/admin/movies',
        element: <AdminLayout />,
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
                path: "/admin/movies/get/:slug",
                element: <MovieDetailsPage />,
                errorElement: <ComponentErrorHandler />,
            },
            {
                path: "/admin/movies/edit/:slug",
                element: <MovieEditPage />,
                errorElement: <ComponentErrorHandler />,
            },

            // People
            {
                path: "/admin/movies/get/:slug/people/cast",
                element: <MoviePeoplePage department="CAST" />,
                errorElement: <ComponentErrorHandler />,
            },
            {
                path: "/admin/movies/get/:slug/people/crew",
                element: <MoviePeoplePage department="CREW" />,
                errorElement: <ComponentErrorHandler />,
            }
        ],
    }
];

export default routes;