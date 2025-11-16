import BaseLayout from "@/common/layout/base-layout/BaseLayout.tsx";
import ErrorPage from "@/common/pages/ErrorPage.tsx";
import NotFoundPage from "@/common/pages/NotFoundPage.tsx";
import UnauthorizedPage from "@/common/pages/UnauthorizedPage.tsx";

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