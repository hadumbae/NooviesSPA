/**
 * @fileoverview Defines the routing configuration for browsing movie showings.
 */

import {RouteObject} from "react-router-dom";
import {BaseLayout} from "@/views/common/_layout/base-layout/BaseLayout.tsx";
import {ComponentErrorHandler} from "@/views/common/_feat/error/ComponentErrorHandler.tsx";
import {ShowingInfoPage} from "@/views/client/showings";

/** Route configuration for the public showing information and browsing views. */
export const BrowseShowingRoutes: RouteObject[] = [
    {
        path: '/browse/showings',
        element: <BaseLayout/>,
        children: [
            {
                path: "/browse/showings/:slug",
                element: <ShowingInfoPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
        ],
    }
];
