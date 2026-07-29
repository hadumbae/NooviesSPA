/**
 * @fileoverview Client-side route configuration for the Administrative Customer Management Dashboard.
 */

import {RouteObject} from "react-router-dom";
import AdminLayout from "@/views/common/_layout/admin-layout/AdminLayout.tsx";
import {CustomerReviewPage} from "@/views/admin/customers/_pages/customer-review-page";
import {CustomerProfilePage} from "@/views/admin/customers/_pages/customer-profile-page";
import {CustomerReviewsPage} from "@/views/admin/customers/_pages/customer-reviews-page";
import {CustomerReviewLogsPage} from "@/views/admin/customers/_pages/customer-review-logs-page";
import {CustomerIndexPage} from "@/views/admin/customers/_pages/customer-index-page/page.tsx";
import {CustomerIndexQueryOptionsContextProvider} from "@/domains/customers";

export const AdminCustomerRoutes: RouteObject[] = [
    {
        path: "/admin/customers",
        element: <AdminLayout/>,
        children: [
            {
                path: '/admin/customers',
                element: (
                    <CustomerIndexQueryOptionsContextProvider>
                        <CustomerIndexPage/>
                    </CustomerIndexQueryOptionsContextProvider>
                ),
            },
            {
                path: '/admin/customers/:customerID',
                element: <CustomerProfilePage/>
            },
            {
                path: '/admin/customers/:customerID/reviews',
                element: <CustomerReviewsPage/>
            },
            {
                path: '/admin/customers/:customerID/reviews/:reviewID',
                element: <CustomerReviewPage/>
            },
            {
                path: '/admin/customers/:customerID/reviews/:reviewID/logs',
                element: <CustomerReviewLogsPage/>
            },
        ]
    }
];