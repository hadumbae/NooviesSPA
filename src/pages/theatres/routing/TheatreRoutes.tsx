/**
 * @file admin-theatre-routes.ts
 * @description
 * Route configuration for all admin-facing theatre and screen pages.
 *
 * This module defines nested React Router route objects used by the
 * `/admin/theatres` section, including:
 *
 * - Theatre index (list)
 * - Theatre details
 * - Screen details
 *
 * Each route is wrapped with:
 * - `BaseLayout` as the parent layout
 * - `ComponentErrorHandler` as the per-route error boundary
 *
 * Pages rendered by this route tree:
 * - `TheatreIndexPage`
 * - `TheatreDetailsPage`
 * - `ScreenDetailsPage`
 *
 * These routes are consumed by `createBrowserRouter` / `RouterProvider`.
 */

import BaseLayout from "@/common/layout/base-layout/BaseLayout.tsx";
import TheatreDetailsPage from "@/pages/theatres/pages/theatre-details-page/TheatreDetailsPage.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
import ScreenDetailsPage from "@/pages/screens/pages/admin/screen-details-page/ScreenDetailsPage.tsx";
import TheatreIndexPage from "@/pages/theatres/pages/theatre-index-page/TheatreIndexPage.tsx";

export default [
    /**
     * Root admin theatre routes.
     *
     * @route /admin/theatres
     * @description
     * Uses `BaseLayout` to wrap all child routes.
     * Child routes handle listing theatres, viewing theatre details,
     * and viewing screen details.
     */
    {
        path: "/admin/theatres",
        element: <BaseLayout />,
        children: [
            /**
             * Theatre index (list view).
             *
             * @route /admin/theatres
             * @description
             * Displays a paginated list of all theatres.
             * Errors are captured by `ComponentErrorHandler`.
             */
            {
                path: "/admin/theatres",
                element: <TheatreIndexPage />,
                errorElement: <ComponentErrorHandler />,
            },

            /**
             * Theatre details page.
             *
             * @route /admin/theatres/get/:theatreID
             * @description
             * Displays details for a single theatre, including its screens
             * and movie showing information.
             *
             * `:theatreID` is validated within the page’s loader/hooks.
             */
            {
                path: "/admin/theatres/get/:theatreID",
                element: <TheatreDetailsPage />,
                errorElement: <ComponentErrorHandler />,
            },

            /**
             * Screen details page.
             *
             * @route /admin/theatres/get/:theatreID/screen/:screenID
             * @description
             * Displays complete details for a specific screen inside a theatre.
             * Includes seat viewing, seat creation, and showings.
             *
             * Both `:theatreID` and `:screenID` are validated by the page.
             */
            {
                path: "/admin/theatres/get/:theatreID/screen/:screenID",
                element: <ScreenDetailsPage />,
                errorElement: <ComponentErrorHandler />,
            },
        ],
    },
];
