/**
 * @file Smart container for the Customer Profile page in the Admin dashboard.
 * @filename CustomerProfilePage.tsx
 */

import {CustomerProfilePageContent} from "@/views/admin/customers/customer-profile-page/CustomerProfilePageContent.tsx";
import {useFetchCustomerCode} from "@/views/admin/customers/utils/fetch-customer-code/useFetchCustomerCode.ts";
import {Loader} from "lucide-react";
import {useFetchCustomerProfileViewData} from "@/domains/customers/features/profile-overview/fetch";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {
    CustomerProfileViewData,
    CustomerProfileViewDataSchema
} from "@/domains/customers/features/profile-overview/schema";

/**
 * Orchestrates data fetching and validation for the Customer Profile view.
 * ---
 */
export const CustomerProfilePage = () => {
    const code = useFetchCustomerCode();

    if (!code) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="animate-spin text-muted-foreground" />
            </div>
        );
    }

    const query = useFetchCustomerProfileViewData({code});

    return (
        <ValidatedDataLoader query={query} schema={CustomerProfileViewDataSchema}>
            {(data: CustomerProfileViewData) => {
                const {
                    customer,
                    reservation: {total: resCount, items: reservations},
                    review: {total: revCount, items: reviews}
                } = data;

                return (
                    <CustomerProfilePageContent
                        customer={customer}
                        reservations={reservations}
                        reviews={reviews}
                        reservationCount={resCount}
                        reviewCount={revCount}
                    />
                );
            }}
        </ValidatedDataLoader>
    );
};