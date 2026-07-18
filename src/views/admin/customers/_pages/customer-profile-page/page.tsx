/**
 * @fileoverview Smart container for the Customer Profile page in the Admin dashboard.
 */

import {ReactElement} from "react";
import {Loader} from "lucide-react";
import {PageCenter} from "@/views/common/_comp";
import {QueryDataLoader} from "@/views/common/_feat";
import {useFetchCustomerCode} from "@/domains/users";
import {CustomerProfileViewData, useFetchCustomerProfileViewData} from "@/domains/customers";
import {CustomerProfilePageContent} from "@/views/admin/customers/_pages/customer-profile-page/content.tsx";

/**
 * Orchestrates data fetching and validation for the Customer Profile view.
 */
export function CustomerProfilePage(): ReactElement {
    const customerCode = useFetchCustomerCode();
    const query = useFetchCustomerProfileViewData({
        customerCode,
        options: {enabled: !!customerCode}
    });

    if (!customerCode) {
        return (
            <PageCenter>
                <Loader className="animate-spin text-muted-foreground"/>
            </PageCenter>
        );
    }

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