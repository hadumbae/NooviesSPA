/**
 * @fileoverview Route definitions for the user profile and account management section.
 *
 */

import {RouteObject} from "react-router-dom";
import {BaseLayout} from "@/views/common/_layout/base-layout/BaseLayout.tsx";
import {ErrorPage} from "@/views/common/_pages/error/ErrorPage.tsx";

/**
 * Defines the account route hierarchy for authenticated users.
 */
export const UserProfileRoutes: RouteObject[] = [
    {
        path: "/account",
        element: <BaseLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/account/profile",
                lazy: async () => {
                    const {MyProfilePage} = await import("@/views/client/users");
                    return {Component: MyProfilePage};
                },
            },
            {
                path: "/account/favourites",
                lazy: async () => {
                    const {MyFavouritesPage} = await import("@/views/client/users");
                    return {Component: MyFavouritesPage};
                },
            },
            {
                path: "/account/reviews",
                lazy: async () => {
                    const {MyReviewsPage} = await import("@/views/client/users");
                    return {Component: MyReviewsPage};
                },
            },
            {
                path: "/account/reservations/:slug",
                lazy: async () => {
                    const {MyReservationPage} = await import("@/views/client/users");
                    return {Component: MyReservationPage};
                },
            },
            {
                path: "/account/reservations",
                lazy: async () => {
                    const {MyReservationsPage} = await import("@/views/client/users");
                    return {Component: MyReservationsPage};
                },
            },
        ],
    }
];
