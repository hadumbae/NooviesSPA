import {RouteObject} from "react-router-dom";
import BaseLayout from "@/common/layout/base-layout/BaseLayout.tsx";
import ShowingInfoPage from "@/pages/showings/pages/browse/showing-info/ShowingInfoPage.tsx";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";

const routes: RouteObject[] = [
    {
        path: '/browse/showings',
        element: <BaseLayout/>,
        children: [
            {
                path: "/browse/showings/:slug",
                element: <ShowingInfoPage/>,
                errorElement: <ComponentErrorHandler/>,
            },
        ],
    }
];

export default routes;