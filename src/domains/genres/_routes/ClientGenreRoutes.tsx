/**
 * @fileoverview Defines the client-side routing configuration for browsing movie genres.
 */

import {RouteObject} from "react-router-dom";
import {BaseLayout} from "@/views/common/_layout/base-layout/BaseLayout.tsx";
import {ComponentErrorHandler} from "@/views/common/_feat/error/ComponentErrorHandler.tsx";

/** Route configuration for genre-related pages within the client browse section. */
export const ClientGenreRoutes: RouteObject[] = [
    {
        path: '/browse',
        element: <BaseLayout />,
        children: [
            {
                path: "/browse/genres",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {BrowseGenresPage} = await import("@/views/client/genres/browse-genres-page");
                    return {Component: BrowseGenresPage};
                },
            },
            {
                path: "/browse/genres/:slug",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {BrowseGenreInfoPage} = await import("@/views/client/genres/browse-genre-info");
                    return {Component: BrowseGenreInfoPage};
                },
            }
        ],
    }
];
