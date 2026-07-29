/**
 * @fileoverview Smart container for the Customer Profile page in the Admin dashboard.
 */

import {ReactElement} from "react";
import {QueryDataLoader} from "@/views/common/_feat";
import {
    CustomerProfileOverviewRouteParamsSchema,
    CustomerProfileViewData,
    useFetchCustomerProfileViewData
} from "@/domains/customers";
import {CustomerProfilePageContent} from "@/views/admin/customers/_pages/customer-profile-page/content.tsx";
import {useRouteParams} from "@/common/_feat";

/**
 * Orchestrates data fetching and validation for the Customer Profile view.
 */
export function CustomerProfilePage(): ReactElement {
    const {customerID} = useRouteParams({
        schema: CustomerProfileOverviewRouteParamsSchema,
        errorConfig: {description: "Valid Customer ID Is Required."},
    });

    const query = useFetchCustomerProfileViewData({customerID});

    return (
        <QueryDataLoader query={query}>
            {({customer, reservation, review}: CustomerProfileViewData) => (
                <CustomerProfilePageContent
                    customer={customer}
                    reservations={reservation.items}
                    reviews={review.items}
                    reservationCount={reservation.total}
                    reviewCount={review.total}
                />
            )}
        </QueryDataLoader>
    );
}