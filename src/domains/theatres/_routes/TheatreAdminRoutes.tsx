/**
 * @fileoverview React Router configuration for the Theatre administration module.
 */

import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";
import {
    TheatreDetailsPage,
    TheatreIndexPage,
    TheatreScreenDetailsPage,
    TheatreShowingCreatePage,
    TheatreShowingListPage,
} from "@/views/admin/theatres/_pages";

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