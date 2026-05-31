/**
 * @file Route definitions for the user profile and account management section.
 * @filename UserProfileRoutes.tsx
 */

import {RouteObject} from "react-router-dom";
import BaseLayout from "@/common/layout/base-layout/BaseLayout.tsx";
import ErrorPage from "@/common/pages/ErrorPage.tsx";
import {MyProfilePage} from "src/views/client/users/profile-page/page.tsx";
import {MyFavouritesPage} from "src/views/client/users/favourites-page/page.tsx";
import {MyReviewsPage} from "src/views/client/users/reviews-page/page.tsx";
import {MyReservationPage} from "@/views/client/users/reservation-page/MyReservationPage.tsx";
import {MyReservationsPage} from "src/views/client/users/my-reservations-page/page.tsx";

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