/**
 * @fileoverview Route definitions for the client theatre module.
 */

import {RouteObject} from "react-router-dom";
import BaseLayout from "@/common/layout/base-layout/BaseLayout.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";

import {TheatreInfoPage} from "@/views/client/theatres/theatre-info";
import {BrowseTheatreListPage} from "@/views/client/theatres/browse-theatre-page";

const routes: RouteObject[] = [
    {
        path: '/browse/theatres',
        element: <BaseLayout/>,
        children: [
            {
                index: true,
                element: <BrowseTheatreListPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: ":slug",
                element: <TheatreInfoPage/>,
                errorElement: <ComponentErrorHandler/>,
            }
        ],
    }
];

export {
    routes as TheatreClientRoutes
}