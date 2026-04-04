import {CustomerProfilePageContent} from "@/views/admin/customers/customer-profile-page/CustomerProfilePageContent.tsx";
import {useFetchCustomerCode} from "@/views/admin/customers/utils/fetch-customer-code/useFetchCustomerCode.ts";
import {Loader} from "lucide-react";
import {useFetchCustomerProfileViewData} from "@/domains/customers/features/profile-overview/fetch";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {
    CustomerProfileViewData,
    CustomerProfileViewDataSchema
} from "@/domains/customers/features/profile-overview/schema";

export const CustomerProfilePage = () => {
    const code = useFetchCustomerCode();

    if (!code) {
        return <Loader />;
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