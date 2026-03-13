import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";
import AdminDashboard from "@/domains/dashboard/pages/AdminDashboard.tsx";
import HomePage from "@/domains/client/pages/HomePage.tsx";

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
            {path: "/", element: <HomePage />},
            {path: "/admin/dashboard", element: <AdminDashboard />},
        ],
    }
];
