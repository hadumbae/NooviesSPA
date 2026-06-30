/**
 * @fileoverview Defines the routing configuration for browsing movie showings.
 */

import {RouteObject} from "react-router-dom";
import {BaseLayout} from "@/common/layout/base-layout/BaseLayout.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
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
