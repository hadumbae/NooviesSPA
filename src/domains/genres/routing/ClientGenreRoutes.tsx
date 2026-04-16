import {RouteObject} from "react-router-dom";
import BaseLayout from "@/common/layout/base-layout/BaseLayout.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
import { BrowseGenresPage } from "@/views/client/genres/browse-genres-page";
import { BrowseGenreInfoPage } from "@/views/client/genres/browse-genre-info";

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