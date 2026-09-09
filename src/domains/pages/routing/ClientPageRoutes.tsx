/**
 * @fileoverview Client-side route configurations for public application pages wrapped in the base layout.
 */

import {BaseLayout} from "@/views/common/_layout/base-layout/BaseLayout.tsx";

/** Route definitions for public-facing client pages. */
export const ClientPageRoutes = [
    {
        path: "/",
        element: <BaseLayout/>,
        children: [
            {
                path: "/",
                lazy: async () => {
                    const {HomePage} = await import("@/views/client/homepage");
                    return {Component: HomePage};
                },
            },
        ]
    }
];
