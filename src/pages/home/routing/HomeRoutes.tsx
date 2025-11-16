import HomePage from "../pages/HomePage.tsx";
import BaseLayout from "@/common/layout/base-layout/BaseLayout.tsx";

export default [
    {
        path: "/",
        element: <BaseLayout />,
        children: [
            {path: "/", element: <HomePage />},
        ]
    },
];