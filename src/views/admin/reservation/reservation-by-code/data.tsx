/**
 * @fileoverview Layout component for displaying comprehensive reservation data.
 */

import {ReactElement} from "react";
import {cn} from "@/common/lib/utils.ts";
import {AdminReservation} from "@/domains/reservation/schema/model";
import {
    ReservationByCodeActionsSection,
    ReservationByCodeDateSection,
    ReservationByCodeDetailsSection,
    ReservationByCodeMetadataSection,
    ReservationByCodeNotesSection,
    ReservationByCodeTheatreSection,
    ReservationByCodeUserSection,
} from "@/views/admin/reservation/reservation-by-code/sections";

/** Props for the ReservationByCodeDataContent component. */
type ContentProps = {
    className?: string;
    reservation: AdminReservation
};

/** The primary content organism for the Reservation by Code view. */
export function ReservationByCodeDataContent(
    {className, reservation}: ContentProps
): ReactElement {
    return (
        <div className={cn("space-y-4", className)}>
            <ReservationByCodeMetadataSection reservation={reservation}/>

            <ReservationByCodeDetailsSection reservation={reservation}/>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ReservationByCodeTheatreSection reservation={reservation}/>
                <ReservationByCodeUserSection reservation={reservation}/>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <ReservationByCodeDateSection reservation={reservation}/>

                <ReservationByCodeNotesSection
                    resID={reservation._id}
                    notes={reservation.notes}
                />
            </div>

            <ReservationByCodeActionsSection reservation={reservation}/>
        </div>
    );
}