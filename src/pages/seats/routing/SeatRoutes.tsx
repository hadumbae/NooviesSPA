import BaseLayout from "@/common/layout/BaseLayout.tsx";
import ErrorPage from "@/common/pages/ErrorPage.tsx";
import SeatsPage from "@/pages/seats/pages/SeatsPage.tsx";
import SeatCreatePage from "@/pages/seats/pages/SeatCreatePage.tsx";
import SeatEditPage from "@/pages/seats/pages/SeatEditPage.tsx";
import SeatPage from "@/pages/seats/pages/SeatPage.tsx";

export default [
    {
        path: '/admin/seats',
        element: <BaseLayout />,
        errorElement: <ErrorPage />,
        children: [
            {path: "/admin/seats", element: <SeatsPage />},
            {path: "/admin/seats/create", element: <SeatCreatePage />},
            {path: "/admin/seats/get/:seatID", element: <SeatPage />},
            {path: "/admin/seats/edit/:seatID", element: <SeatEditPage />},
        ],
    }
];