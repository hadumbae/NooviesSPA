/**
 * @fileoverview Layout component for displaying comprehensive reservation data.
 */

import {ReactElement} from "react";
import {cn} from "@/common/_feat";
import {AdminReservation} from "@/domains/reservations";
import {PageSectionHeader, SectionTitle} from "@/views/common/_comp";
import {MoviePosterImage} from "@/views/admin/movies";
import {ReservationStatusBadge} from "@/views/client/reservations";
import {AdminReservationActionsSection, AdminReservationNotesSection} from "@/views/admin/reservations/_feat";
import {
    CustomerReservationDateList,
    CustomerReservationSummaryCard,
    CustomerReservationTheatreSummaryCard,
    CustomerReservationUserSummaryCard
} from "@/views/admin/reservations/_comp";

/** Props for the ReservationByCodeDataContent component. */
type ContentProps = {
    className?: string;
    reservation: AdminReservation
};

/** The primary content organism for the Reservation by Code view. */
export function ReservationByCodeDataContent(
    {className, reservation}: ContentProps
): ReactElement {
    const {
        user,
        slug,
        uniqueCode,
        status,
        _id: reservationID,
        notes: reservationNotes,
        snapshot: {movie: {posterURL}}
    } = reservation;

    return (
        <div className={cn("space-y-4", className)}>
            <section className="flex justify-between items-center">
                <div className="space-y-1">
                    <h2 className="section-title text-2xl">{uniqueCode}</h2>
                    <h3 className="section-subtitle text-xs italic">{slug}</h3>
                </div>

                <div>
                    <ReservationStatusBadge status={status}/>
                </div>
            </section>

            <section className="space-y-4">
                <PageSectionHeader text="Related Data"/>

                <div className="flex space-x-3">
                    <MoviePosterImage className="h-36 md:h-48" url={posterURL}/>
                    <CustomerReservationSummaryCard reservation={reservation}/>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <section className="space-y-4">
                    <PageSectionHeader text="Theatre"/>
                    <CustomerReservationTheatreSummaryCard reservation={reservation}/>
                </section>

                <section className="space-y-4">
                    <SectionTitle>User</SectionTitle>
                    <CustomerReservationUserSummaryCard user={user}/>
                </section>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <section className="space-y-3">
                    <PageSectionHeader text="Dates"/>
                    <CustomerReservationDateList reservation={reservation}/>
                </section>

                <AdminReservationNotesSection
                    reservationID={reservationID}
                    notes={reservationNotes}
                />
            </div>

            <AdminReservationActionsSection
                reservation={reservation}
            />

        </div>
    );
}