/**
 * @fileoverview Route definitions for the user profile and account management section.
 *
 */

import {RouteObject} from "react-router-dom";
import BaseLayout from "@/common/layout/base-layout/BaseLayout.tsx";
import ErrorPage from "@/common/pages/ErrorPage.tsx";
import {MyProfilePage} from "@/views/client/users/my-profile-page/page.tsx";
import {MyFavouritesPage} from "@/views/client/users/my-favourites-page/page.tsx";
import {MyReviewsPage} from "@/views/client/users/reviews-page/page.tsx";
import {MyReservationPage} from "@/views/client/users/my-reservation-page/MyReservationPage.tsx";
import {MyReservationsPage} from "@/views/client/users/my-reservations-page/page.tsx";

/**
 * Defines the account route hierarchy for authenticated users.
 */
export const routes: RouteObject[] = [
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