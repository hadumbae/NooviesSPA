import HomePage from "../pages/HomePage.tsx";
import AdminLayout from "@/common/layout/AdminLayout.tsx";

export default [
    {
        path: "/",
        element: <AdminLayout />,
        children: [
            {path: "/", element: <HomePage />},
        ]
    },
];