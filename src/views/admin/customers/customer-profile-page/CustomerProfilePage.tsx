/**
 * @file Smart container for the Customer Profile page in the Admin dashboard.
 * @filename CustomerProfilePage.tsx
 */

import {Loader} from "lucide-react";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {
    CustomerProfileViewData,
    CustomerProfileViewDataSchema, useFetchCustomerProfileViewData
} from "@/domains/customers/features/profile-overview";
import {
    CustomerProfilePageContent
} from "@/views/admin/customers/customer-profile-page/CustomerProfilePageContent.tsx";
import {useFetchCustomerCode} from "@/domains/users/utils/fetch-customer-code/useFetchCustomerCode.ts";

/**
 * Orchestrates data fetching and validation for the Customer Profile view.
 * ---
 */
export const CustomerProfilePage = () => {
    const customerCode = useFetchCustomerCode();

    if (!customerCode) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="animate-spin text-muted-foreground"/>
            </div>
        );
    }

    const query = useFetchCustomerProfileViewData({customerCode});

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