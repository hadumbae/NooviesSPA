/**
 * @fileoverview React Router configuration for the Theatre administration module.
 */

import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";
import {TheatreIndexPage} from "@/views/admin/theatres/index-page";
import {TheatreDetailsPage} from "@/views/admin/theatres/theatre-details-page";
import {TheatreShowingCreatePage} from "@/views/admin/theatres/theatre-showings-create";
import {TheatreShowingListPage} from "@/views/admin/theatres/theatre-showings-list";
import {TheatreScreenDetailsPage} from "@/views/admin/theatres/theatre-screen-details-page";

/**
 * Defines the routing hierarchy for theatre management.
 */
const routes = [
    {
        path: "/admin/theatres",
        element: <AdminLayout/>,
        children: [
            {
                index: true,
                element: <TheatreIndexPage/>,
            },
            {
                path: "get/:slug",
                element: <TheatreDetailsPage/>,
            },
            {
                path: "get/:slug/showings/create",
                element: <TheatreShowingCreatePage/>,
            },
            {
                path: "get/:slug/showings/list",
                element: <TheatreShowingListPage/>,
            },
            {
                path: "get/:theatreSlug/screen/:screenSlug",
                element: <TheatreScreenDetailsPage/>,
            },
        ],
    },
];

export {
    routes as TheatreAdminRoutes,
}