/**
 * @file admin-theatre-routes.ts
 *
 * @summary
 * Admin route configuration for theatre, screen, and showing management.
 *
 * @remarks
 * Defines the React Router route tree under `/admin/theatres`.
 * All routes are wrapped by {@link BaseLayout} and use
 * {@link ComponentErrorHandler} as the per-route error boundary.
 */

import TheatreDetailsPage from "@/pages/theatres/pages/theatre-details-page/TheatreDetailsPage.tsx";
import ScreenDetailsPage from "@/pages/screens/pages/admin/screen-details-page/ScreenDetailsPage.tsx";
import TheatreIndexPage from "@/pages/theatres/pages/theatre-index-page/TheatreIndexPage.tsx";
import TheatreShowingCreatePage from "@/pages/theatres/pages/theatre-showings/TheatreShowingCreatePage.tsx";
import TheatreShowingListPage from "@/pages/theatres/pages/theatre-showings/TheatreShowingListPage.tsx";
import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";

export default [
    /**
     * Root admin theatre route.
     *
     * @route /admin/theatres
     */
    {
        path: "/admin/theatres",
        element: <AdminLayout/>,
        children: [
            /**
             * Theatre index page.
             *
             * @route /admin/theatres
             */
            {
                path: "/admin/theatres",
                element: <TheatreIndexPage/>,
            },

            /**
             * Theatre details page.
             *
             * @route /admin/theatres/get/:slug
             */
            {
                path: "/admin/theatres/get/:slug",
                element: <TheatreDetailsPage/>,
            },

            /**
             * Theatre showing creation page.
             *
             * @route /admin/theatres/get/:slug/showings/create
             */
            {
                path: "/admin/theatres/get/:slug/showings/create",
                element: <TheatreShowingCreatePage/>,
            },

            /**
             * Theatre showing list page.
             *
             * @route /admin/theatres/get/:slug/showings/list
             */
            {
                path: "/admin/theatres/get/:slug/showings/list",
                element: <TheatreShowingListPage/>,
            },

            /**
             * Screen details page.
             *
             * @route /admin/theatres/get/:theatreSlug/screen/:screenSlug
             */
            {
                path: "/admin/theatres/get/:theatreSlug/screen/:screenSlug",
                element: <ScreenDetailsPage/>,
            },
        ],
    },
];