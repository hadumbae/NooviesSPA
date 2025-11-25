import BaseLayout from "@/common/layout/base-layout/BaseLayout.tsx";
import ShowingIndexPage from "@/pages/showings/pages/index-page/ShowingIndexPage.tsx";
import ShowingCreatePage from "@/pages/showings/pages/ShowingCreatePage.tsx";
import ShowingEditPage from "@/pages/showings/pages/ShowingEditPage.tsx";
import ShowingPage from "@/pages/showings/pages/ShowingPage.tsx";
import ShowingSeatingPage from "@/pages/seatmap/pages/ShowingSeatingPage.tsx";
import ShowingSeatMapEditPage from "@/pages/seatmap/pages/ShowingSeatMapEditPage.tsx";
import ShowingSeatMapCreatePage from "@/pages/seatmap/pages/ShowingSeatMapCreatePage.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
import {RouteObject} from "react-router-dom";

const routes: RouteObject[] = [
    {
        path: '/admin/showings',
        element: <BaseLayout/>,
        children: [
            {
                path: "/admin/showings",
                element: <ShowingIndexPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/admin/showings/create",
                element: <ShowingCreatePage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/admin/showings/get/:showingID",
                element: <ShowingPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/admin/showings/edit/:showingID",
                element: <ShowingEditPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/admin/showings/get/:showingID/seating",
                element: <ShowingSeatingPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/admin/showings/create/:showingID/seating",
                element: <ShowingSeatMapCreatePage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/admin/showings/edit/:showingID/seating/:seatMapID",
                element: <ShowingSeatMapEditPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
        ],
    }
];

export default routes;