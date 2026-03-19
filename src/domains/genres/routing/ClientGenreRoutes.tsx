import {RouteObject} from "react-router-dom";
import BaseLayout from "@/common/layout/base-layout/BaseLayout.tsx";
import BrowseGenresPage from "@/views/client/genres/pages/browse-genre/BrowseGenresPage.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
import BrowseGenreInfoPage from "@/views/client/genres/pages/browse-genre-info/BrowseGenreInfoPage.tsx";

const routes: RouteObject[] = [
    {
        path: '/browse',
        element: <BaseLayout />,
        children: [
            {
                path: "/browse/genres",
                element: <BrowseGenresPage />,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/browse/genres/:slug",
                element: <BrowseGenreInfoPage />,
                errorElement: <ComponentErrorHandler/>,
            }
        ],
    }
];

export default routes;