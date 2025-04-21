import {RouteObject} from "react-router-dom";
import BaseLayout from "@/common/layout/BaseLayout.tsx";
import ErrorPage from "@/common/pages/ErrorPage.tsx";
import MyProfilePage from "@/pages/client/user/pages/MyProfilePage.tsx";
import MyFavouritesPage from "@/pages/client/user/pages/MyFavouritesPage.tsx";
import MyReviewsPage from "@/pages/client/user/pages/MyReviewsPage.tsx";

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