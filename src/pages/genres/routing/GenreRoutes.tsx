import BaseLayout from "@/common/layout/BaseLayout.tsx";
import GenresPage from "@/pages/genres/pages/GenresPage.tsx";
import GenreCreatePage from "@/pages/genres/pages/GenreCreatePage.tsx";
import GenreEditPage from "@/pages/genres/pages/GenreEditPage.tsx";
import GenrePage from "@/pages/genres/pages/GenrePage.tsx";
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
                element: <GenrePage />,
                errorElement: <ComponentErrorHandler />,
            },
            {
                path: "/admin/genres/edit/:genreID",
                element: <GenreEditPage />,
                errorElement: <ComponentErrorHandler />,
            },
        ],
    }
];