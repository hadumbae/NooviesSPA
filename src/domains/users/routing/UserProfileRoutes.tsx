/**
 * @file Route definitions for the user profile and account management section.
 * @filename UserProfileRoutes.tsx
 */

import {RouteObject} from "react-router-dom";
import BaseLayout from "@/common/layout/base-layout/BaseLayout.tsx";
import ErrorPage from "@/common/pages/ErrorPage.tsx";
import MyProfilePage from "@/views/client/users/pages/profile-page/MyProfilePage.tsx";
import MyFavouritesPage from "@/views/client/users/pages/favourites-page/MyFavouritesPage.tsx";
import MyReviewsPage from "@/views/client/users/pages/reviews-page/MyReviewsPage.tsx";
import MyReservationPage from "@/views/client/users/pages/reservation-page/MyReservationPage.tsx";
import MyReservationsPage from "@/views/client/users/pages/my-reservations-page/MyReservationsPage.tsx";

/**
 * Defines the `/account` route hierarchy for authenticated users.
 * * **Layout:** Uses {@link BaseLayout} as the persistent shell for all child routes.
 * * **Error Handling:** Bubbles routing errors to the shared {@link ErrorPage}.
 * * **Structure:** Centralizes user-specific views including profile, social (reviews/favourites),
 * and transactional history (reservations).
 */
const routes: RouteObject[] = [
    {
        /** Parent path for user-centric administrative pages. */
        path: "/account",
        element: <BaseLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            /** Core user profile settings. */
            {path: "/account/profile", element: <MyProfilePage/>},

            /** Saved or bookmarked items. */
            {path: "/account/favourites", element: <MyFavouritesPage/>},

            /** User-submitted feedback history. */
            {path: "/account/reviews", element: <MyReviewsPage/>},

            /**
             * Individual reservation details view.
             * Uses `:slug` for SEO-friendly and human-readable identification.
             */
            {path: "/account/reservations/:slug", element: <MyReservationPage/>},

            /** Paginated list of all user bookings. */
            {path: "/account/reservations", element: <MyReservationsPage/>},
        ],
    }
];

export default routes;