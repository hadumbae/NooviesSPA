/**
 * @fileoverview Route configuration for the administrative Persons domain.
 */

import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";
import {PersonIndexPage} from "@/views/admin/persons/pages/index-page/page.tsx";
import {PersonDetailsPage} from "@/views/admin/persons/pages/details-page";

/**
 * Admin "Persons" route definitions.
 */
export default [
    {
        path: '/admin/persons',
        element: <AdminLayout />,
        children: [
            {
                /** List view for person management. */
                path: "/admin/persons",
                element: <PersonIndexPage />,
                errorElement: <ComponentErrorHandler />
            },
            {
                /** Detailed profile view utilizing URL slug parameters. */
                path: "/admin/persons/get/:slug",
                element: <PersonDetailsPage />,
                errorElement: <ComponentErrorHandler />
            }
        ],
    }
];