import BaseLayout from "@/common/layout/BaseLayout.tsx";
import ErrorPage from "@/common/pages/ErrorPage.tsx";
import PersonIndexPage from "@/pages/persons/pages/PersonIndexPage.tsx";
import PersonCreatePage from "@/pages/persons/pages/PersonCreatePage.tsx";
import PersonDetailsPage from "@/pages/persons/pages/PersonDetailsPage.tsx";
import PersonImagePage from "@/pages/persons/pages/PersonImagePage.tsx";

export default [
    {
        path: '/admin/persons',
        element: <BaseLayout />,
        errorElement: <ErrorPage />,
        children: [
            {path: "/admin/persons", element: <PersonIndexPage />},
            {path: "/admin/persons/create", element: <PersonCreatePage />},
            {path: "/admin/persons/get/:personID", element: <PersonDetailsPage />},
            {path: "/admin/persons/get/:personID/images/profile", element: <PersonImagePage />},
            {path: "/admin/persons/edit/:personID/profile-image", element: <PersonImagePage />},
        ],
    }
];