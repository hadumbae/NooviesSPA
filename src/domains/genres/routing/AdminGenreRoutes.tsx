/**
 * Admin genre routes.
 *
 * Defines all admin-facing routes related to genre management,
 * including index and detail views. Routes are protected by
 * authentication and rendered within the admin layout.
 */
import GenreDetailsPage from "@/views/admin/genres/pages/genre-details/GenreDetailsPage.tsx";
import AuthLoader from "@/common/routing/loaders/AuthLoader.ts";
import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";
import {GenreIndexPage} from "@/views/admin/genres/pages/index-page";

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
            },
        ],
    },
];
