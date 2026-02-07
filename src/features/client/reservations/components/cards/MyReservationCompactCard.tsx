/**
 * @file MyReservationCompactCard.tsx
 *
 * Compact reservation summary card used in profile and preview contexts.
 *
 * @remarks
 * - Designed as a lightweight, read-only snapshot of a reservation.
 * - Intended for lists and previews, not full reservation management.
 * - **INCOMPLETE**: currently renders minimal fields for scaffolding only.
 */

import {ReservationDetails} from "@/pages/reservation/schema/model/reservation/ReservationDetails.types.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";

type CardProps = {
    /** Reservation data to be displayed in compact form */
    reservation: ReservationDetails;
};

const MyReservationCompactCard = ({reservation}: CardProps) => {
    const {_id, status} = reservation;

    return (
        <Card>
            <CardContent className="p-4">
                ID: {_id} Status: {status}
            </CardContent>
        </Card>
    );
};

export default MyReservationCompactCard;
