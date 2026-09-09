/**
 * @fileoverview Route definitions for the client theatre module.
 */

import {RouteObject} from "react-router-dom";
import {BaseLayout} from "@/views/common/_layout/base-layout/BaseLayout.tsx";
import {ComponentErrorHandler} from "@/views/common/_feat/error/ComponentErrorHandler.tsx";

const routes: RouteObject[] = [
    {
        path: '/browse/theatres',
        element: <BaseLayout/>,
        children: [
            {
                index: true,
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {BrowseTheatreListPage} = await import("@/views/client/theatres");
                    const {TheatreLocationQueryOptionsContextProvider} = await import("@/domains/theatres");
                    return {
                        Component: () => (
                            <TheatreLocationQueryOptionsContextProvider>
                                <BrowseTheatreListPage/>
                            </TheatreLocationQueryOptionsContextProvider>
                        ),
                    };
                },
            },
            {
                path: ":slug",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {TheatreInfoPage} = await import("@/views/client/theatres");
                    const {TheatreInfoQueryOptionsContextProvider} = await import("@/domains/theatres");
                    return {
                        Component: () => (
                            <TheatreInfoQueryOptionsContextProvider>
                                <TheatreInfoPage/>
                            </TheatreInfoQueryOptionsContextProvider>
                        ),
                    };
                },
            }
        ],
    }
];

export {
    routes as TheatreClientRoutes
}
