import {BaseLayout} from "@/views/common/_layout/base-layout/BaseLayout.tsx";
import {ErrorPage} from "@/views/common/_pages/error/ErrorPage.tsx";
import {NotFoundPage} from "@/views/common/_pages/error/NotFoundPage.tsx";
import {UnauthorizedPage} from "@/views/common/_pages/error/UnauthorizedPage.tsx";

export default [
    {
        path: '*',
        element: <BaseLayout/>,
        children: [
            {path: "*", element: <NotFoundPage />},
        ],
    },
    {
        path: '/error',
        element: <BaseLayout/>,
        children: [
            {path: "/error", element: <ErrorPage/>},
            {path: "/error/not-found", element: <NotFoundPage/>},
            {path: "/error/unauthorized", element: <UnauthorizedPage/>},
        ],
    },
];