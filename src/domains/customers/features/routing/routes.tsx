/**
 * @fileoverview Client-side route configuration for the Administrative Customer Management Dashboard.
 */

import {RouteObject} from "react-router-dom";
import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";
import {CustomerProfilePage} from "@/views/admin/customers/customer-profile-page/CustomerProfilePage.tsx";
import {CustomerReviewPage} from "src/views/admin/customers/customer-review-page";
import {CustomerReviewsPage} from "@/views/admin/customers/customer-reviews-page/CustomerReviewsPage.tsx";

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
        ]
    }
];

export {
    routes as AdminCustomerRoutes
};