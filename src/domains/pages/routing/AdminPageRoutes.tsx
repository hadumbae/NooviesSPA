/**
 * @fileoverview Route definitions for administrative pages wrapped in the admin layout container.
 */

import AdminLayout from "@/views/common/_layout/admin-layout/AdminLayout.tsx";

/** Route configurations for the administration application views. */
export const AdminPageRoutes = [
    {
        path: "/admin",
        element: <AdminLayout/>,
        children: [
            {
                path: "/admin/dashboard",
                lazy: async () => {
                    const {AdminDashboardPage} = await import("@/views/admin/dashboard");
                    return {Component: AdminDashboardPage};
                },
            },
        ],
    }
];