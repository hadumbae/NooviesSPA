/**
 * @file Client-side route configuration for the Administrative Customer Management Dashboard.
 * @filename AdminCustomerRoutes.ts
 */

import {RouteObject} from "react-router-dom";
import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";
import {CustomerProfilePage} from "@/views/admin/customers/pages/customer-profile-page/CustomerProfilePage.tsx";
import {CustomerReviewPage} from "@/views/admin/customers/pages/customer-review-page";

/**
 * Routes for administrative oversight of customer accounts and activity.
 * ---
 */
const routes: RouteObject[] = [
    {
        /** Parent administrative route group */
        path: "/admin/customers",
        element: <AdminLayout />,
        children: [
            {
                /** Admin Customer Profile 360 View. */
                path: ':uniqueCode/profile',
                element: <CustomerProfilePage />
            },
            {
                /** Detailed Review Moderation View. */
                path: ':uniqueCode/reviews/:reviewCode',
                element: <CustomerReviewPage />
            },
        ]
    }
];

export {
    routes as AdminCustomerRoutes
};