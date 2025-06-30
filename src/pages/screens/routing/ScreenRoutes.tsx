import BaseLayout from "@/common/layout/BaseLayout.tsx";
import ErrorPage from "@/common/pages/ErrorPage.tsx";
import ScreensPage from "@/pages/screens/pages/screens/admin/ScreensPage.tsx";
import ScreenCreatePage from "@/pages/screens/pages/screens/admin/ScreenCreatePage.tsx";
import ScreenEditPage from "@/pages/screens/pages/screens/admin/ScreenEditPage.tsx";
import ScreenPage from "@/pages/screens/pages/screens/admin/ScreenPage.tsx";

export default [
    {
        path: '/admin/screens',
        element: <BaseLayout />,
        errorElement: <ErrorPage />,
        children: [
            {path: "/admin/screens", element: <ScreensPage />},
            {path: "/admin/screens/create", element: <ScreenCreatePage />},
            {path: "/admin/screens/get/:screenID", element: <ScreenPage />},
            {path: "/admin/screens/edit/:screenID", element: <ScreenEditPage />},
        ],
    }
];