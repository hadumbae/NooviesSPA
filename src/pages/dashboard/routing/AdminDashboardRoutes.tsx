import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";
import AdminDashboard from "@/pages/dashboard/pages/AdminDashboard.tsx";

/**
 * Admin dashboard routes.
 *
 * @remarks
 * - Uses {@link AdminLayout} as the route layout wrapper
 * - Registers the admin dashboard page under `/admin/dashboard`
 */
export default [
    {
        path: "/",
        element: <AdminLayout />,
        children: [
            {path: "/admin/dashboard", element: <AdminDashboard />},
        ],
    }
];
