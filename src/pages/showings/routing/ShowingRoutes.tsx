/**
 * @file showings.routes.tsx
 *
 * @summary
 * Admin routing configuration for Showing management.
 *
 * @description
 * Defines all admin-facing routes related to showings, including:
 * - Listing all showings
 * - Creating a new showing
 * - Viewing showing details
 * - Editing an existing showing
 *
 * All routes are nested under {@link BaseLayout} and use a shared
 * {@link ComponentErrorHandler} for route-level error handling.
 */

import BaseLayout from "@/common/layout/base-layout/BaseLayout.tsx";
import ShowingIndexPage from "@/pages/showings/pages/index-page/ShowingIndexPage.tsx";
import ShowingCreatePage from "@/pages/showings/pages/ShowingCreatePage.tsx";
import ShowingEditPage from "@/pages/showings/pages/ShowingEditPage.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
import {RouteObject} from "react-router-dom";
import ShowingDetailsPage from "@/pages/showings/pages/details-page/page/ShowingDetailsPage.tsx";

/**
 * Route definitions for admin showings.
 *
 * @remarks
 * - All routes are prefixed with `/admin/showings`
 * - Child routes inherit layout and navigation from {@link BaseLayout}
 * - Each route defines its own `errorElement` boundary
 */
const routes: RouteObject[] = [
    {
        path: "/admin/showings",
        element: <BaseLayout/>,
        children: [
            {
                path: "/admin/showings",
                element: <ShowingIndexPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/admin/showings/create",
                element: <ShowingCreatePage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/admin/showings/get/:_id",
                element: <ShowingDetailsPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/admin/showings/edit/:_id",
                element: <ShowingEditPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
        ],
    },
];

export default routes;
