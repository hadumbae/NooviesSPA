import BaseLayout from "@/common/layout/BaseLayout.tsx";
import ErrorPage from "@/common/pages/ErrorPage.tsx";

export default [
    {
        path: '/admin/seats',
        element: <BaseLayout/>,
        errorElement: <ErrorPage/>,
        children: [],
    }
];