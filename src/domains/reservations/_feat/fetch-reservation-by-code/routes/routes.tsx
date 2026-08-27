/**
 * @fileoverview Route definitions for the administrative reservation feature set.
 */

import {RouteObject} from "react-router-dom";
import AdminLayout from "@/views/common/_layout/admin-layout/AdminLayout.tsx";
import {AuthLoader} from "@/common/_loaders";
import {ReservationByCodePage} from "@/views/admin/reservations/_pages/reservation-by-code";
import {ComponentErrorHandler} from "@/views/common/_feat/error/ComponentErrorHandler.tsx";
import {
    FetchReservationByCodeQueryOptionsContextProvider
} from "@/domains/reservations/_feat/fetch-reservation-by-code/reservation-query-options-form";

/** Configuration for reservation-related administrative routes. */
export const AdminReservationRoutes: RouteObject[] = [
    {
        path: "/admin/reservations",
        element: <AdminLayout/>,
        loader: AuthLoader,
        children: [
            {
                /** Page for verifying individual reservation via their unique verification string. */
                path: '/admin/reservations/fetch/by-unique-code',
                errorElement: <ComponentErrorHandler/>,
                element: <FetchReservationByCodeQueryOptionsContextProvider>
                    <ReservationByCodePage/>
                </FetchReservationByCodeQueryOptionsContextProvider>,
            }
        ],
    }
];