import PersonIndexPage from "@/pages/persons/pages/PersonIndexPage.tsx";
import PersonDetailsPage from "@/pages/persons/pages/details/PersonDetailsPage.tsx";
import PersonImagePage from "@/pages/persons/pages/PersonImagePage.tsx";

import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";

/**
 * Routes configuration for the admin "Persons" section.
 *
 * @remarks
 * - Uses `BaseLayout` as the top-level layout for all person-related routes.
 * - Defines child routes for listing, creating, viewing, and editing persons.
 * - Each route includes an `errorElement` to catch and display errors using `ComponentErrorHandler`.
 *
 * @example
 * ```ts
 * import { createBrowserRouter } from "react-router-dom";
 * import personRoutes from "./personRoutes";
 *
 * const router = createBrowserRouter(personRoutes);
 * ```
 */
export default [
    {
        /** Base path for all person-related admin routes. */
        path: '/admin/persons',
        /** Top-level layout wrapper for person routes. */
        element: <AdminLayout />,
        /** Child routes nested under the base path. */
        children: [
            {
                /** Route for listing all persons. */
                path: "/admin/persons",
                element: <PersonIndexPage />,
                errorElement: <ComponentErrorHandler />
            },
            {
                /** Route for viewing details of a specific person by ID. */
                path: "/admin/persons/get/:_id",
                element: <PersonDetailsPage />,
                errorElement: <ComponentErrorHandler />
            },
            {
                /** Route for viewing a person's profile image. */
                path: "/admin/persons/get/:_id/images/profile",
                element: <PersonImagePage />,
                errorElement: <ComponentErrorHandler />
            },
            {
                /** Route for editing a person's profile image. */
                path: "/admin/persons/edit/:_id/profile-image",
                element: <PersonImagePage />,
                errorElement: <ComponentErrorHandler />
            },
        ],
    }
];
