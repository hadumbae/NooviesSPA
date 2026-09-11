/**
 * @fileoverview React Router configuration for the Theatre administration module.
 */

import AdminLayout from "@/views/common/_layout/admin-layout/AdminLayout.tsx";

/**
 * Defines the routing hierarchy for theatre management.
 */
const routes = [
    {
        path: "/admin/theatres",
        element: <AdminLayout/>,
        children: [
            {
                index: true,
                lazy: async () => {
                    const {TheatreIndexPage} = await import("@/views/admin/theatres/_pages");
                    const {TheatreIndexQueryOptionsContextProvider} = await import("@/domains/theatres/_feat/handle-query-options/theatre-index/TheatreIndexQueryOptionsContext.ts");
                    return {
                        Component: () => (
                            <TheatreIndexQueryOptionsContextProvider>
                                <TheatreIndexPage/>
                            </TheatreIndexQueryOptionsContextProvider>
                        ),
                    };
                },
            },
            {
                path: "get/:slug",
                lazy: async () => {
                    const {TheatreDetailsPage} = await import("@/views/admin/theatres/_pages");
                    return {Component: TheatreDetailsPage};
                },
            },
            {
                path: "get/:slug/showings/create",
                lazy: async () => {
                    const {TheatreShowingCreatePage} = await import("@/views/admin/theatres/_pages");
                    return {Component: TheatreShowingCreatePage};
                },
            },
            {
                path: "get/:slug/showings/list",
                lazy: async () => {
                    const {TheatreShowingListPage} = await import("@/views/admin/theatres/_pages");
                    return {Component: TheatreShowingListPage};
                },
            },
            {
                path: "get/:theatreSlug/screen/:screenSlug",
                lazy: async () => {
                    const {TheatreScreenDetailsPage} = await import("@/views/admin/theatres/_pages");
                    const {
                        TheatreScreenDetailsQueryOptionsContextProvider
                    } = await import("@/domains/theatre-screens/_feat/validate-query-options/theatre-screen-details");
                    return {
                        Component: () => (
                            <TheatreScreenDetailsQueryOptionsContextProvider defaultValues={{recentShowingsCount: 10}}>
                                <TheatreScreenDetailsPage/>
                            </TheatreScreenDetailsQueryOptionsContextProvider>
                        ),
                    };
                },
            },
        ],
    },
];

export {
    routes as TheatreAdminRoutes,
}
