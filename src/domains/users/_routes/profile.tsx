/**
 * @fileoverview Route definitions for the user profile and account management section.
 *
 */

import {RouteObject} from "react-router-dom";
import {BaseLayout} from "@/views/common/_layout/base-layout/BaseLayout.tsx";
import {ErrorPage} from "@/views/common/_pages/error/ErrorPage.tsx";
import {
    MyFavouritesPage,
    MyProfilePage,
    MyReservationPage,
    MyReservationsPage,
    MyReviewsPage
} from "@/views/client/users";

/**
 * Defines the account route hierarchy for authenticated users.
 */
export const UserProfileRoutes: RouteObject[] = [
    {
        path: "/account",
        element: <BaseLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {path: "/account/profile", element: <MyProfilePage/>},
            {path: "/account/favourites", element: <MyFavouritesPage/>},
            {path: "/account/reviews", element: <MyReviewsPage/>},
            {path: "/account/reservations/:slug", element: <MyReservationPage/>},
            {path: "/account/reservations", element: <MyReservationsPage/>},
        ],
    }
];