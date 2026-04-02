/**
 * @file Master layout component for displaying comprehensive reservation data.
 * @filename ReservationByCodeDataContent.tsx
 */

import {AdminReservation} from "@/domains/reservation/schema/model";
import {cn} from "@/common/lib/utils.ts";
import {
    ReservationByCodeMetadataSection
} from "@/views/admin/reservation/reservation-by-code/pages/sections/ReservationByCodeMetadataSection.tsx";
import {
    ReservationByCodeDateSection
} from "@/views/admin/reservation/reservation-by-code/pages/sections/ReservationByCodeDateSection.tsx";
import {
    ReservationByCodeDetailsSection
} from "@/views/admin/reservation/reservation-by-code/pages/sections/ReservationByCodeDetailsSection.tsx";
import {
    ReservationByCodeTheatreSection
} from "@/views/admin/reservation/reservation-by-code/pages/sections/ReservationByCodeTheatreSection.tsx";
import {
    ReservationByCodeUserSection
} from "@/views/admin/reservation/reservation-by-code/pages/sections/ReservationByCodeUserSection.tsx";
import {
    ReservationByCodeNotesSection
} from "@/views/admin/reservation/reservation-by-code/pages/sections/ReservationByCodeNotesSection.tsx";
import {
    ReservationByCodeActionsSection
} from "@/views/admin/reservation/reservation-by-code/pages/sections/ReservationByCodeActionsSection.tsx";

/**
 * Properties for the {@link ReservationByCodeDataContent} component.
 */
type ContentProps = {
    /** Optional CSS classes for custom layout or container styling. */
    className?: string;
    /** The complete administrative reservation object retrieved from the server. */
    reservation: AdminReservation
};

/**
 * The primary content organism for the "Reservation by Code" view.
 */
export const ReservationByCodeDataContent = (
    {className, reservation}: ContentProps
) => {
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
};