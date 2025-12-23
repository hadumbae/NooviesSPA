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
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
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
        element: <AdminLayout />,
        children: [
            /**
             * Theatre index page.
             *
             * @route /admin/theatres
             */
            {
                path: "/admin/theatres",
                element: <TheatreIndexPage />,
                errorElement: <ComponentErrorHandler />,
            },

            /**
             * Theatre details page.
             *
             * @route /admin/theatres/get/:_id
             */
            {
                path: "/admin/theatres/get/:_id",
                element: <TheatreDetailsPage />,
                errorElement: <ComponentErrorHandler />,
            },

            /**
             * Theatre showing creation page.
             *
             * @route /admin/theatres/get/:_id/showings/create
             */
            {
                path: "/admin/theatres/get/:_id/showings/create",
                element: <TheatreShowingCreatePage />,
                errorElement: <ComponentErrorHandler />,
            },

            /**
             * Theatre showing list page.
             *
             * @route /admin/theatres/get/:_id/showings/list
             */
            {
                path: "/admin/theatres/get/:_id/showings/list",
                element: <TheatreShowingListPage />,
                errorElement: <ComponentErrorHandler />,
            },

            /**
             * Screen details page.
             *
             * @route /admin/theatres/get/:theatreID/screen/:screenID
             */
            {
                path: "/admin/theatres/get/:theatreID/screen/:screenID",
                element: <ScreenDetailsPage />,
                errorElement: <ComponentErrorHandler />,
            },
        ],
    },
];
