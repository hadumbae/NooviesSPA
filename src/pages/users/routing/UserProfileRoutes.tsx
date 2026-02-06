import {RouteObject} from "react-router-dom";
import BaseLayout from "@/common/layout/base-layout/BaseLayout.tsx";
import ErrorPage from "@/common/pages/ErrorPage.tsx";
import MyProfilePage from "@/pages/users/pages/profile-page/MyProfilePage.tsx";
import MyFavouritesPage from "@/pages/users/pages/MyFavouritesPage.tsx";
import MyReviewsPage from "@/pages/users/pages/MyReviewsPage.tsx";

/**
 * User account routes.
 *
 * @remarks
 * - Uses {@link BaseLayout} as the account layout wrapper
 * - Groups authenticated user pages under `/account`
 * - Provides a shared {@link ErrorPage} for route errors
 */
const routes: RouteObject[] = [
    {
        path: "/account",
        element: <BaseLayout />,
        errorElement: <ErrorPage />,
        children: [
            {path: "/account/profile", element: <MyProfilePage />},
            {path: "/account/favourites", element: <MyFavouritesPage />},
            {path: "/account/reviews", element: <MyReviewsPage />},
        ],
    }
];

export default routes;
