/**
 * @file Route definitions for the Administrative Reservation feature set.
 * @filename AdminReservationRoutes.tsx
 */

import {RouteObject} from "react-router-dom";
import AdminLayout from "@/common/layout/admin-layout/AdminLayout.tsx";
import AuthLoader from "@/common/routing/loaders/AuthLoader.ts";
import {ReservationByCodePage} from "@/views/admin/reservation/reservation-by-code/pages";
import ComponentErrorHandler from "@/common/components/errors/ComponentErrorHandler.tsx";

/**
 * Configuration for reservation-related administrative routes.
 */
export const AdminReservationRoutes: RouteObject[] = [
    {
        path: "/admin/reservations",
        element: <AdminLayout/>,
        loader: AuthLoader,
        children: [
            {
                /** Page for verifying individual reservation via their unique verification string. */
                path: '/admin/reservations/fetch/by-unique-code',
                element: <ReservationByCodePage/>,
                errorElement: <ComponentErrorHandler/>,
            }
        ],
    }
];