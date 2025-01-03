import AdminLayout from "@/common/layout/AdminLayout.tsx";
import ErrorPage from "@/common/pages/ErrorPage.tsx";
import GenresPage from "@/pages/genres/pages/GenresPage.tsx";
import GenreCreatePage from "@/pages/genres/pages/GenreCreatePage.tsx";
import GenreEditPage from "@/pages/genres/pages/GenreEditPage.tsx";
import GenrePage from "@/pages/genres/pages/GenrePage.tsx";

export default [
    {
        path: '/admin/genres',
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        children: [
            {path: "/admin/genres", element: <GenresPage />},
            {path: "/admin/genres/create", element: <GenreCreatePage />},
            {path: "/admin/genres/get/:genreID", element: <GenrePage />},
            {path: "/admin/genres/edit/:genreID", element: <GenreEditPage />},
        ],
    }
];