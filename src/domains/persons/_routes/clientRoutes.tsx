/**
 * @fileoverview Defines the client-side routing configuration for browsing person-related pages.
 */

import {RouteObject} from "react-router-dom";
import {BaseLayout} from "@/views/common/_layout/base-layout/BaseLayout.tsx";
import {ComponentErrorHandler} from "@/views/common/_feat/error/ComponentErrorHandler.tsx";

/** Route configuration for person browsing and detail views. */
export const BrowsePersonRoutes: RouteObject[] = [
    {
        path: "/browse/persons",
        element: <BaseLayout/>,
        children: [
            {
                path: "/browse/persons",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {BrowsePersonsPage} = await import("@/views/client/persons/_pages/browse-page/page.tsx");
                    const {BrowsePersonsQueryOptionsContextProvider} = await import("@/domains/persons");
                    return {
                        Component: () => (
                            <BrowsePersonsQueryOptionsContextProvider>
                                <BrowsePersonsPage/>
                            </BrowsePersonsQueryOptionsContextProvider>
                        ),
                    };
                },
            },
            {
                path: "/browse/persons/:slug",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {PersonInfoPage} = await import("@/views/client/persons/_pages/info-page/page.tsx");
                    return {Component: PersonInfoPage};
                },
            },
        ],
    }
];
