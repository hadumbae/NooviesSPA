import BaseLayout from "@/common/layout/BaseLayout.tsx";
import ErrorPage from "@/common/pages/ErrorPage.tsx";
import PersonsPage from "@/pages/persons/pages/PersonsPage.tsx";
import PersonCreatePage from "@/pages/persons/pages/PersonCreatePage.tsx";
import PersonPage from "@/pages/persons/pages/PersonPage.tsx";
import PersonEditPage from "@/pages/persons/pages/PersonEditPage.tsx";
import PersonEditProfileImagePage from "@/pages/persons/pages/PersonEditProfileImagePage.tsx";

export default [
    {
        path: '/admin/persons',
        element: <BaseLayout />,
        errorElement: <ErrorPage />,
        children: [
            {path: "/admin/persons", element: <PersonsPage />},
            {path: "/admin/persons/create", element: <PersonCreatePage />},
            {path: "/admin/persons/get/:personID", element: <PersonPage />},
            {path: "/admin/persons/edit/:personID", element: <PersonEditPage />},
            {path: "/admin/persons/edit/:personID/profile-image", element: <PersonEditProfileImagePage />},
        ],
    }
];