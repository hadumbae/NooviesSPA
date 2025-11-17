import BaseLayout from "@/common/layout/base-layout/BaseLayout.tsx";
import GenreIndexPage from "@/pages/genres/pages/genre-index-page/GenreIndexPage.tsx";
import GenreDetailsPage from "@/pages/genres/pages/GenreDetailsPage.tsx";
import AuthLoader from "@/common/routing/loaders/AuthLoader.ts";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";

export default [
    {
        path: '/admin/genres',
        element: <BaseLayout/>,
        loader: AuthLoader,
        children: [
            {
                path: "/admin/genres",
                element: <GenreIndexPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/admin/genres/get/:genreID",
                element: <GenreDetailsPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
        ],
    }
];