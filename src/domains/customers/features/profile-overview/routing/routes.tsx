/**
 * @file Administrative route configuration for the Customer Management Dashboard.
 * @filename AdminCustomerRoutes.ts
 */

import {RouteObject} from "react-router-dom";
import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
import {CustomerProfilePage} from "@/views/admin/customers/customer-profile-page";

/**
 * Routes for administrative oversight of customer accounts and activity.
 * ---
 */
const routes: RouteObject[] = [
    {
        path: "/admin/customers",
        element: <AdminLayout/>,
        errorElement: <ComponentErrorHandler/>,
        children: [
            {
                /** Admin Customer Profile 360 View. */
                path: '/admin/customers/:uniqueCode/profile',
                element: <CustomerProfilePage/>
            }
        ]
    }
];

export {
    routes as AdminCustomerRoutes
}