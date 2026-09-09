/**
 * @fileoverview Route configuration for the administrative Persons domain.
 */

import {ComponentErrorHandler} from "@/views/common/_feat/error/ComponentErrorHandler.tsx";
import AdminLayout from "@/views/common/_layout/admin-layout/AdminLayout.tsx";

/**
 * Admin "Persons" route definitions.
 */
export const PersonRoutes = [
    {
        path: '/admin/persons',
        element: <AdminLayout/>,
        children: [
            {
                path: "/admin/persons",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {PersonIndexPage} = await import("@/views/admin/persons/_pages/index-page/page.tsx");
                    const {PersonIndexQueryOptionsContextProvider} = await import("@/domains/persons");
                    return {
                        Component: () => (
                            <PersonIndexQueryOptionsContextProvider>
                                <PersonIndexPage/>
                            </PersonIndexQueryOptionsContextProvider>
                        ),
                    };
                },
            },
            {
                path: "/admin/persons/get/:slug",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {PersonDetailsPage} = await import("@/views/admin/persons/_pages/details-page");
                    const {
                        PersonDeletingUIContextProvider,
                        PersonFormUIContextProvider,
                        PersonImageFormUIContextProvider,
                    } = await import("@/domains/persons");
                    return {
                        Component: () => (
                            <PersonFormUIContextProvider>
                                <PersonImageFormUIContextProvider>
                                    <PersonDeletingUIContextProvider>
                                        <PersonDetailsPage/>
                                    </PersonDeletingUIContextProvider>
                                </PersonImageFormUIContextProvider>
                            </PersonFormUIContextProvider>
                        ),
                    };
                },
            }
        ],
    }
];
