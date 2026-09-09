/**
 * @fileoverview Client-side route configuration for the Administrative Customer Management Dashboard.
 */

import {RouteObject} from "react-router-dom";
import AdminLayout from "@/views/common/_layout/admin-layout/AdminLayout.tsx";

export const AdminCustomerRoutes: RouteObject[] = [
    {
        path: "/admin/customers",
        element: <AdminLayout/>,
        children: [
            {
                path: '/admin/customers',
                lazy: async () => {
                    const {CustomerIndexPage} = await import("@/views/admin/customers/_pages/customer-index-page/page.tsx");
                    const {CustomerIndexQueryOptionsContextProvider} = await import("@/domains/customers/_ctx/CustomerIndexQueryOptionsContext.ts");
                    return {
                        Component: () => (
                            <CustomerIndexQueryOptionsContextProvider>
                                <CustomerIndexPage/>
                            </CustomerIndexQueryOptionsContextProvider>
                        ),
                    };
                },
            },
            {
                path: '/admin/customers/:customerID',
                lazy: async () => {
                    const {CustomerProfilePage} = await import("@/views/admin/customers/_pages/customer-profile-page");
                    return {Component: CustomerProfilePage};
                },
            },
            {
                path: '/admin/customers/:customerID/reviews',
                lazy: async () => {
                    const {CustomerReviewsPage} = await import("@/views/admin/customers/_pages/customer-reviews-page");
                    return {Component: CustomerReviewsPage};
                },
            },
            {
                path: '/admin/customers/:customerID/reviews/:reviewID',
                lazy: async () => {
                    const {CustomerReviewPage} = await import("@/views/admin/customers/_pages/customer-review-page");
                    return {Component: CustomerReviewPage};
                },
            },
            {
                path: '/admin/customers/:customerID/reviews/:reviewID/logs',
                lazy: async () => {
                    const {CustomerReviewLogsPage} = await import("@/views/admin/customers/_pages/customer-review-logs-page");
                    return {Component: CustomerReviewLogsPage};
                },
            },
            {
                path: '/admin/customers/:customerID/reservations',
                lazy: async () => {
                    const {CustomerReservationsPage} = await import("@/views/admin/customers/_pages/customer-reservations-page/page.tsx");
                    return {Component: CustomerReservationsPage};
                },
            },
            {
                path: '/admin/customers/:customerID/reservations/:reservationID',
                lazy: async () => {
                    const {CustomerReservationPage} = await import("@/views/admin/customers/_pages/customer-reservation-page");
                    return {Component: CustomerReservationPage};
                },
            },
        ]
    }
];
