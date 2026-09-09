/**
 * @fileoverview Defines the administration route configuration for user management.
 */

import {RouteObject} from "react-router-dom";
import AdminLayout from "@/views/common/_layout/admin-layout/AdminLayout.tsx";
import {ErrorPage} from "@/views/common/_pages";
import {ComponentErrorHandler} from "@/views/common/_feat";

/** Route definitions for the user administration module. */
export const AdminUserRoutes: RouteObject[] = [
    {
        path: "/admin/users",
        element: <AdminLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/admin/users",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {UserIndexPage} = await import("@/views/admin/users/pages/index-page/page.tsx");
                    const {UserIndexQueryOptionsContextProvider} = await import("@/domains/users");
                    return {
                        Component: () => (
                            <UserIndexQueryOptionsContextProvider>
                                <UserIndexPage/>
                            </UserIndexQueryOptionsContextProvider>
                        ),
                    };
                },
            },
            {
                path: "/admin/users/:userID",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {UserDetailsPage} = await import("@/views/admin/users/pages/details-page/page.tsx");
                    return {Component: UserDetailsPage};
                },
            },
            {
                path: "/admin/users/:customerID/reviews",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {CustomerReviewsPage} = await import("@/views/admin/customers/_pages/customer-reviews-page");
                    return {Component: CustomerReviewsPage};
                },
            },
            {
                path: "/admin/users/:customerID/reviews/:reviewID",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {CustomerReviewPage} = await import("@/views/admin/customers/_pages/customer-review-page");
                    return {Component: CustomerReviewPage};
                },
            },
        ],
    }
];
