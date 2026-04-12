/**
 * @fileoverview Client-side route configuration for the Administrative Customer Management Dashboard.
 */

import {RouteObject} from "react-router-dom";
import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";
import {CustomerProfilePage} from "@/views/admin/customers/customer-profile-page/CustomerProfilePage.tsx";
import {CustomerReviewsPage} from "@/views/admin/customers/customer-reviews-page/CustomerReviewsPage.tsx";
import {CustomerReviewPage} from "@/views/admin/customers/customer-review-page";
import {CustomerReviewLogsPage} from "@/views/admin/customers/customer-review-logs-page/page.tsx";

const routes: RouteObject[] = [
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

export {
    routes as AdminCustomerRoutes
};