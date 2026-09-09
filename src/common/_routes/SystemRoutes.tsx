/**
 * @fileoverview Defines the routing configuration for system-level pages including errors and fallbacks.
 */

import {BaseLayout} from "@/views/common/_layout/base-layout/BaseLayout.tsx";

/** Route definitions for error handling and wildcard path matching. */
export const SystemRoutes = [
    {
        path: '*',
        element: <BaseLayout/>,
        children: [
            {
                path: "*",
                lazy: async () => {
                    const {NotFoundPage} = await import("@/views/common/_pages/error/NotFoundPage.tsx");
                    return {Component: NotFoundPage};
                },
            },
        ],
    },
    {
        path: '/error',
        element: <BaseLayout/>,
        children: [
            {
                path: "/error",
                lazy: async () => {
                    const {ErrorPage} = await import("@/views/common/_pages/error/ErrorPage.tsx");
                    return {Component: ErrorPage};
                },
            },
            {
                path: "/error/not-found",
                lazy: async () => {
                    const {NotFoundPage} = await import("@/views/common/_pages/error/NotFoundPage.tsx");
                    return {Component: NotFoundPage};
                },
            },
            {
                path: "/error/unauthorized",
                lazy: async () => {
                    const {UnauthorizedPage} = await import("@/views/common/_pages/error/UnauthorizedPage.tsx");
                    return {Component: UnauthorizedPage};
                },
            },
        ],
    },
];
