/**
 * @fileoverview Main content view layout component for displaying a customer's reservation history.
 */

import {PageFlexWrapper, PageSectionHeader} from "@/views/common/_comp/page";
import {PageHeader, PaginationRangeButtons} from "@/views/common/_comp";
import {LeanUserWithEmail} from "@/domains/users/_schema/user";
import {CustomerDetailsCard, CustomerReservationCard} from "@/views/admin/customers/_comp";
import {ReactElement} from "react";
import {CustomerReservationsPageBreadcrumbs} from "@/views/admin/customers/_pages/customer-reservations-page/sections";
import {AdminReservation} from "@/domains/reservations";
import {useTitle} from "@/common/_feat";

/** Props for the CustomerReservationsPageContent component. */
type ContentProps = {
    customer: LeanUserWithEmail;
    reservations: AdminReservation[];
    page: number;
    perPage: number;
    setPage: (value: number) => void;
    totalItems: number;
};

/**
 * Renders the structural page content layout including customer details, a list of reservation cards, and pagination.
 */
export function CustomerReservationsPageContent(
    {customer, reservations, page, perPage, setPage, totalItems}: ContentProps
): ReactElement {
    const {_id: customerID, uniqueCode: customerCode, name: customerName} = customer;
    useTitle(`Customer Reservations • ${customerCode}`)

    return (
        <PageFlexWrapper>
            <PageHeader
                title="Customer's Reservations"
                subtitle={<>
                    {customerName} • <span className="font-medium">{customerCode}</span>
                </>}
                breadcrumbs={
                    <CustomerReservationsPageBreadcrumbs
                        customerID={customerID}
                        customerName={customerName}
                        customerCode={customerCode}
                    />
                }
            />

            <CustomerDetailsCard
                customer={customer}
            />

            <section className="space-y-2">
                <PageSectionHeader>Reservations</PageSectionHeader>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {reservations.map(review => (
                        <CustomerReservationCard key={review._id} reservation={review}/>
                    ))}
                </div>
            </section>

            <PaginationRangeButtons
                page={page}
                perPage={perPage}
                totalItems={totalItems}
                setPage={setPage}
            />
        </PageFlexWrapper>
    );
}