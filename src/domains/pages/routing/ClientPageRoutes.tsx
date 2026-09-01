/**
 * @fileoverview Client-side route configurations for public application pages wrapped in the base layout.
 */

import {BaseLayout} from "@/views/common/_layout/base-layout/BaseLayout.tsx";
import {HomePage} from "@/views/client/homepage";

/** Route definitions for public-facing client pages. */
export const ClientPageRoutes = [
    {
        path: "/",
        element: <BaseLayout/>,
        children: [
            {path: "/", element: <HomePage/>},
        ]
    }
];