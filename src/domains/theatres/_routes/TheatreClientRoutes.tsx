/**
 * @fileoverview Route definitions for the client theatre module.
 */

import {RouteObject} from "react-router-dom";
import {BaseLayout} from "@/views/common/_layout/base-layout/BaseLayout.tsx";
import {ComponentErrorHandler} from "@/views/common/_feat/error/ComponentErrorHandler.tsx";
import {BrowseTheatreListPage, TheatreInfoPage} from "@/views/client/theatres";
import {TheatreInfoQueryOptionsContextProvider, TheatreLocationQueryOptionsContextProvider} from "@/domains/theatres";

const routes: RouteObject[] = [
    {
        path: '/browse/theatres',
        element: <BaseLayout/>,
        children: [
            {
                index: true,
                errorElement: <ComponentErrorHandler/>,
                element: (
                    <TheatreLocationQueryOptionsContextProvider>
                        <BrowseTheatreListPage/>
                    </TheatreLocationQueryOptionsContextProvider>
                ),
            },
            {
                path: ":slug",
                errorElement: <ComponentErrorHandler/>,
                element: (
                    <TheatreInfoQueryOptionsContextProvider>
                        <TheatreInfoPage/>
                    </TheatreInfoQueryOptionsContextProvider>
                ),
            }
        ],
    }
];

export {
    routes as TheatreClientRoutes
}