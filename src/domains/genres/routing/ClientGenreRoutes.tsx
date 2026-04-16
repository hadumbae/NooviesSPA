import {RouteObject} from "react-router-dom";
import BaseLayout from "@/common/layout/base-layout/BaseLayout.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
import BrowseGenreInfoPage from "@/views/client/genres/browse-genre-info/BrowseGenreInfoPage.tsx";
import { BrowseGenresPage } from "src/views/client/genres/browse-genres-page";

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