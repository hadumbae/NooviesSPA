/**
 * @fileoverview Smart container for the Customer Profile page in the Admin dashboard.
 */
import {Loader} from "lucide-react";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {
    CustomerProfileViewData,
    CustomerProfileViewDataSchema,
    useFetchCustomerProfileViewData
} from "@/domains/customers/_feat/profile-overview";
import {CustomerProfilePageContent} from "@/views/admin/customers/customer-profile-page/content.tsx";
import {useFetchCustomerCode} from "@/domains/users";
import {ReactElement} from "react";
import {PageCenter} from "@/views/common/_comp/page";

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
        <ValidatedDataLoader query={query} schema={CustomerProfileViewDataSchema}>
            {({customer, reservation, review}: CustomerProfileViewData) => (
                <CustomerProfilePageContent
                    customer={customer}
                    reservations={reservation.items}
                    reviews={review.items}
                    reservationCount={reservation.total}
                    reviewCount={review.total}
                />
            )}
        </ValidatedDataLoader>
    );
}