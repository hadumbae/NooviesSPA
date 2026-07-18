/**
 * @fileoverview Defines the client-side routing configuration for browsing person-related pages.
 */

import {RouteObject} from "react-router-dom";
import {BaseLayout} from "@/views/common/_layout/base-layout/BaseLayout.tsx";
import {PersonInfoPage} from "@/views/client/persons/_pages/info-page/page.tsx";
import {ComponentErrorHandler} from "@/views/common/_feat/error/ComponentErrorHandler.tsx";
import {BrowsePersonsPage} from "@/views/client/persons/_pages/browse-page/page.tsx";

/** Route configuration for person browsing and detail views. */
export const BrowsePersonRoutes: RouteObject[] = [
    {
        path: "/browse/persons",
        element: <BaseLayout/>,
        children: [
            {
                path: "/browse/persons",
                element: <BrowsePersonsPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/browse/persons/:slug",
                element: <PersonInfoPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
        ],
    }
];