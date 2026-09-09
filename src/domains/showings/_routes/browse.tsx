/**
 * @fileoverview Defines the routing configuration for browsing movie showings.
 */

import {RouteObject} from "react-router-dom";
import {BaseLayout} from "@/views/common/_layout/base-layout/BaseLayout.tsx";
import {ComponentErrorHandler} from "@/views/common/_feat/error/ComponentErrorHandler.tsx";

/** Route configuration for the public showing information and browsing views. */
export const BrowseShowingRoutes: RouteObject[] = [
    {
        path: '/browse/showings',
        element: <BaseLayout/>,
        children: [
            {
                path: "/browse/showings/:slug",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {ShowingInfoPage} = await import("@/views/client/showings");
                    return {Component: ShowingInfoPage};
                },
            },
        ],
    }
];
