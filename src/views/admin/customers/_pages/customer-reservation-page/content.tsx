/**
 * @fileoverview Main content view layout component for displaying details of a specific customer reservation.
 */

import {ReactElement} from "react";
import {PageFlexWrapper, PageSectionHeader} from "@/views/common/_comp/page";
import {CustomerDetailsCard} from "@/views/admin/customers/_comp";
import {PageHeader} from "@/views/common/_comp";
import {AdminReservation} from "@/domains/reservations";
import {LeanUserWithEmail} from "@/domains/users/_schema/user";
import {
    CustomerReservationMetadataSection,
    CustomerReservationPageBreadcrumbs
} from "@/views/admin/customers/_pages/customer-reservation-page/sections";
import {useTitle} from "@/common/_feat";
import {Separator} from "@/views/common/_comp/ui";
import {
    AdminReservationActionsSection, AdminReservationNotesSection,
    CustomerReservationDateList,
    CustomerReservationTheatreSummaryCard
} from "@/views/admin/reservations";

/** Props for the CustomerReservationPageContent component. */
type ContentProps = {
    customer: LeanUserWithEmail;
    reservation: AdminReservation;
};

/**
 * Renders the structural page content layout for a specific customer reservation details view.
 */
export function CustomerReservationPageContent(
    {customer, reservation}: ContentProps
): ReactElement {
    const {_id: customerID, name: customerName, uniqueCode: customerCode} = customer;
    const {_id: reservationID, uniqueCode: reservationCode, notes: reservationNotes} = reservation;

    useTitle(`Customer Reservation • ${reservationCode}`);

    return (
        <PageFlexWrapper>
            <PageHeader
                title="Customer Reservation"
                subtitle={reservationCode}
                breadcrumbs={<CustomerReservationPageBreadcrumbs
                    customerID={customerID}
                    customerName={customerName}
                    customerCode={customerCode}
                    reservationCode={reservationCode}
                />}
            />

            <CustomerDetailsCard
                customer={customer}
            />

            <Separator />

            <CustomerReservationMetadataSection
                reservation={reservation}
            />

            <div className="grid grid-cols-2 gap-4">
                <section className="space-y-2">
                    <PageSectionHeader text="Theatre" />
                    <CustomerReservationTheatreSummaryCard reservation={reservation} />
                </section>

                <section className="space-y-2">
                    <PageSectionHeader text="Dates" />
                    <CustomerReservationDateList reservation={reservation} />
                </section>
            </div>

            <AdminReservationActionsSection
                reservation={reservation}
            />

            <AdminReservationNotesSection
                reservationID={reservationID}
                notes={reservationNotes}
            />
        </PageFlexWrapper>
    );
}