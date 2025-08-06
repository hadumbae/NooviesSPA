import BaseLayout from "@/common/layout/BaseLayout.tsx";
import GenresPage from "@/pages/genres/pages/GenresPage.tsx";
import GenreCreatePage from "@/pages/genres/pages/GenreCreatePage.tsx";
import GenreDetailsPage from "@/pages/genres/pages/GenreDetailsPage.tsx";
import AuthLoader from "@/common/routing/loaders/AuthLoader.ts";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";

export default [
    {
        path: '/admin/genres',
        element: <BaseLayout />,
        loader: AuthLoader,
        children: [
            {
                path: "/admin/genres",
                element: <GenresPage />,
                errorElement: <ComponentErrorHandler />,
            },
            {
                path: "/admin/genres/create",
                element: <GenreCreatePage />,
                errorElement: <ComponentErrorHandler />,
            },
            {
                path: "/admin/genres/get/:genreID",
                element: <GenreDetailsPage />,
                errorElement: <ComponentErrorHandler />,
            },
        ],
    }
];