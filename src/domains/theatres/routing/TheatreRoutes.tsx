/**
 * @fileoverview React Router configuration for the Theatre administration module.
 */

import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";
import { TheatreIndexPage } from "@/views/admin/theatres/index-page";
import { TheatreDetailsPage } from "@/views/admin/theatres/theatre-details-page";
import { TheatreShowingCreatePage } from "@/views/admin/theatres/theatre-showings-create";
import { TheatreShowingListPage } from "@/views/admin/theatres/theatre-showings-list";
import { ScreenDetailsPage } from "@/views/admin/theatres/screen-details-page";

/**
 * Defines the routing hierarchy for theatre management.
 * All paths are nested under the AdminLayout for consistent navigation and styling.
 */
export default [
    {
        path: "/admin/theatres",
        element: <AdminLayout />,
        children: [
            /** Main theatre dashboard/listing. */
            {
                path: "/admin/theatres",
                element: <TheatreIndexPage />,
            },

            /** Detailed view for a specific theatre. */
            {
                path: "/admin/theatres/get/:slug",
                element: <TheatreDetailsPage />,
            },

            /** Interface for scheduling new movie showings at a theatre. */
            {
                path: "/admin/theatres/get/:slug/showings/create",
                element: <TheatreShowingCreatePage />,
            },

            /** Management list for existing showings at a theatre. */
            {
                path: "/admin/theatres/get/:slug/showings/list",
                element: <TheatreShowingListPage />,
            },

            /** Detailed management view for a specific screen within a theatre. */
            {
                path: "/admin/theatres/get/:theatreSlug/screen/:screenSlug",
                element: <ScreenDetailsPage />,
            },
        ],
    },
];