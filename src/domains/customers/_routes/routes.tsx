/**
 * @fileoverview Client-side route configuration for the Administrative Customer Management Dashboard.
 */

import {RouteObject} from "react-router-dom";
import AdminLayout from "@/views/common/_layout/admin-layout/AdminLayout.tsx";
import {CustomerReviewPage} from "@/views/admin/customers/_pages/customer-review-page";
import {CustomerProfilePage} from "@/views/admin/customers/_pages/customer-profile-page";
import {CustomerReviewsPage} from "@/views/admin/customers/_pages/customer-reviews-page";
import {CustomerReviewLogsPage} from "@/views/admin/customers/_pages/customer-review-logs-page";

export const AdminCustomerRoutes: RouteObject[] = [
    {
        path: "/admin/customers",
        element: <AdminLayout/>,
        children: [
            {
                path: ':uniqueCode/profile',
                element: <CustomerProfilePage/>
            },
            {
                path: ':uniqueCode/reviews',
                element: <CustomerReviewsPage/>
            },
            {
                path: ':uniqueCode/reviews/:reviewCode',
                element: <CustomerReviewPage/>
            },
            {
                path: ':uniqueCode/reviews/:reviewCode/logs',
                element: <CustomerReviewLogsPage/>
            },
        ]
    }
];