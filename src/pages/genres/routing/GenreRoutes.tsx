/**
 * Admin genre routes.
 *
 * Defines all admin-facing routes related to genre management,
 * including index and detail views. Routes are protected by
 * authentication and rendered within the admin layout.
 */
import GenreIndexPage from "@/pages/genres/pages/genre-index-page/GenreIndexPage.tsx";
import GenreDetailsPage from "@/pages/genres/pages/GenreDetailsPage.tsx";
import AuthLoader from "@/common/routing/loaders/AuthLoader.ts";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";

export default [
    {
        /**
         * Base admin genre route.
         *
         * Applies authentication and admin layout for all
         * nested genre-related routes.
         */
        path: "/admin/genres",
        element: <AdminLayout/>,
        loader: AuthLoader,
        children: [
            {
                /**
                 * Genre index page.
                 *
                 * Displays a list of all genres with management actions.
                 */
                path: "/admin/genres",
                element: <GenreIndexPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                /**
                 * Genre details page.
                 *
                 * Displays a single genre resolved by slug, including
                 * related movies and admin controls.
                 */
                path: "/admin/genres/get/:slug",
                element: <GenreDetailsPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
        ],
    },
];
