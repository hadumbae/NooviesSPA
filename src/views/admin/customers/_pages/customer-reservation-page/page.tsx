/**
 * @fileoverview Page component that fetches and displays the details of a specific customer reservation.
 */

import {QueryDataLoader} from "@/views/common/_feat";
import {ReactElement} from "react";
import {useRouteParams, useTitle} from "@/common/_feat";
import {CustomerReservationPageContent} from "@/views/admin/customers/_pages/customer-reservation-page/content.tsx";
import {
    CustomerReservationRouteParamsSchema,
    CustomerReservationViewData,
    useFetchCustomerReservationViewData
} from "@/domains/customers/_feat/manage-reservation";

/**
 * Renders the customer reservation detail page by parsing route parameters and loading the view data.
 */
export function CustomerReservationPage(): ReactElement {
    useTitle("Customer Reservation Details");

    const {customerID, reservationID} = useRouteParams({
        schema: CustomerReservationRouteParamsSchema,
        errorConfig: {description: "Valid Customer ID And Reservation ID Are Required."},
    });

    const query = useFetchCustomerReservationViewData({customerID, reservationID});

    return (
        <QueryDataLoader query={query}>
            {({reservation, customer}: CustomerReservationViewData) => (
                <CustomerReservationPageContent
                    customer={customer}
                    reservation={reservation}
                />
            )}
        </QueryDataLoader>
    );
}