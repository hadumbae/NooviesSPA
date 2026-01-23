import {RouteObject} from "react-router-dom";
import BaseLayout from "@/common/layout/base-layout/BaseLayout.tsx";
import TheatreInfoPage from "@/pages/theatres/pages/client/theatre-info/TheatreInfoPage.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";
import BrowseTheatreListPage from "@/pages/theatres/pages/client/browse-theatre-list/BrowseTheatreListPage.tsx";

const routes: RouteObject[] = [
    {
        path: '/browse/theatres',
        element: <BaseLayout/>,
        children: [
            {
                path: "/browse/theatres",
                element: <BrowseTheatreListPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
            {
                path: "/browse/theatres/:slug",
                element: <TheatreInfoPage/>,
                errorElement: <ComponentErrorHandler/>,
            }
        ],
    }
];

export default routes;