import HomePage from "@/pages/client/pages/HomePage.tsx";
import BaseLayout from "@/common/layout/base-layout/BaseLayout.tsx";

/**
 * Client routes.
 *
 * @remarks
 * - Uses {@link BaseLayout} as the public layout wrapper
 * - Registers the client home page at `/`
 */
export default [
    {
        path: "/",
        element: <BaseLayout />,
        children: [
            {path: "/", element: <HomePage />},
        ]
    },
];
