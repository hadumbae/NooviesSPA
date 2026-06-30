/**
 * @fileoverview Route definitions for the client theatre module.
 */

import {RouteObject} from "react-router-dom";
import {BaseLayout} from "@/common/layout/base-layout/BaseLayout.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
import {BrowseTheatreListPage, TheatreInfoPage} from "@/views/client/theatres";

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