/**
 * @fileoverview Defines the client-side routing configuration for browsing movie genres.
 */

import {RouteObject} from "react-router-dom";
import {BaseLayout} from "@/views/common/_layout/base-layout/BaseLayout.tsx";
import {ComponentErrorHandler} from "@/views/common/_feat/error/ComponentErrorHandler.tsx";
import { BrowseGenresPage } from "@/views/client/genres/browse-genres-page";
import { BrowseGenreInfoPage } from "@/views/client/genres/browse-genre-info";

/** Route configuration for genre-related pages within the client browse section. */
export const ClientGenreRoutes: RouteObject[] = [
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
