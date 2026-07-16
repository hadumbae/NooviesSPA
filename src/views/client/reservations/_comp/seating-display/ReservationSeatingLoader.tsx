/**
 * @fileoverview Loads seating data for a showing into a reservation-scoped seating view.
 */

import {ObjectId} from "@/common/_schemas";
import {
    SeatMapDetailsLoader
} from "@/views/admin/seatmaps/_comp/loaders/SeatMapDetailsLoader.tsx";
import {
    ReservationSeatingView
} from "@/views/client/reservations/_comp/seating-display/ReservationSeatingView.tsx";
import {ReactElement} from "react";

import {SeatMapDetails} from "@/domains/seatmaps/_schema/model/SeatMapDetailsSchema";

/** Props for the ReservationSeatingLoader component. */
type LoaderProps = {
    selectedSeating: ObjectId[];
    showingID: ObjectId;
};

/**
 * Fetches seating data for a specific showing and renders the reservation seating view.
 */
export function ReservationSeatingLoader(
    {selectedSeating, showingID}: LoaderProps
): ReactElement {
    return (
        <SeatMapDetailsLoader showingID={showingID}>
            {(seating: SeatMapDetails[]) => (
                <ReservationSeatingView
                    selectedSeating={selectedSeating}
                    seating={seating}
                />
            )}
        </SeatMapDetailsLoader>
    );
}
