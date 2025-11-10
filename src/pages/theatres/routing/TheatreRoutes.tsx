import BaseLayout from "@/common/layout/BaseLayout.tsx";
import ErrorPage from "@/common/pages/ErrorPage.tsx";
import TheatreIndexPage from "@/pages/theatres/pages/TheatreIndexPage.tsx";
import TheatreCreatePage from "@/pages/theatres/pages/TheatreCreatePage.tsx";
import TheatreDetailsPage from "@/pages/theatres/pages/TheatreDetailsPage.tsx";
import ScreenDetailsPage from "@/pages/screens/pages/screens-by-theatre/ScreenDetailsPage.tsx";

export default [
    {
        path: '/admin/theatres',
        element: <BaseLayout />,
        errorElement: <ErrorPage />,
        children: [
            {path: "/admin/theatres", element: <TheatreIndexPage />},
            {path: "/admin/theatres/create", element: <TheatreCreatePage />},

            {path: "/admin/theatres/get/:theatreID", element: <TheatreDetailsPage />},
            {path: "/admin/theatres/get/:theatreID/screen/:screenID", element: <ScreenDetailsPage />},
        ],
    }
];