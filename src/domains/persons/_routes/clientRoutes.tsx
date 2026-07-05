/**
 * @fileoverview Defines the client-side routing configuration for browsing person-related pages.
 */

import {RouteObject} from "react-router-dom";
import {BaseLayout} from "@/common/layout/base-layout/BaseLayout.tsx";
import {PersonInfoPage} from "@/views/client/persons/_pages/info-page/page.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";

/** Route configuration for person browsing and detail views. */
export const BrowsePersonRoutes: RouteObject[] = [
    {
        path: "/browse/persons",
        element: <BaseLayout/>,
        children: [
            {
                path: ":slug",
                element: <PersonInfoPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
        ],
    }
];