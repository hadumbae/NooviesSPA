import BaseLayout from "@/common/layout/BaseLayout.tsx";
import ErrorPage from "@/common/pages/ErrorPage.tsx";
import TheatresPage from "@/pages/theatres/pages/TheatresPage.tsx";
import TheatreCreatePage from "@/pages/theatres/pages/TheatreCreatePage.tsx";
import TheatrePage from "@/pages/theatres/pages/TheatrePage.tsx";
import TheatreEditPage from "@/pages/theatres/pages/TheatreEditPage.tsx";

export default [
    {
        path: '/admin/theatres',
        element: <BaseLayout />,
        errorElement: <ErrorPage />,
        children: [
            {path: "/admin/theatres", element: <TheatresPage />},
            {path: "/admin/theatres/create", element: <TheatreCreatePage />},
            {path: "/admin/theatres/get/:theatreID", element: <TheatrePage />},
            {path: "/admin/theatres/edit/:theatreID", element: <TheatreEditPage />},
        ],
    }
];